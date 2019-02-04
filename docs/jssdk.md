---
id: jssdk
title: SDK for JavaScript
---

## Full Technical Reference

The InPlayer SDK for JS allows developers to build libraries and applications that use InPlayer Platform services. The JS SDK applies to  any frontend project.

You can find the full technical reference of all the SDK methods, [here.](https://inplayer-org.github.io/inplayer.js/) However, we advise you to read this tutorial thoroughly, before jumping into exploring the SDK.

## Installing the SDK

To find the InPlayer JS SDK refer to [NPM](https://www.npmjs.com/package/@inplayer-org/inplayer.js), from where you can install the package, directly.


```bash
npm install –save @inplayer-org/inplayer.js
```

## Setting up the SDK

Once the SDK is installed, you will find available all the methods in the **InPlayer global object**. All of the calls return a promise with relevant data, so after each call, you will have to resolve that promise: 

```javascript
.then(data=>{ /* do something with data */ })
```

Currently, there are two different environments for the SDK - **development** and **production**. You can switch between these environments using the **'setConfig'** method:

```js
InPlayer.setConfig('develop'); // the default one
InPlayer.setConfig('prod'); // the production
```

## 'How to' Examples

The following section enumerates multiple *'how to' examples* about doing specific operations within the InPlayer Monetization Platform.

## How to Register an Account

The registration process can be carried out using the **'InPlayer.Account.signUp()'** method.

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

Among the parameters, **'fullName',** **'email',** **'password',** **'passwordConfirmation',** **'type',** and **'clientId'**  are always **required**.

Before you start using the Inplayer SDK, we suggest that you create a new **OAUTH application** from our Dashboard and obtain your **'clinetId'**. In case you haven’t got an OAUTH application yet, you can use your account **UUID** as **'clientId'**. To find your UUID navigate to InPlayer Dashboard's 'Account' section, in the top right-hand corner menu.

The **'type'** parameter can be either **'consumer'** or **'merchant'**. In case you want to create merchant accounts via the API, you will have to use InPlayer's public UUID for the 'clientId' parameter.

There is also a **metadata** parameter which can contain additional required and/or optional fields that merchants can choose to require from their end-users to fill in upon registration. If you have required custom registration fields defined by your merchant account, you will have to send those details as well. By default, the metadata parameter is optional.

Lastly, the **referrer** parameter can be passed in manually for every register request. This parameter represents the URL from which the request has been invoked, or the location where the account has been created.

## How to Authenticate an Account

Authentication can be achieved using the **InPlayer.Account.authenticate()** method.

```javascript
InPlayer.Account.authenticate({
    email: 'test32@test.com',
    password: '12345678',
    clientId: 'd20252cb-d057-4ce0-83e0-63da6dbabab1',
}).then(data => console.log(data));
```

Having the account logged in, you should be able to see an object containing the **InPlayer auth token** in **'localStogare'**.

If you need to make additional calls, in the name of the authenticated account, you can fetch the token with the **'InPlayer.Account.token()'** call. Additionally, you may call **'InPlayer.Account.isSignedIn()'** to check if someone is logged in or not.

For the account sign out operation use the following call:

```javascript
InPlayer.Account.signOut().then(data => console.log(data));
```

## Real-time Notifications

Once the customer is authenticated in our system, our SDK enables you to subscribe to listening to notifications via WebSockets. For a complete overview of our notification types, you can refer to this [page](https://developers.inplayer.com/docs/notifications/). 

In addition, consider the following sample code that enables you to subscribe and listen for messages:

```javascript
InPlayer.subscribe(InPlayer.Account.token(),{
    onMessage: function(message) { /* do something with the message result */ },
    onOpen: function(e) { /* do something on connection open */ },
    onClose: function(e) { /* do something on connection close */ }
});
```

It should also be noted, that you are going to need a code that processes every different notification type when you receive notification message in the **OnMessage** callback.

Our basic use-case here is to have a **'redirect to premium section'** handler after the 'successful payment' notification message.

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

### Creating an Aceess Fee

The InPlayer Platform enables you to create digital assets to which afterwards you can attach **price** with **currency** and **access period**, in order to create **access fees**. **The 'AccessFee' resource** holds data of the asset’s price, and the time-frame of the **access duration period**. The access period resource refers to the **access type** which might be of the **pay-per-view** or **subscription** model. This will be elaborated further on in this tutorial. Once you have created the desired asset with price options (conducted in the Dashboard or via the API), you can fetch and present the fees by invoking the function bellow. 

```js
InPlayer.Asset.getAccessFees({ASSET_ID}).then(data => { //do something with data }
```

After the end-user has chosen both the price option and the preferred payment method, depending on the access type, you can either invoke the function for creating one-time purchases (pay-per-view) or the one for subscription (recurring card payment). 

### Creating Payments

The InPlayer Platform supports two methods of carrying out payments – by **card** and by **PayPal**. In order to create payment, first you must find and fetch the preferred method. 

```javascript
InPlayer.Payment.getPaymentMethods(MERCHANT_UUID).then(data => console.log(data));
```

### Creating One-time Card Payments

```javascript
InPlayer.Payment
.create(MERCHANT_UUID, {
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

### Creating Recurring Card Subscriptions

```javascript
InPlayer.Subscription
.create(MERCHANT_UUID, {
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

### Creating PayPal Payments

To make PayPal payments you will need an additional call to fetch the payment details:

```javascript
InPlayer.Payment.getPayPalParams(InPlayer.Account.token(), {
    origin: window.location.href,
    accessFee: ACCESS_FEE_ID,
    paymentMethod: 2,
    voucherCode: 'some voucher code here' (not mandatory)
}).then(data => { /* handle paypal data here */ }
```

After a successful call you will obtain the neccessary PayPal data for the external payment. The response will carry the endpoint URL, which will either be a Sandbox PayPal for development, or a standard PayPal URL for a production mode. In order to make a *redirect link to PayPal* and create your *PayPal button* use the **'data.endpoint'** value.

## How to Validate Content Access

In order to check whether a given account can access a certain asset, you should fetch the authorisation token of the logged in account and call the **'checkAccessForAsset'** method with your **asset ID**.

```javascript
InPlayer.Asset
.checkAccessForAsset(InPlayer.Account.token(),ASSET_ID)
.then(data => console.log(data))
.catch(error => error.response.json().then(data => console.log("Error", data)));
```

As a response you will receive an object with detailed information about the asset access. This way, you can keep the non-premium viewers away from the premium content.

## How to Create the 'My Account' Menu

To create the 'My Account' menu for a logged in customer, you need the following segments: **account details**, **ability to update account details**, **account purchase history**, **account subscriptions** and **ability to cancel subscriptions**.

### Fetching Account Details

By passing in the authorisation token, you can fetch all the account details using the **getAccountInfo** method.

```js
InPlayer.Account
.getAccountInfo(InPlayer.Account.token())
.then(data => console.log(data))
.catch(error => error.response.json().then(data => console.log("Error", data)));
```

### Updating the Account Details

```js
InPlayer.Account
.updateAccount({fullName: 'John Doe', metadata: {country: 'Example Country'}},InPlayer.Account.token())
.then(data => console.log(data))
.catch(error => error.response.json().then(data => console.log("Error", data)));
```













