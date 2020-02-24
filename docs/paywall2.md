---
id: paywall2
title: Paywall 2.0
---

Paywall 2.0 is the latest InPlayer’s content monetization application featuring multiple changes and improvements over its preceding version. The paywall retains its purpose of providing you with an embed code for each asset created on our platform, so you can insert them to your website and ease the accessibility for your end-users.  
The paywall 2.0 embed code can be found at the same place where it used to reside at paywall 1.0 i.e. at the asset section. In addition, there are two different tabs that enable the embed code generator to switch between both paywall versions.

## Standard Embed Code

The paywall 2.0 embed code also consists of **InPlayer paywall scripts** and **asset embed code**, but differs slightly from its precedent in that the former is now only one minified JS file, encompassing CSS inside:

```html
<script type='text/javascript' src='https://assets.inplayer.com/paywall/staging/paywall.min.js'></script>
```
Whereas the latter, the asset embed code, has the following format:

```html
<div id="inplayer-assetID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', [{ id: 123}]); 
// merchant UUID and assetID are the function arguments from above
</script>
```

## OVP Custom Embed Code

If dealing with an OVP asset type, the embed code can be constructed having provided the original **video ID** from the external OVP source. The format for **embedded external asset ID** is the following:

```html
<div id="inplayer-ovpName-OvpVideoID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
     [
      {
         external: {
            type: 'OVP_NAME',
            id: 12345, // 'OVP Video ID'
         },
      },
     ]
)
</script>
```

## Multiple Assets Embed Code

The paywall 2.0 also supports **multiple assets embed code**. To embed multiple assets, you should include them in the JavaScript code as an array. The order of the html elements where the assets would be rendered is not important. Below you can find an example of multiple assets embed code in action.

```html
<script type='text/javascript' src='https://assets.inplayer.com/paywall/staging/paywall.min.js'></script>

<div id="inplayer-ASSET_1_ID"></div>
<div id="inplayer-ASSET_2_ID"></div>
<div id="inplayer-ASSET_3_ID"></div>

<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', [{id: ASSET_1_ID}, {id: ASSET_2_ID}, {id: ASSET_3_ID}]);
</script>
```

## Embed Code Options

Depending on the need, you can set up additional options in the embed code. You can choose between **the asset options** that can be set up **per asset** and the **global paywall options** that affect all the assets. The asset embed code options should be passed in, in addition to the asset id:

```html
<div id="inplayer-assetID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
     [
      {
        id: 123 //asset ID,
        options: {
            noPreview: true,
            brandingId: 111222,
            noInject: true
        } 
        //asset options object        
      }
     ]
)
</script>
```

When the options are used as in the example above, they affect only the asset concerned. In case there are multiple assets with global paywall options set up for each asset in the embed code, the options should be passed in outside of the assets’ list in the following manner:

```html
<div id="inplayer-assetID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
     [
      {
         id: 123 //asset ID
      },
      //asset options object
     ], 
     {
       language: 'EN',
       hideUserMenu: true, 
       hideLogo: true,
       hideProtectedBy: true
     } 
     //global options object
)
</script>
```

Here is a list of all the paywall options, those per asset and the global ones:

| Name        | Description        | Format | Usage type  |
| ------------- |-------------|-------------|------------|
| accessFeeId | Pre-selects the price of a specific access fee; the price option screen will be skipped | Number | Asset option |
| noInject | If true, skips the premium content injection after successful payment | Boolean	| Asset option |
| noPreview | If true, the asset preview will not be rendered (used for custom preview) | Boolean	| Asset option |
| brandingId | Sets a specific branding theme for the asset (has the highest priority) | Number | Asset option | 
| language | Default language | Language code	| 	Global option |
| hideUserMenu |  Hides the default menu of the registered account | Boolean	 | Global option |
| hideLogo | Hides the paywall logo	| Boolean	| Global option |
| footerLinks | Inserts external links in the paywall footer | Json, ex. { text: “Google”, url: “https://www.google.com/” } | Global option |
| hideFooterLinks | Hides the Footer links	| Boolean | Global option |
| hideProtectedBy | Hides the protected by logo	 | Boolean | Global option | 
| oauthAppKey	| Sets the OAuth application to be used for authentication | String | Global option |
| brandingId | 	Sets global branding theme for all assets on a page | Number | Global option |
| registerFirst | Specifies that the default modal screen, which is the register screen, appears first when the paywall modal is opened | Boolean | Global option |


## Custom Player Options

Each asset type in the InPlayer’s platform has its own content format implementation. In most of the cases, where the asset is of OVP type (online video provider hosted videos), the paywall creates a video player after an account with premium access asks for the content.

Each OVP has its own player implementation. The InPlayer paywall renders the default players with standard player parameters. However, in case there is need for changing the player or some player parameter, you can pass in custom player scripts and/or custom player parameters via the InPlayer embed code. The following example code shows how player scripts or parameters can be altered:

```html
<div id="inplayer-assetID" class="inplayer-paywall"></div>
<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', [{ id: 123, options: {
    //Merchant UUID and assetID are the variables from above
    playerScripts: [
        {
            src: 'http://player.ooyala.com/static/v4/stable/latest/core.min.js',
            id: 'ooyala-core',
            type: 'script',
            async: false,
        },
        {
            src: 'http://player.ooyala.com/static/v4/stable/latest/video-plugin/main_html5.min.js',
            id: 'ooyala-main',
            type: 'script',
            async: false,
        },
        {
            src: 'http://player.ooyala.com/static/v4/stable/latest/skin-plugin/html5-skin.min.js',
            id: 'ooyala-skin',
            type: 'script',
            async: false,
        },
        {
            href: 'http://player.ooyala.com/static/v4/stable/latest/skin-plugin/html5-skin.min.css',
            id: 'ooyala-css',
            type: 'stylesheet',
        },
    ],
    playerParams: {
        width: '800px',
        height: '300px' ,
        autoplay: true
    }
}}]);
</script>
```
The example above shows how new OOYALA player scripts are passed in along with additional parameters that will affect and possibly overwrite the video player’s details. The same format should be used for all the OVPs with their own corresponding scripts. 

## Paywall Methods

The paywall instance has methods that can be used for accomplishing different functionalities. This adds to the flexibility of the application in covering various use-cases in addition to what can be accomplished via the embed code.

Below follows a description of all the paywall methods:

### `setLanguage` 

This method sets the language of the paywall interface. It is especially useful when invoked with the appropriate option from the language picker on multilingual pages. Thus, when you change the language of the site, the paywall language will be changed as well.

For instance, to set the paywall language to Danish, the following implementation is needed:

```javascript
    paywall.setLanguage('dk');
```

It is important to note that the language specified as method argument should be the short two-letter code for the language.

### `showPaywall`

This method is a multi-functional method that provides the option to invoke the paywall application for different use-cases via a custom HTML element on the page. This method has the following structure (with all the argument options included):

```javascript
    paywall.showPaywall({
      asset: { 
        assetId: 42564, 
        preselectedFeeId: 4508 
      }, 
      registerFirst: true 
    });
```

In addition, the `assetId` is part of the asset object in the method argument and represents the ID of a specific InPlayer asset. When attached to an HTML element click event, the method opens the paywall modal. If the user is not authenticated, the login screen would appear. After a successful authentication, the price option screen where all the prices added to the asset would be shown allow the end-user to select one and proceed further with the payment flow. 
Usage example:

```javascript
    paywall.showPaywall({asset: { assetId: 42564 }});
```
The `preselectedFeeId` is part of the asset object in the method argument and represents the ID of a specific price added to an InPlayer asset. It is always used together with the asset ID where the price is added. When attached to an HTML element click event, the method opens the paywall modal. If the user is not authenticated, the login screen would appear. After a successful authentication, the end-user would be sent directly to the payment screen where the specified price would be set for purchase.

Usage example:

```javascript
    paywall.showPaywall({
      asset: { 
        assetId: 42564, 
        preselectedFeeId: 4508 
      } 
    });
```

The `registerFirst` is a boolean parameter (true/false) that specifies whether the register or login screen of the paywall should be shown by default when the modal is open.
Usage example:

```javascript
    paywall.showPaywall({ registerFirst: true });
```

The object argument for the `showPaywall` method is optional. This means that the method can be invoked without arguments. With that way of usage, if the user is not authenticated, the login screen would appear and after successful authentication the modal would be closed. Upon subsequent invoking of the method, with the user being logged in, the account screen will be shown.

Usage example:

```javascript
    paywall.showPaywall();
```

### `isAuthenticated`

This method is a boolean method that tells whether an end-user has been authenticated on the page. 

Usage example:

```js
    paywall.isAuthenticated();
```

## Paywall Events

A paywall instance supports custom event handlers for any of its public events by using its `paywallInstance.on('event_name', callback);` method. Below are listed all of the supported public events with examples how to use them.

### `authenticated`

This event is fired whenever an account is successfully authenticated.

Usage example:

```js
    paywall.on('authenticated', function(e, data) {
        //e.type: 'authenticated'
        //e.action: 'login', 'register' or 'token'

        //data.account
        //data.access_token
        //data.expires
        //data.refresh_token
        //data.timestamp
        console.log("-- AUTHENTICATED --");
        console.log(e, data);
    });
```

### `logout`

This event is fired whenever an account delivers a successful logout operation.

Usage example: 

```js
    paywall.on('logout', function(e, data) {
        //e.type: 'logout'
            
        //data.account
        console.log("-- LOGOUT --");
        console.log(e, data);
    });
```

### `inject`

This event is fired when an asset's actual content is added on the page.

Usage example:

```js
    paywall.on('inject', function(e, data) {
        //e.type: 'inject'
            
        //data.account
        //data.asset
        console.log("-- INJECT --");
        console.log(e, data);
    });
```

### `payment`

The payment event is fired after each successful payment.

Usage example:

```js
    paywall.on('payment', function(e, data) {            
        console.log("-- PAYMENT --");
        console.log(e, data);
    });
```

### `init`

This event is fired when a paywall instance is created and initiated. It only occurs once during a paywall instance lifecycle.

Usage example:

```js
    paywall.on('init', function(e, data) {            
        console.log("-- INIT --");
        console.log(e, data);
    });
```

### `player`

This event is fired whenever a player instance is created.
Note: It is currently only supported for 'SportRadar' assets.


Usage example:

```js
    paywall.on('player', function(e, data) {            
        console.log("-- PLAYER --");
        // e.type
        // data.name
        // data.instance
        console.log(e, data);
    });
```

### `language`

The 'language' event is fired after a certain language has been switched.
This event is fired when a language is initially set as well as every time it gets changed by a user action or otherwise.

```js
    paywall.on('language', function(e, data) {            
        console.log("-- LANGUAGE --");
        console.log(e, data);
    });
```

### `access`

This event is fired when the paywall distributes the viewer the content they have access to.
This event is fired every time it is initially determined if the current user has access to the current asset or not. Additionally, it is also fired when this access status gets changed, e.g. when the asset is 'paid' or the access status turns 'expired' or 'revoked'.

```js
    paywall.on('access', function(e, data) {            
        console.log("-- ACCESS --");
        console.log(e, data);
    });
```

### `any`

The 'any' event is fired for every action mentioned above.

```js
    paywall.on('any', function(e, data) {            
        console.log("-- ANY EVENT --");
        console.log(e, data);
    });
```

### `close`

This event is fired when the paywall's modal gets closed by a user action or otherwise.

```js
paywall.on('close', function(e) {
    console.log("-- CLOSE --", e.type);
});
```

## Standalone Functionalities

The InPlayer's paywall also supports standalone functionalities involving the **login/logout button** functionality, as well as accessing the 'My Account' section of the paywall application.

Although you may use the paywall's JavaScript methods to invoke some of the functionalities or certain paywall screens, you can achieve the same functionalities by adding HTML classes to the elements on the page. 

Here is the list of the HTML classes that can be used for creating each of the standalone functionalities: 

| HTML class	|   Description |
|--------------|---------------|
| `inplayer-paywall-login`	| Invokes the login screen of the paywall |
| `inplayer-paywall-logout`	| Invokes the logout action  |
| `inplayer-paywall-account`	 | Invokes the 'My Account' screen of the registered user |
| `inplayer-paywall--ccm`      | Invokes the  default card management screen |
| `inplayer-paywall-change-pass`  | Invokes the 'Change Password' screen |

The advantage of using these classes is that they come with a built-in logic for displaying and hiding the elements, depending on whether the user is authenticated or not. For example, the HTML element with the **inplayer-paywall-logout class** will only be shown when the user is authenticated.

## Custom Asset Preview

There's a default asset preview template that you can tweak via our dashboard, but if that doesn't meet your custom needs you can always use the `noPreview` flag (by setting it to `true`) to disable displaying of the default preview altogether and put your own preview HTML code in the asset `div`.

```html
<div id="inplayer-assetID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
     [
      {
        id: 123, //assetID
        options: {
            noPreview: true
        }
      }
     ]
)
</script>
```

The embed code above will create a paywall instance but since `noPreview` is set to `true`, no preview will be shown. The next step is optional and it involves adding your own custom preview HTML code inside the DIV element of your asset and a call-to-action button outside the DIV element. Whatever preview code you decide to add, it will be replaced with the actual asset content once the user gets access.

```html
<div id="inplayer-assetID"></div>
// Create your HTML custom preview here
<button id="my-paywall-button">purchase</button>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
     [
      {
        id: 123, //asset ID
        options: {
            noPreview: true
        }
      }
     ]
)
</script>
```

Now, you have a custom preview and a custom call-to-action button that should invoke the paywall screen. To make the button functional, you need the following code:

```js
document.getElementById('my-paywall-button').addEventListener("click", () => { 
   paywall.showPaywall(
    {asset: { assetId: 42564 }}
   )
});
```

The `showPaywall` method is linked to the button which triggers the paywall functionality. That is the final step for functional custom preview.

## Embedding Specific Prices

The Paywall comes with a default display preview, but also offers you, as our merchant, the alternative of creating your own page elements instead of choosing to maintain the default look. Let’s consider a scenario where customers come across with an asset with two different prices on the page (say 5$ for a 24 hours access, and 30$ for a one-week access) instead of the default preview. In order to achieve this, first, you should initialize the paywall with the `noInject` and `noPreview` options. The 'noInject' parameter prevents the paywall from injecting a video after a successful purchase in favour of the creation of a custom pricing options screen. The `noPreview` parameter removes the standard preview template for the asset, allowing custom preview for each price.

```html

<div id="inplayer-assetID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
     [
      {
        id: 123, //asset ID
        options: {
            noPreview: true,
            noInject: true
        }
      }
     ]
)
</script>
```

Once the paywall instance is created, you can use additional methods for invoking functionalities, such as adding custom HTML blocks that describe both the pricing options and the call-to-action buttons for each one of them.

Here's how to add the custom HTML code for the first price:

```html
// First price description HTML code
<button id="first-price-button">purchase</button>
```

Now, add the paywall functionality trigger to the button for the corresponding price:

```js
document.getElementById('first-price-button').addEventListener("click", () => { 
   paywall.showPaywall(
    {asset: { assetId: 42564, preselectedFeeId: 4508 }}
   )
});
```

With this code, the `showPaywall` functionality is connected to your action button for one price. It will invoke the paywall flow but with pre-selected price as the `preselectedFeeId` parameter. The pricing screen will not appear as there is already a specific price option selected on that action. As there is 'noInject' option in the code where the paywall object is created, after a successful purchase the paywall modal will be closed.

For the second price, the same `showPaywall` function needs to be added to the second button but with a different `preselectedFeeId` parameter that identifies the other price option.
