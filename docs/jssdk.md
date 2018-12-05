---
id: jssdk
title: SDK for JavaScript
---

## Full technical reference

You can have the full technical reference of all SDK methods at the following link.

https://inplayer-org.github.io/inplayer.js/

However we advice to read this tutorial before jumping into exploring the SDK.

The InPlayer SDK for JS allows developers to build libraries and applications that use InPlayer Platform services. You can use the JS SDK for any frontend project.

## Installing the SDK

You can find the InPlayer JS SDK on the following NPM url:

https://www.npmjs.com/package/@inplayer-org/inplayer.js

To use the SDK you can instal the package direcly from NPM

```js
npm install –save @inplayer-org/inplayer.js
```

## Setting up the SDK

Once the SDK is installed, all the methods will be abailable for you in the InPlayer global object.

All the calls return a promise with some relevant data. Meaning after any call you will have to resolve the promise:

```js
.then(data=>{//do something with data})
```

Curently there are two different environments for the SDK, development and production. You can swap between these environments using the setConfig method:

```js
InPlayer.setConfig('develop'); // the default one
InPlayer.setConfig('prod'); // the production
```

## How to Examples

In the following section you can find multiple how to examples about doing specific functionalities with InPlayer monetization platform.

## How to register Account

The registration can be done using the InPlayer.Account.signUp() method.

```js
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

The fullName, email, password, passwordConfirmation, type and clientId parameters are always required.

Before you start using the inplayer SDK we sugest that you create new OAUTH application from our Dashboard as described in this guide LINK_FROM_GUIDE and obtain your clinetId. In case you dont have OAUTH application, you can use your account UUID as clientId. You can find your UUID in the account details section in the InPlayer Dashboard from the right top corner menu.

The type parametar can be either 'consumer' or 'merchant'. In case you want to create merchant accounts over the API you will have to use InPlayers public UUID for the clientId parameter.

There is also a metadata parametar, which can be aditional dynamic fields that Merchants can chose to ask from their end-Accounts upon registration. If there are required custom registration fields defined for your Merchant account, you will have to send those details as well. By default metadata is optional.

Lastly, the referrer parameter can be passed manualy for every register request. It represents the URL from which the request is invoked, or the place from where the account is created.

## How to authenticate Account

The authentication can be done using the InPlayer.Account.authenticate() method.

```js
InPlayer.Account.authenticate({
    email: 'test32@test.com',
    password: '12345678',
    clientId: 'd20252cb-d057-4ce0-83e0-63da6dbabab1',
}).then(data => console.log(data));
```

After the account is logged in, you should be able to see an object containing InPlayer Auth token inside localStogare.

If you need to make additional calls in the name of the authenticated Account you can fetch the token with the InPlayer.Account.token() call. Additionally you may call InPlayer.Account.isSignedIn() to check if someone is logged in or not.

For the Account sign out operation use the following call

```js
InPlayer.Account.signOut() .then(data => console.log(data));
```

## Websockets

One an account is logged in to our system, our Servers can communicate with the client website over Web Sockets for various reasons. In most of the cases when we need real time communication. Usualy we handle payment results or access expiring through such notifications.

You need to register for a Web-Socket in the following cases:

1. Every time someone successfully signs in.
2. Every time you validate logged in account. Usualy on each page refresh.
3. Every time someone registers account and you auto login him using the access token direcly.

## How to subscribe to web-socket and listen for messages

Here is a sample code that will let you subscribe to a Web Socket and listen for messages.

```js
InPlayer.subscribe(InPlayer.Account.token(),{
onMessage: function(message) { /* do something with the message result */ },
onOpen: function(e) { /* do something on connection open },
onClose: function(e) { /* do something on connection close*/ }
});
```

It is importnat to know that you will need to have a code that will process every diffrent notification type, when you recieve notification message inside OnMessage callback.

Basic use case is to have 'redirect to premium section' handler after successful payment notification message.

For example:

```js
InPlayer.subscribe(InPlayer.Account.token(),
{
onMessage: function(message) {
if(message.type==='payment.success') {
window.location.href='http://mywebsite.com/premium-section' /*
}
}
});
```

## How to create payments

If you need to make a payment first you will need to find and fetch the prefered payment method from the Account input. In order to do that you need to call getPaymentMethods with the merchant_uuid identifier for the merchant account.

```js
InPlayer.Payment
.getPaymentMethods(MERCHANT_UUID)
.then(data => console.log(data));
```

Once you fetch the ID of the prefered method you can use it to create payments or subscriptions. If you use only one payment method this step is not needed but you should find your method ID once.

The next thing you will need is valid access fee. In the InPlayer platform you can create digital assets(mainly videos), then attach price with currency and access period to the asset to create access fees. AccessFee is an object that hold the data of how much the asset costs, and how long the Account will have access to it once its purchased for the given price. Before every payment all AccesFees(price options) should be presented to the end-Account so he can chose which is the best option for him. Once the end-Account select the AccessFee, you will need to send the AccessFeeId to the payments API.

Given the paragraph from above the first step in making payments is to fetch all AccessFees for one Asset(digital item). If you want to know more about inPlayer Assets and how to create them and attach prices reffer to this guide. The JS SDK is client side library only so Assets and Prices management is done via our API or via the Dashboard.

```js
InPlayer.Asset.getAccessFees({ASSET_ID}).then(data => { //do something with data }
```

After you fetch all AccessFees for your digital Asset(One asset id can represent an OVP video, any file, html, audio or flexible collection) the end-Account should chose his prefered option. Then you will need to pass the selected AccessFeeId to the purchase calls. The methods for one time payments and recurring subscriptions are different. The AccessFee has its own type (Recurrent or PPV), so depending on the selected fee type you will make the following actions:

## Creating one time card payments

```js
InPlayer.Payment
.Create(MERCHANT_UUID,
{
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

## Creating card recuring subscriptions

```js
InPlayer.Subscription
.Create(MERCHANT_UUID,
{
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

## How to make paypal payments

To make PayPal payments you will need additional call to fetch the payment details.

```js
InPlayer.Payment.getPayPalParams(InPlayer.Account.token(), {
    origin: window.location.href,
    accessFee: ACCESS_FEE_ID,
    paymentMethod: 2,
    voucherCode: 'some voucher code here' (not mandatory)
}).then(data => { // handle paypal data here }
```

After the call is successful you will get the nessesary PayPal data for the external payment. In the response you will have the endpoint url, which will be either sandbox paypal for development, or standard paypal url for production mode. Use the data.endpoint value to make a redurect link to PayPal and create your PayPal button.

## How to validate content access

When you need to check if some Account has access to watch some Asset you will need to fetch the Authorisation token of the logged in Account and call the checkAccessForAsset method with your asset ID.

```js
InPlayer.Asset
.checkAccessForAsset(InPlayer.Account.token(),ASSET_ID)
.then(data => console.log(data));
```

As a response you will recieve an object with full info about the Asset Access. This way you can keep the non premium viewers away from the premium content.

## How to create 'My Account' menu

When you need to create the account menu of the logged in person you will need the following segments: Account details, ability to update account details, account purchase history, account subscriptions and ability to cancel subscriptions.

## Fetch Account details

By passing the authorisation token you can fetch all Account details using the getAccountInfo method.

```js
InPlayer.Account
.getAccountInfo(InPlayer.Account.token())
.then(data => console.log(data));
```

## Update Account details

```js
InPlayer.Account
.updateAccount({fullName: 'John Doe', metadata: {country: 'Example Country'}},InPlayer.Account.token())
.then(data => console.log(data));
```













