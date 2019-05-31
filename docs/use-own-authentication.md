---
id: use-own-authentication
title: Custom Authentication
---

The InPlayer platform offers the solution of linking your Custom Authentication service to our services. Therefore, if you already have an Authentication service and Identity Management System which you want connected to the rest of our services, continue reading to learn how to achieve that easily.  

There are two different levels for using your own **Authentication** and **Identity Provider** services while connecting to the **InPlayer Payment** and **Access Validation** services.

## Connect your Audience

In order for you to use our Payment and the Access Validation services with your own Authentication and Audience database, you need to connect your accounts with corresponding InPlayer customer accounts and then, link their InPlayer account IDs in your database. The idea is to execute Payments and Access Validation checks for InPlayer customers without having them using a password, since the end-users will log in on your side. There are two main API methods that will allow this type of scenario:

1. [Create Customer Account](https://docs.inplayer.com/api/accounts/#operation/v2createAccount) 
2. [Impersonate Login](https://docs.inplayer.com/api/accounts/#operation/v2impersonate) 

To begin with, you will need a valid merchant access token that will allow you to use the InPlayer APIs on back-end side for creating customers and impersonate logins. The access token lasts one month. You can store the access token on your back-end side and then recreate it after it is expired, by using your client credentials and client secret:

```curl
curl https://services.inplayer.com/accounts/authenticate \
  -d client_id="your-client-id-goes-here" \
  -d grant_type=client_credentials \
  -d client_secret="your-client-secret-goes-here"
```

The method from above will return your merchant account containing a valid access token:

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

Once you have created the functionality of storing and recreating of the merchant `access_token`, you can use it whenever needed for creating and linking InPlayer customers with yours.

After someone on your side has registered into your Identity Management service, you need to create an InPlayer customer with the same email address, using the merchant access token, stored from earlier:

```curl
curl https://services.inplayer.com/v2/accounts \
  -H 'authorization: Bearer Access-Token' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d email=john@example.com \
```

In the response you will find all the necessary details to connect the InPlayer customer to the rest of your platform's users.

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

You can save the ID from the response as it represents the link between the two accounts and use the customer access_token to make future signed requests in the name of that account (for payments and access validation). You can save the customer access_token in their local storage (or any other suitable storage - such as http cookie) as long as they are logged into your Identity Provider platform.

In case you need to use an Account that is already created and linked between the both platforms, prior to making a signed request to InPlayer in the name of your customer, you can use the Impersonate Login method, using their saved InPlayer customer ID and the merchant access token that you have stored earlier:

```curl 
curl https://services.inplayer.com/v2/accounts/impersonate \
  -H 'authorization: Bearer Access-Token' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d customer_id='the-saved-inplayer-customer-id-goes-here' \
```

The response returns a valid InPlayer Customer `access_token` that you can use in any further Payment and Access Validation call, in the name of the customer.

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

The flexibility of the implementation determines how the access_token will be used. If the solution is a native device app, the developer should store the token temporary and use it in the rest of the authorized InPlayer API calls or SDK methods for premium content access validation, or payments and subscriptions in the name of the customer.

If you need to connect the authentication to the Web-Embeddable InPlayer Paywall application, as to provide the access validation and the payment UI screens for web, proceed reading.

## Connecting the InPlayer Paywall

The InPlayer Paywall is a web-embeddable application that provides the full experience of content packaging, authentication, access validation, payments and content rendering. In the following section we will demonstrate how you can connect the Web Paywall while using your own authentication.

The main idea is to separate the register and login screens from the Paywall and use your screens from the custom Identity Management Service. Simultaneously, you need to create an InPlayer account session in the Paywall application, so that you can use the rest of the InPlayer services, connected with your auth.

Once you have your audience connected, you can have a landing page for registering or signing in of the Accounts that will act as a middle-ware behind the pages where the Paywall application will be embedded with the premium content. If an account has been successfully signed into your custom Authentication service and you have fetched the corresponding `access_token` for the same Account at InPlayer, using the [Impersonate Login](https://docs.inplayer.com/api/accounts/#operation/v2impersonate) method, you should pass it on the client's side to their browser's local storage. This way, the InPlayer Paywall can recognize the account and the rest of the Paywall-premium-content flow can continue. Once the Account has valid local storage `access_token`, they can be redirected to the premium pages where the Paywall application is embedded.

Feel free to use the InPlayer JavaScript SDK in addition to the Paywall for additional functionalities such as setToken in this case.

**For example:**

Once you have the `access_token` on the back-end side, you can have a callback page that will handle the token passing to the client side and setting it in the local storage.

```html
https://example.com/my-callback-page.html?token=my-example-token
```
The token is passed in from the back-end to the callback page in the page URL. The content to the callback page is as follows:

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

After you successfully set the token into the local storage and you redirect the user to the premium pages where the Paywall code is embedded, you will have your Custom Authentication connected to the Pawyall application.
