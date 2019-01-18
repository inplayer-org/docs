---
id: paywall2
title: Paywall 2.0
---

The Paywall 2.0 is the latest InPlayer's content monetization application, featuring multiple changes and improvements over its preceding version. The paywall retains its purpose of providing you with an embed code for each asset created on our platform, can be found at the same place of the first paywall application, so you can insert them to your website and ease the accessibility for your end-users. 
The Paywall 2.0 embed code can be found at the same place where it used to reside at Paywall 1.0, i.e. at the asset section. In addition, there are two different tabs that enable the embed code generator to switch between both Paywall versions.

## Standard Embed Code

The Paywall 2.0 embed code also consists of InPlayer Paywall Scripts and Asset Embed Code, but differs slightly from its precedent in that the former is now only one minified JS file, encompassing CSS inside:

```html
<script type='text/javascript' src='https://assets.inplayer.com/paywall/staging/paywall.min.js'></script>
```
Whereas the latter, the asset embed code, has the following format:

```html
<div id="inplayer-ASSET_ID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID, [{ id: ASSET_ID}]);
</script>
```

## OVP Custom Embed Code

If dealing with an OVP asset type, the embed code can be constructed having provided the original Video ID from the external OVP source. The format for embedded external asset ID is the following:

```html
<div id="inplayer-OVP_NAME-OVP_VIDEO_ID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID,
     [
      {
         external: {
            type: 'OVP_NAME',
            id: OVP_VIDEO_ID,
         },
      },
     ]
)
</script>
```

## Multiple Assets Embed Code

The Paywall 2.0 also supports multiple assets embed code. To embed multiple assets, you should include them in the JavaScript code as an array. The position of the html elements where the assets would be rendered is not important. Bellow, you can find an example of multiple assets embed code in action.

```html
<script type='text/javascript' src='https://assets.inplayer.com/paywall/staging/paywall.min.js'></script>

<div id="inplayer-ASSET_1_ID"></div>
<div id="inplayer-ASSET_2_ID"></div>
<div id="inplayer-ASSET_3_ID"></div>

<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID, [{id: ASSET_1_ID}, {id: ASSET_2_ID}, {id: ASSET_3_ID}]);
</script>
```

## Embed Code Options

Depending on the need, you can set up additional options in the embed code. You can choose between the asset options, that can be set up per asset, and the global paywall options, that affect all the assets. The asset embed code options should be passed in, in addition to the asset id:

```html
<div id="inplayer-ASSET_ID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID,
     [
      {
        id: ASSET_ID,
        //per asset options object        
        options: {
            noPreview: true,
            brandingId: "111222",
            noInject: true
        } 
      }
     ]
)
</script>
```

When the options are used as in the example above, they affect only the asset concerned. In case there are multiple assets with global paywall options set up for each asset in the embed code, the options should be passed in outside of the assets’ list in the following manner:

```html
<div id="inplayer-ASSET_ID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID,
     [
      {
         id: ASSET_ID
      },
     ],
     //global options object
     {
       language: 'EN',
       hideUserMenu: true, 
       hideLogo: true,
       hideProtectedBy: true
     }
)
</script>
```

Here is a list of all the Paywall options, those per asset and the global ones:

## Custom Player Options

Each asset type in the InPlayer’s platform has its own content format implementation. In most of the cases, where the asset is of OVP type(online video provider hosted videos), the Paywall will create a video player after an account with premium access ask for the content.

Each OVP has its own player implementation. The InPlayer paywall renders the default players with standard player parameters. However, in case there is need for changing the player or some player parameter, you can pass in custom player scripts and / or custom player parameters through the InPlayer embed code. The following example code shows how player scripts or parameters can be altered:

```html
<div id="inplayer-ASSET_ID" class="inplayer-paywall"></div>
<script>
var paywall = new InplayerPaywall(MERCHANT_UUID, [{ id: ASSET_ID, options: {
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

'Set Language Method': 
This method sets the language of the paywall interface. It is especially useful when there is a multilingual page for combining the language picker on the page to change the language of the paywall as well. In that way, the experience is much smoother for the end-user.

For instance, to set the paywall language to Danish, the following implementation is needed:

```html
<script>
    paywall.setLanguage('dk');
</script>
```

It is important to note that the language specified as method argument should be the short, two-letter code for the language.

'Show Paywall Method':
This method is a multi-functional method that provides option to invoke the paywall application for different use-cases via a custom HTML element on the page. This method has the following structure (with all the argument options included):

```js
<script>
    paywall.showPaywall({
      asset: { 
        assetId: 42564, 
        preselectedFeeId: 4508 
      }, 
      registerFirst: true 
    });
</script>
```

More specifically:

'assetId' – is part of the asset object in the method argument and represents the ID of a specific InPlayer asset. When attached to an HTML element click event, the method opens the paywall modal. If the user is not authenticated, the login screen would appear. After a successful authentication, the price option screen, where all the prices added to the asset would be shown, allow the end-user to select one and proceed further with the payment flow. 
Usage example:

```html
<script>
    paywall.showPaywall({asset: { assetId: 42564 }});
</script>
```
'preselectedFeeId' – is part of the asset object in the method argument and represents the ID of a specific price added to an InPlayer asset. It is always used together with the asset id where the price is added. When attached to an HTML element click event, the method opens the paywall modal. If the user is not authenticated, the login screen would appear. After a successful authentication, the end-user would be sent directly to the payment screen where the specified price would be set for purchase.

Usage example:

```html
<script>
    paywall.showPaywall({
      asset: { 
        assetId: 42564, 
        preselectedFeeId: 4508 
      } 
    });
</script>
```

'registerFirst' – boolean parameter (true/false) that specifies whether the register or login screen of the paywall should be shown by default when the modal is open.
Usage example:

```html
<script>
    paywall.showPaywall({ registerFirst: true });
</script>
```

The object argument for the ‘showPaywall’ method is optional. This means that the method can be invoked without arguments. With that way of usage, if the user is not authenticated, the login screen would appear, and after successful authentication the modal would be closed. Upon subsequent invoking of the method, with the user being logged in, the account screen will be shown.

Usage example:

```html
<script>
    paywall.showPaywall();
</script>
```

'Is Authenticated Method': 
This method is a boolean method that tells whether an end-user has been authenticated on the page. 

Usage example:

```js
<script>
    paywall.isAuthenticated();
</script>
```

## Standalone Functionalities

The InPlayer Paywall supports standalone functionalities for several purposes: login/logout button functionality, as well as accessing the 'my account' section of the paywall application.

Although you may use the paywall JavaScipt methods to invoke some functionality or certain paywall screens, there is an implementation with adding HTML classes to elements on the page. Here is the list of HTML classes that can be used to create each standalone functionality.

| HTML class	|   Description |
| inplayer-paywall-login	| Invokes the login screen of the paywall |
| inplayer-paywall-logout	| Invokes the logout action  |
| inplayer-paywall-account	 | Invokes the my account screen of the logged in user |

The advantage of using these classes is that they come with built in logic for displaying and hiding the elements depending on whether the user is authenticated or not. For example, the HTML element with the inplayer-paywall-logout class, will be shown only when the user is authenticated.

## Custom Asset Preview

Each asset in the InPlayer platform has its own preview template with call-to-action button that is rendered after serving an asset embed code on a web page. Those preview templates can be edited and tweaked in the dashboard, but in some cases the given flexibility doesn’t solve whats needed. Therefore the paywall supports a functionality for creating fully custom HTML preview for each embedded asset, and a way to add call-to-action button that will trigger the paywall experience.

First a standard embed code is needed with noPreview option added:

```html
<div id="inplayer-ASSET_ID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID,
     [
      {
        id: ASSET_ID,
        options: {
            noPreview: true
        }
      }
     ]
)
</script>
```

The embed code from above will create a Paywall object but there will be no preview template, there will be nothing on the screen. Next step is to add your own custom preview HTML code with call-to-action button inside of the DIV element of your asset. The reason why the preview code needs to be inside the asset DIV container is because the paywall will swap that content with the real asset after purchase.

```html
<div id="inplayer-ASSET_ID">
// Create your HTML custom preview here
<button id="my-paywall-button">purchase</button>
</div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID,
     [
      {
        id: ASSET_ID,
        options: {
            noPreview: true
        }
      }
     ]
)
</script>
```

Now we have a custom preview and a custom call-to-action button that should invoke the paywall screen. To make the button functional, we need the following code:

```js
document.getElementById('my-paywall-button').addEventListener("click", () => { 
   paywall.showPaywall(
    {asset: { assetId: 42564 }}
   )
});
```

The showPaywall method is linked to the button. It will trigger the paywall functionality. Thats the final step for functional custom preview template.

## Embed Specific Prices

There is a usual need of content owners to be able to trigger the paywall for only specific price point of certain asset on some action button. In case there is a need to present two different pricing options on two different HTML blocks and buttons for the same asset(for example when its needed to clearly show different options of Subscription vs PPV with custom details, and which features the viewers will get after purchasing each price option), here is the way to do it:

We will take a scenario with one asset, that inherit two different prices for a package. The idea is to create custom descriptions for both prices and different buttons that will lead to only specific price.
The first step would be adding embed code that will create the Paywall object for the asset.

```html

<div id="inplayer-ASSET_ID"></div>
<script type="text/javascript">
var paywall = new InplayerPaywall(MERCHANT_UUID,
     [
      {
        id: ASSET_ID,
        options: {
            noPreview: true,
            noInject: true
        }
      }
     ]
)
</script>
```

As you can notice it is a standard asset embed code with two additional parameters: noInject and noPreview. The noInject parameter will stop the paywall from injecting a video after a successful purchase. Since the point is to create custom pricing options screen the content injection is not needed. The second parameter noPreview will remove the standard preview template for the asset allowing custom preview for each price.

Now after the Paywall object is created we may use additional methods to invoke functionalities. The next thing that needs to be done is the custom HTML blocks that will describe both pricing options and call-to-action buttons for each of them.

Add the custom HTML code for the first price:

```html
// First price description HTML code
<button id="first-price-button">purchase</button>
```

Now add the paywall trigger functionality to the button for the corresponding price:

```js
document.getElementById('first-price-button').addEventListener("click", () => { 
   paywall.showPaywall(
    {asset: { assetId: 42564, preselectedFeeId: 4508 }}
   )
});
```

With this code the method showPaywall functionality is connected to your action button for one price. It will invoke the paywall flow but with pre-selected price as the preselectedFeeId parameter. The pricing screen will be skipped since there is a specific price option selected already on that action. Because there is noInject option in the code where the Paywall object is created, after a successful purchase the paywall modal will be closed.

For the second price, the same showPaywall function needs to be added to the second button, but with different preselectedFeeId parameter that identifies the other price option.





