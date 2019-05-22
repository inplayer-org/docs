---
id: use-own-authentication
title: Custom Authentication
---

In case you already have an Authentication service and Identity Managment System and you want to just link those with the rest of the InPlayer services, you can achive that easily. 

There are two different levels for using your own Authentication and Identity Provider Service while connecting InPlayer Payment and Access Validation. 

## Connect your Audience

In order for you to use the Payment and the Access Validation services from InPlayer with your own Authentication and your own Audience database you need to connect your accounts with coresponding InPlayer customer accounts and link their InPlayer account IDs in your database. The idea is to execute Payments and Access Validation checks for InPlayer customers without using a password, since the end-users will login on your side. There are 2 main API methods that will allow this type of scenario:

1. [Create Customer Account](https://docs.inplayer.com/api/accounts/#operation/v2createAccount) 
2. [Impersonate Login](https://docs.inplayer.com/api/accounts/#operation/v2impersonate) 

First thing that needs to be done is to have a valid Merchat `access token` that will allow you to use the InPlayer APIs on backend side for creating customers and impersonate logins. The access token lasts 1 month. You can store the access token on your backend side and re-create it when it expires using your client credentials and client secret:

```curl
curl https://services.inplayer.com/accounts/authenticate \
  -d client_id="your-client-id-goes-here" \
  -d grant_type=client_credentials \
  -d client_secret="your-client-secret-goes-here"
```

The method from above will return your merchant account with a valid access token:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token": "swKbldciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adWAdzCa",
  "account": {
    "id": 21,
    "email": "example-email@inplayer.com",
    "full_name": "John Doe",
    "referrer": "https://inplayer.com",
    "metadata": {},
    "social_apps_metadata": [
      {}
    ],
    "roles": [
      "merchant"
    ],
    "completed": true,
    "created_at": 1531482438,
    "updated_at": 1531482438
  }
}
```

Once you create the functionality of storing and recreating of the merchant `access_token` you can use it any time you need to create and link InPlayer customers with your own. 

Once some one registeres on your side into your Identity Management service you need to create an InPlayer customer with the same email address using the merchant access token that you have stored it before:

```curl
curl https://services.inplayer.com/v2/accounts \
  -H 'authorization: Bearer Access-Token' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d email=john@example.com \
```

In the response you will get all the nessesary details to connect and use the InPlayer customer with those at your platfrom. 

```json 
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "expires": 1531482438,
  "account": {
    "id": 21,
    "email": "example-email@inplayer.com",
    "created_at": 1531482438,
    "updated_at": 1531482438
  }
}
```

You can save the ID from the response to be the link between the two accounts, and use the customer `access_token` to make future signed requests in the name of that account (for payments and access validation). You can save the customer `access_token` in his local storage (or any other suitable storage like http cookie) as long as he is loged in to your Identity Provider platform. 

In case you need to use an Account that is already created and linked between both platforms, before you need a signed request to InPlayer in his name, you can use the `Impersonate Login` method using his saved InPlayer customer ID and the merchant access token that you have stored it before:

```curl 
curl https://services.inplayer.com/v2/accounts/impersonate \
  -H 'authorization: Bearer Access-Token' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d customer_id='the-saved-inplayer-customer-id-goes-here' \
```

In the response you will get a valid InPlayer Customer `access_token` that you can use in any further Payment and Access Validation call in the name of the customer. 

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "expires": 1531482438,
  "account": {
    "id": 21,
    "email": "example-email@inplayer.com",
    "full_name": "John Doe",
    "referrer": "https://inplayer.com",
    "metadata": {},
    "social_apps_metadata": [
      {}
    ],
    "roles": [
      "merchant"
    ],
    "completed": true,
    "created_at": 1531482438,
    "updated_at": 1531482438
  }
}
```

It is up to the flexible implementation how the `access_token` will be used. If the solution is a native device app, the developer should temporary store the token and use it in the rest of the authorised InPlayer API calls or SDK methods for premium content access validation or payments and subscriptions in the name of the customer.

If its needed to connect the authentication with the Web-Embedable Inplayer Paywall application to provide the access validation and the payment UI screens for web, it is described in the following section.

## Connect the InPlayer Paywall

The InPlayer Paywall is web-embedable application that can provide the full experience of content packaging, authentication, access validation, payments and content rendering. In the following section we will show how to connect the Web Paywall using your own authentication. 

The main idea is to sepparate the register and login screens from the Paywall and use your screens from the custom Identity Management Service but in the same time create an InPlayer account session in the Paywall application in order to use the rest of the InPlayer services connected with your auth. 

Once you have your Audience [connected](use-own-authentication#connect-your-audience) you can have one landing page for registering or signing in of the Accounts that will act as a middleware behind the pages where the Paywall application will be embeded with the premium content. If the account succesfully signs in to your custom Authentication service and you fetch the coresponding `access_token` for the same account at InPlayer with the [Impersonate Login](https://docs.inplayer.com/api/accounts/#operation/v2impersonate) method, you need to pass it on the client side to the browser's local storage. This way the InPlayer paywall can recognize the Account and the rest of the premium content Paywall flow can continue. Once the Account has valid local storage `access_token` he can be redirected to the premium pages where the Paywall application is embedded. 

Feel free to use the InPlayer Javascript SDK in adition to the Paywall for aditional functinalities such as `setToken` in this case. 

**For example:**

Once you have the `access_token` on the backend side, you can have a callback page that will handle the token passing to the client side and setting it in the local storage.  

```html
https://example.com/my-callback-page.html?token=my-example-token
```
The token is passed from the backend to the callback page in the page url. The content to the callback page is as follows:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="https://unpkg.com/@inplayer-org/inplayer.js/dist/inplayer.umd.js"></script>
    <title>Callback page</title>
</head>

<body>
    <script>
        var urlParams = new URLSearchParams(window.location.search);
        InPlayer.Account.setToken(urlParams.get("token"), "", urlParams.get("expires")); 
        // hanlde redirect to the premium pages after setting the token
    </script>
</body>

</html> 
```

After you successfully set the token into the local storage and you redirect the user to the premium pages where the Paywall code is embedded you will have your Custom Authentication connected with the Pawyall application. 




