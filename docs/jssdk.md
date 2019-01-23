---
id: jssdk
title: SDK for JavaScript
---

## Full Technical Reference

The InPlayer SDK for JS allows developers to build libraries and applications that use InPlayer Platform services. The JS SDK can be used for any frontend project.

You can find the full technical reference of all the SDK methods, [here.](https://inplayer-org.github.io/inplayer.js/)

However, we advice you to read this tutorial thoroughly, before jumping into exploring the SDK.

## Installing the SDK

You can find the InPlayer JS SDK on this [NPM url.](https://www.npmjs.com/package/@inplayer-org/inplayer.js)

To use the SDK, you can instal the package directly from NPM:

```bash
npm install –save @inplayer-org/inplayer.js
```

## Setting up the SDK

Once the SDK is installed, all the methods will be abailable for you in the **InPlayer global object**.

All the calls return a promise with some relevant data, which means that after each call, you will have to resolve the promise:

```javascript
.then(data=>{ /* do something with data */ })
```

Currently, there are two different environments for the SDK, **development** and **production**. You can swap between these environments using the **'setConfig'** method:

```js
InPlayer.setConfig('develop'); // the default one
InPlayer.setConfig('prod'); // the production
```

## 'How to' Examples

In the following section, you can find multiple 'how to' examples about doing specific functionalities within the InPlayer monetization platform.

## How to Register an Account

The registration process can be carried out using the **InPlayer.Account.signUp()** method.

```javascript
InPlayer.Account.signUp({
    fullName: 'test',
    email:  'test32@test.com',
    password: '12345678',
    passwordConfirmation: '12345678',
    clientId: 'd20252cb-d057-4ce0-83e0-63da6dbabab1',
    type: 'consumer',
    referrer: 'http://localhost:3000/',
    metadata: {
    city: 'Skopje'
}
}).then(data => console.log(data));
```

The **fullName,** **email,** **password,** **passwordConfirmation,** **type,** and **clientId** parameters are always required.

Before you start using the Inplayer SDK, we suggest that you create a new **OAUTH application** from our Dashboard, as described in this guide LINK_FROM_GUIDE and obtain your **clinetId**. In case you don't have an OAUTH application, you can use your account UUID as clientId. You can find your UUID in the account details section in the InPlayer Dashboard, in the top right-hand corner menu.

The type parametar can be either **'consumer'** or **'merchant'**. In case you want to create merchant accounts over the API, you will have to use InPlayer's public UUID for the clientId parameter.

There is also a metadata parametar, which can be additional dynamic fields that merchants can choose to ask from their end-accounts upon registration. If there are required custom registration fields defined for your merchant account, you will have to send those details as well. By default, the metadata is optional.

Lastly, the referrer parameter can be passed in manually for every register request. It represents the URL from which the request is invoked, or the place from where the account is created.

## How to Authenticate an Account

The authentication can be done using the **InPlayer.Account.authenticate()** method.

```javascript
InPlayer.Account.authenticate({
    email: 'test32@test.com',
    password: '12345678',
    clientId: 'd20252cb-d057-4ce0-83e0-63da6dbabab1',
}).then(data => console.log(data));
```

After the account is logged in, you should be able to see an object containing **InPlayer auth token** inside **'localStogare'**.

If you need to make additional calls, in the name of the authenticated account, you can fetch the token with the InPlayer.Account.token() call. Additionally, you may call InPlayer.Account.isSignedIn() to check if someone is logged in or not.

For the account sign out operation use the following call:

```javascript
InPlayer.Account.signOut().then(data => console.log(data));
```

## Websockets

Once an account is logged in to our system, our servers can communicate with the client's website over Web Sockets for various reasons. In most of the cases, when we need a real-time communication. Usually, we handle payment results or access expiration through such notifications.

You need to register for a Web-Socket in the following cases:

1. Every time someone successfully signs in.
2. Every time you validate a logged in account. Usually, on each page refresh.
3. Every time someone registers an account and you log him in automatically, using the access token directly.

## How to Subscribe to Web-socket and Listen for Messages

Here is a sample code that will let you subscribe to a Web Socket and listen for messages:

```javascript
InPlayer.subscribe(InPlayer.Account.token(),{
    onMessage: function(message) { /* do something with the message result */ },
    onOpen: function(e) { /* do something on connection open */ },
    onClose: function(e) { /* do something on connection close */ }
});
```

It is important to know that you will need to have a code that will process every diffrent notification type when you recieve notification message inside **OnMessage** callback.

Basic use-case is to have **'redirect to premium section'** handler after successful payment notification message.

For example:

```javascript
InPlayer.subscribe(InPlayer.Account.token(), {
    onMessage: function(message) {
        if(message.type==='payment.success') {
            window.location.href='http://mywebsite.com/premium-section' 
        }
    }
});
```

## How to Create Payments

If you need to make a payment, first, you will need to find and fetch the prefered payment method from the account input. In order to do so, you need to call **'getPaymentMethods'** with the merchant_uuid identifier for the merchant account.

```javascript
InPlayer.Payment.getPaymentMethods(MERCHANT_UUID).then(data => console.log(data));
```

Once you fetch the ID of the prefered method you can use it to create payments or subscriptions. If you use only one payment method this step is not needed but you should find your method ID once.

The next thing you will need is valid access fee. In the InPlayer Platform you can create digital assets (mainly videos), then attach price with currency and access period to the asset to create access fees. The AccessFee object holds data of how much the asset costs, and for how long the account will have access to it, once it is purchased for the given price. Before every payment all AccesFees (price options) should be presented to the end-account so they can choose which is the best option for them. Once the end-account selects the AccessFee, you will need to send the AccessFeeId to the payments API.

Given the paragraph above, the first step in making payments is to fetch all AccessFees for one asset (digital item). If you want to know more about the inPlayer assets and how to create them and attach prices, reffer to this guide. The JS SDK is a client-side library only, so assets and prices management is done via our API or via the Dashboard.

```js
InPlayer.Asset.getAccessFees({ASSET_ID}).then(data => { //do something with data }
```

After you fetch all AccessFees for your digital asset (one asset ID can represent an OVP video, any file, html, audio or flexible collection) the end-account should choose their prefered option. Then you will need to pass in the selected AccessFeeId to the purchase calls. The methods for one-time payments and recurring subscriptions are different. The AccessFee has its own type (recurrent or PPV), so depending on the selected fee type you will make the following actions:

## Creating One-time Card Payments

```javascript
InPlayer.Payment
.Create(MERCHANT_UUID, {
    number: 4111111111111111,
    cardName: 'Example Name',
    expMonth: 10,
    expYear: 2030,
    cvv: 656,
    accessFee: 2341,
    paymentMethod: 1,
    referrer: 'http://example-website.com',
    voucherCode: 'fgh1982gff-0f2grfds'
})
.then(data => console.log(data));
```

## Creating Recurring Card Subscriptions

```javascript
InPlayer.Subscription
.Create(MERCHANT_UUID, {
    number: 4111111111111111,
    cardName: 'Example Name',
    expMonth: 10,
    expYear: 2030,
    cvv: 656,
    accessFee: 2341,
    paymentMethod: 1,
    referrer: 'http://example-website.com',
    voucherCode: 'fgh1982gff-0f2grfds'
})
.then(data => console.log(data));
```

## How to Make Paypal Payments

To make PayPal payments you will need an additional call to fetch the payment details:

```javascript
InPlayer.Payment.getPayPalParams(InPlayer.Account.token(), {
    origin: window.location.href,
    accessFee: ACCESS_FEE_ID,
    paymentMethod: 2,
    voucherCode: 'some voucher code here' (not mandatory)
}).then(data => { /* handle paypal data here */ }
```

After the call is successful, you will get the nessesary PayPal data for the external payment. In the response, you will have the endpoint url, which will be either a sandbox paypal for development, or a standard paypal url for production mode. Use the data.endpoint value to make a redurect link to PayPal and create your PayPal button.

## How to Validate Content Access

When you need to check if some account has access to watch some asset you will need to fetch the authorisation token of the logged in account and call the checkAccessForAsset method with your asset ID.

```javascript
InPlayer.Asset
.checkAccessForAsset(InPlayer.Account.token(),ASSET_ID)
.then(data => console.log(data))
.catch(error => error.response.json().then(data => console.log("Error", data)));
```

As a response, you will recieve an object with full info about the asset access. This way, you can keep the non-premium viewers away from the premium content.

## How to Create the 'My Account' Menu

When you need to create the account menu of the logged in person, you will need the following segments: account details, ability to update account details, account purchase history, account subscriptions and ability to cancel subscriptions.

## Fetching Account Details

By passing in the authorisation token, you can fetch all of the account details using the **getAccountInfo** method.

```js
InPlayer.Account
.getAccountInfo(InPlayer.Account.token())
.then(data => console.log(data))
.catch(error => error.response.json().then(data => console.log("Error", data)));
```

## Updating the Account Details

```js
InPlayer.Account
.updateAccount({fullName: 'John Doe', metadata: {country: 'Example Country'}},InPlayer.Account.token())
.then(data => console.log(data))
.catch(error => error.response.json().then(data => console.log("Error", data)));
```













