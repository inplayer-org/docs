---
id: custom-payment
title: Custom Payment
---

InPlayer offers the solution of linking your Custom Payment service to our Authentication and Access Management services. In this guide you will learn how to integrate with our technology for the process of user authentication and access validation while using your own external payment method. 

## Asset Creation

To begin with, first, you must obtain the status of an InPlayer Merchant. It is a simple and easy-to-do procedure, precisely described in [this guide](https://inplayer.com/docs/getting-started/creating-your-account/). 
Once you have gained the status of a merchant, it is time to create your first asset. On our platform, you protect your content by putting it in an 'asset'. So once created, our system recognizes your content as 'asset'. In other words, whenever your end-users try to access your content (after they completed the purchase successfully), the content specified in the asset (e.g. a video) will be displayed to the paying customer.

To create an asset, visit our [asset creation documentation](https://inplayer.com/docs/assets/) for assistance. Depending on the type of your content (video, audio, text, HTML, file etc) choose the suitable step-by-step guide to walk you throughout the procedure. 

## Account Authentication 

Next to fall in line is connecting your audience with InPlayer. This can be achieved by having your end-users registered and authenticated in our system. For that purpose, we provide you with numerous easy-to-use methods from our [JavaScript SDK library](https://inplayer-js.netlify.app/) and a wide range of endpoints from our [API](https://docs.inplayer.com/api/). Depending on your needs and preference, you can choose between using the former or latter.

To register an account using the JS SDK, you need to call the `InPlayer.Account.signUp()` method, entering all the specific signup data for your end-user. 

Example:
```
InPlayer.Account.signUp({
 fullName: "test",
 email: "test32@test.com",
 password: "12345678",
 passwordConfirmation: "12345678",
 clientId: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
 type: "consumer",
 referrer: "http://localhost:3000/",
 brandingId?: 12345,
 metadata : { country: "Macedonia" },
})
.then(data => console.log(data));
```

You can find this method defined in detail [here](https://inplayer-js.netlify.app/classes/account.html#signup). 

When the registration is completed and delivers a successful response, among the response parameters you will find a unique authentication token. This token indicates that the respective end-user is authenticated.

To authenticate or login an already existing account, you need to call the ‘InPlayer.Account.signIn()' method.


Example:
```
InPlayer.Account.signIn({
email: 'test@test.com',
password: 'test123',
clientId: '123-123-hf1hd1-12dhd1',
referrer: 'http://localhost:3000/',
refreshToken: '528b1b80-ddd1hj-4abc-gha3j-111111'
})
.then(data => console.log(data));
```

Proceed [here](https://inplayer-js.netlify.app/classes/account.html#signin) to learn more about this method.


On the other hand, if you decide to use our API, these are the endpoints you need:


Start by firing the [POST] /v2/accounts/customers request and enter all the relevant details that will get your end-user registered in our system. 


Example:
```
curl https://services.inplayer.com/v2/accounts/customers \
-H 'authorization: Bearer Access-Token' \
-H 'content-type: application/x-www-form-urlencoded' \
-d email=john@example.com \
```

For a more detailed description of this endpoint refer to [this section](https://docs.inplayer.com/api/accounts/#operation/getSocial) of our API documentation.

As for user authentication, fire the [POST] /accounts/authenticate request.

Example:
```
curl https://services.inplayer.com/accounts/authenticate \
  -d client_id="528b1b80-5868-4abc-a9b6-4d3455d719c8" \
  -d grant_type=password \
  -d client_secret=foobared
```

You can find this endpoint documented [here](https://docs.inplayer.com/api/accounts/#operation/authenticate). 

## Access Validation

Once the user authentication is confirmed to be successful, what follows is checking whether your end-user has access to the asset/content they are trying to reach. To do so, if you have been using our JS SDK library, you need to call the `checkAccessForAsset` SDK method with specified asset ID. 

**checkAccessForAsset**
```
InPlayer.Asset.checkAccessForAsset(42597)
.then(data => console.log(data));
```

To check out our JS SDK documentation, specifically for this method, proceed [here](https://inplayer-js.netlify.app/classes/asset.html#checkaccessforasset).

In case you have been using our APIs, the `GET items access` is to be fired with the specified asset ID (item ID) and the token as an authorization header. 

**[GET] /items/{id}/access**

```
curl https://services.inplayer.com/items/{id}/access \
        -H "Authorization:Bearer <token>"
```

Proceed [here](https://docs.inplayer.com/api/assets/#operation/getAccess) to find the endpoint concisely described and check out the possible responses.

If the access to the required asset is verified, the content will be included in the response and you can use it to display the content on the page. On the contrary, if the end-user’s access is not found, they must be redirected to your payment screen where the payment process can be completed successfully.

## Payment Process

Since the payment process is your implementation that functions completely independent of our platform, you present the end-users with a payment screen displaying your pay-per-view and/or subscription prices. The payment process is initiated and completed at your payment page. Afterwards, you get to grant the customers access to the required asset via our services. 

## Granting Access

When the payment is confirmed to be successful, you need to grant access to your asset in our system so that your customers can reach the content they purchased. For this reason, you need to fire the `Grant access to an item` request with the specified asset ID, consumer ID, access fee ID or expiration date, and the token as an authorization header. At this point, even if you have been using JS SDK methods so far, to grant access you are going to need the `[POST] /items/access` endpoint. 

Example:
```
curl -X POST https://staging-v2.inplayer.com/items/access \
    -H "Authorization:Bearer <token>" \
    -d item_id=1 \
    -d consumer_id=2 \
    -d expires_at=2017-01-03
```

Proceed [here](https://docs.inplayer.com/api/assets/#operation/grantAccess) to find this endpoint documented in detail. 
For a per-per-view type of asset, the access duration period will last from the activation date till its expiration date. In the case of subscription, every time a new rebilling transaction occurs in your processor, the grant access endpoint should be invoked again thus extending the access to the paying subscriber.

Finally, once the process of granting access is completed, another access check should be issued in order to have the content of the asset rightfully displayed to the paying customer. Again, you need to call the `checkAccessForAsset` JS SDK method or the `GET items access` API endpoint. If the access is confirmed, your end-users are ready to consume the content behind your asset, if not, they are to be redirected to your payment screen to complete the purchase successfully.
