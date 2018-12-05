---
id: paywall1
title: Paywall 1.0
---

The InPlayer Paywall application is fast and easy way of selling your content online.  For each digital asset that you create in the InPlayer platform, you are granted with corresponding embed code that will create the whole end-user experience once placed on some website. The Paywall app is only web-based solution. For more complex integrations or cross-platform solutions refer to our REST API or JS SDK guides. You can easily find the embed code of any asset  in the InPlayer Dashboard in the single asset section, as its shown in the screenshot.

![alt text](https://inplayer.com/wp-content/uploads/2018/07/embed_code.png "Logo Title Text 1")

## Standard embed code

The Paywall embed code includes two parts. The InPlayer Paywall application scripts:

```html
<script type='text/javascript' src='https://assets.inplayer.com/injector/staging/injector.js'></script>
<link rel='stylesheet' href='https://assets.inplayer.com/injector/staging/css/app.min.css' type='text/css' media='all'>
```

And the Asset embed code where the video should be embeded:

```html
<div id="inplayer-42095"></div>
<script type="text/javascript">
inplayer.inject('42095', '528b1b80-5868-4abc-a9b6-4d3455d719c8');
</script>
```

The Asset embed code is constructed from two parts as well. HTML code, that will create a DIV element with the Asset ID passed as the element ID in the following format: “inplayer-ASSET_ID”. In the previous example the asset id is 42095.

The second part of the Asset embed code is JavaScript code that should invoke the inject method of our JavaScript APP. That method will create the complete UI flow of a premium content. If no active account is logged in the browser the Inject method will render a preview template of the embedded Asset with a purchase button that will invoke widget overlay functionality for registering/login account, price selector and payment details page. After the visitor creates account, completes the flow and makes successful payment, the InPlayer application will replace the preview template with the Premium Asset(mostly video players) .

The InPlayer inject method receives 3 parameters, although in the standard embed code there is no 3rd parameter.

```js
inplayer.inject(ASSET_ID, MERCHANT_UUID, OPTIONS);
```

The first parameter is ASSET_ID, the same value from the DIV element ID of the HTML part of the embed code. The second parameter is MERCHANT_UUID, the unique identifier of the Merchant Account. The third, optional parameter can be Array of many additional options that are described in the following section.

## Embed code Options

All embed code Options should be passed as Array in the last parameter of the embed code. Here is an example of an embed code containing all possible options:

```js
inplayer.inject(assetID, merchantUUID, {
    global: {
        hideUserMenu: true, 
        freeAccess: 555 
    },
    noPreview: true, 
    noContent: true, 
    language: {
        initial: "en" 
    },
    oauthAppKey: "b60220e1d5dd0226c73634f667a69b4c", 
    registerFirst: true, 
    ssoDomain: "https://subdomainname.accounts.staging-v2.inplayer.com", 
    brandingId: 455, 
    codeAccess: { 
        inputs: [{ 
            name: "access_code", 
            placeholder: "Please enter your access code", 
            dataPlaceholder: "access_code" 
        }, {
            name: "first_name",
            placeholder: "Your first name here"
        }, {
            name: "last_name",
            placeholder: "Your last name here",
        }],
        codePattern: "{{first_name}}-{{last_name}}-{{access_code}}" 
    },
    player_scripts: { 
        brightcove: [
            "//some.url.of.some.script//script.js",
            "//some.url.of.some.stylesheet//style.css"
        ],
        jwplayer: [
            "https://my.custom.script/jwplayer.js"
        ]
    },
    player_params: { 
        brightcove: {
            some_custom_option: 555,
            some_value_to_override: "1234567890"
        }
    },
    // event callbacks
    onAny: function(data){
    // do something with data  
    },
    onInit: function(data){
    // do something with data
    },
    onAccess: function(data){
    // do something with data
    },
    onLogin: function(data){
    // do something with data
    },
    onRegister: function(data){
    // do something with data
    },
    onInject: function(data){
    // do something with data
    },
    onPayment: function(data){
    // do something with data
    },
    onLogout: function(data){
    // do something with data
    },
    onLanguage: function(data){ 
    // do something with data
    }
}
```

There are two types of embed code options. Optional settings and events. With the optional settings you can add, remove or change certain functionalities of the paywall. With the optional events, you can have additional functionality that can be triggered after some action in the paywall.

## Optional Settings

|Setting|Type|Description|
|noPreview|Boolean|Hides the preview template, in case custom preview is needed. |

## Optional Events

The Paywall application is capable of firing multiple events based on certain action. You can use the Paywall events to have additional custom functionalities that will be executed only after the event type. Here is a list of all supported Event types.

Here are few examples and guides for solving different problems with events:
How to manage Facebook pixel conversions with InPlayer Paywall Events
How to use Google Analytics with InPlayer Paywall Events

In the following section you can find some examples of how to solve different scenarios with the paywall options.

## Using Custom Preview

The following example illustrates how using the noPreview option in the Paywall removes the default preview template and allows creating a custom preview, for example a video trailer. Additionally, it shows how to create a Call-to-Action button that invokes the paywall experience.

Once our CSS and JS scripts are included in a website, the first part of the embed code is a div element for the place where the preview content is going to be created. After successful payment, the paywall embeds the premium video overwriting the custom preview content.

```html
<div id="inplayer-ASSET_ID"></div>
```

The next part of the embed code serves to create a Call-to-Action button, which invokes the paywall for the desired premium ASSET. In this example, the action button is the html button element. However, this functionality can be added on any other element type. To do so, use a class in the following format: inplayer-paywall-ASSET_ID

```html
<div id="inplayer-ASSET_ID">
// Your preview template code
<button class="inplayer-paywall-ASSET_ID">purchase video</button>
</div>
```

In order for the button to disappear when the premium content is loaded, the button has to be placed inside the preview content div element. The user should not be able to click the purchase button for assets they have already purchased. The Paywall overwrites everything inside the preview div element, so once successful payment has been made, the button disappears.

The following is JavaScript code which adds the paywall functionalities to the html elements. It’s standard inject code with the noPreview setting included.

```js
inplayer.inject(ASSET_ID, MERCHANT_UUID, {
 noPreview: true, 
 onLogout: function(data){
  location.reload();
 }
});
```

Our paywall cannot know what the preview content of the video in question was, so location.reload in the onLogout event is used. After logging out, our Paywall removes the premium video, but since the paywall does not know what was on the page before the video was injected, a page reload brings that preview up after logging out.

Here is the full embed code for custom preview functionality:

```html
<script type='text/javascript' src='https://assets.inplayer.com/injector/staging/injector.js'></script>
<link rel='stylesheet' href='https://assets.inplayer.com/injector/staging/css/app.min.css' type='text/css' media='all'>

<div id="inplayer-ASSET_ID">
// Your preview template code
<button class="inplayer-paywall-ASSET_ID">purchase video</button>
</div>

<script type="text/javascript">
inplayer.inject(ASSET_ID, MERCHANT_UUID, {
 noPreview: true, 
 onLogout: function(data){
  location.reload();
 }
});
</script>
```