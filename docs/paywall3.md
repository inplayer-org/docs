---
id: paywall3
title: v3
---

The InPlayer paywall application provides you with a fast and easy way for selling your content online. For each digital asset created in our platform, you have available a corresponding embed code that creates the whole end-user experience once placed on a website. The paywall application is only the web-based solution, so for more complex integrations or cross-platform solutions refer to our REST API or JS SDK guides.

Paywall 3.0 is our latest content monetization application featuring innovations and optimizations over its preceding versions. To find the Paywall 3.0 embed code for your asset(s) go to your InPlayer Dashboard and proceed to the 'Assets' section.

## Standard Embed Code

The Paywall 3.0 embed code consists of two parts: **InPlayer paywall scripts** and an **asset embed code**.

The scripts are stripped down from any redundancies from the previous versions and therefore they contain a minified JS file, encompassing CSS inside:

```
<script type="text/javascript" src="https://assets.inplayer.com/paywall/v3/paywall.min.js"></script>
```

In addition, the asset embed code has the following format:

```
<div id="inplayer-{asset_id}" class="inplayer-paywall"></div>

<script type="text/javascript">

var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', [{ id: 123}]);

// merchant UUID and assetID are the function arguments from above

</script>
```

Here is a basic example of loading an asset with specified asset ID and merchant UUID:

```
<div id="inplayer-40112" class="inplayer-paywall" />
<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
        [{
            id: 40112,
            options: {
                preselectedFeeId: 4410, // optional
                noInject: true, // optional
                noPreview: false, // optional
                brandingId: "597", // optional
                showPreviewPrices: true, // optional
                registerFirst: true, // optional
            }
        }]);
</script>
```

The asset ID in the example is `40112` and the merchant's unique universal identifier (UUID) is represented as `c6f4002f-7415-4eb6-ab03-72b0f7aff0e8`. According to your needs, you can choose which options you want to include in your embed code and therefore create the complete UI flow of a premium content. You can customize your asset with a specific branding theme, decide between the Register Screen or the Login Screen as a default one, you can skip the Price Options screen by choosing a price option for a default one; decide whether you want the premium content injected automatically after a successful payment or maybe you would rather have displayed an asset preview (customized or the default one) with a purchase button that would invoke widget overlay functionality for registering/login account, a price selector, and a payment details page.

## OVP Custom Embed Code

When dealing with an OVP asset type, the embed code can be constructed having provided the original video ID from the external OVP source. The video ID type is external, so it has to be specified as such. Optionally, you can set up `preselectedFeeId`, `noInject`, `noPreview`, `brandingId`, `showPreviewPrices`, and/or `registerFirst`.

The format for embedded external asset ID is the following:

```
<div id="inplayer-brightcove-5784466086001" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        external: {
            type: 'brightcove',
            id: 5784466086001,
        },
        options: {
            preselectedFeeId: 4410,
            noInject: true,
            noPreview: false,
            brandingId: "597",
            showPreviewPrices: true,
            registerFirst: true,
        }
    }, ]
);
</script>
```

The 'type' parameter specified in the example is `brightcove`(for Brightcove) but it can be any of the following values:

| Type | Value |
| ---- | ----- |
| Amazon Cloudfront | aws |
| DaCast | dacast |
| JWPlayer | jw |
| Kaltura | kaltura |
| Laola1.tv | laola |
| LiveStream | livestream |
| Ooyala | ooyala |
| Panopto | panopto |
| Piksel | piksel |
| Qbrick | qbrick |
| StreamAMG | streamamg |
| SportRadar | sportradar |
| Wistia | wistia |
| Wowza | wowza |
| Vidyard | vidyard |
| Cloudfront | cloudfront |

## Loading an Asset in a Custom Container

With Paywall 3.0, you can now use a custom element as an asset container as opposed to the default one - asset ID and set up the options per asset as you find fitting.

```
// Basic example InPlayerPaywall(merchantUUID, [Object{id, ...options}])
<div id="custom-asset-container" class="inplayer-paywall" />
<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112,
        containerId: options: {
            noPreview: false,
            brandingId: "597",
        }
    }]
);
</script>
```

## Multiple Assets Embed Code

Just like the previous version, Paywall 3.0 also enables you to embed multiple assets at once, by including them in the JavaScript code as an array. The order of the html elements where the assets would be rendered is not important.

Example:

```
<script type='text/javascript' src='https://assets.inplayer.com/paywall/staging/paywall.min.js'></script>

<div id="inplayer-ASSET_1_ID"></div>
<div id="inplayer-ASSET_2_ID"></div>
<div id="inplayer-ASSET_3_ID"></div>

<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', [{id: ASSET_1_ID}, {id: ASSET_2_ID}, {id: ASSET_3_ID}]);
</script>
```

## Embed Code Options

Depending on the need, as mentioned before, you can set up additional options in the embed code. You can choose between the **asset options** that can be set up per asset and the **global options** that affect all the assets. The main available asset options are:

`noPreview`, `brandingId`, and `showPreviewPrices`. They should be passed in, in addition to the asset `id`:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
// No preview option, branding option and show prices preview option
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112,
        options: {
            noPreview: true,
            brandingId: "51424",
            showPreviewPrices: true,
        }
    }]
);
</script>
```

### Additional Asset Options

Apart from the main asset options, there are additional **CSS/JS scripts** available to be imported to the player being loaded after purchase, along withquery parameters meant for **player customisation.** More precisely, these scripts are given to the player being loaded after a purchase is completed. For this reason, they should be distinguished from the general scripts included in the asset embed process.

Take a look at the examples provided to learn how you can incorporate them in your embed code.

Importing scripts (CSS/JS):

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112,
        options: {
            noPreview: true,
            brandingId: "51424",
            showPreviewPrices: true,
            playerScripts: [{
                    src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
                    type: 'script',
                    id: 'my-custom-id',
                    async: false
                    parent: 'container-id'
                },
                {
                    href: 'https://ajax.googleapis.com/jquery.mobile.min.css',
                    type: 'style',
                    parent: 'container-id'
                }
            ],
        }
    }]
);
</script>
```

You can add **custom player** parameters for the OVP (usually a video player) used by the asset such as a language setup or adding any value you would like to include for the `myParam`parameter.

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112,
        options: {
            noPreview: true,
            brandingId: "51424",
            showPreviewPrices: true,
            playerParams: {
                language: 'en',
                myParam: 'any value'
            }
        }
    }]
);
</script>
```

Disabling the voucher feature:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112,
        options: {
            disableVoucher: true,
        }
    }]
);
</script>
```

Embedding a code-access asset:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112,
        options: {
            codeAccess: {
                inputs: {
                    access_code: 'custom placeholder for the access_code input',
                    customInput1: 'This string will be the placeholder of customInput1',
                    customInput2: 'This string will be the placeholder of customInput2',
                },
                codePattern: '{{customInput1}}-{{customInput2}}-{{access_code}}',
            },
        }
    }]
);
</script>
```

### Additional Global Options

Depending on your preference, there are additional global options to include in your embed code as to customize the assets to your liking. You get to set up the language of your asset(s) via the paywall `language` option (English is the default one), you get to decide whether you want your user menu or the modal header logo displayed or hidden, the former via the `hideUserMenu` and the latter via the `hideLogo` option as in the example below:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
// InplayerPaywall(merchant UUID, [Object{id, ...opts}], {...opts})
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112
    }, ], {
        language: 'de',
        hideUserMenu: true,
        hideLogo: true,
        registerFirst: true,
    }
);
</script>
```

You can also decide between hiding or customising the footer links by setting up the following options: `footerLinks`, `hideFooterLinks`, and `hideProtectedBy`.

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
// InplayerPaywall(merchant UUID, [Object{id, ...opts}], {...opts})
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112
    }, ], {
        footerLinks: [{
            text: 'Custom text',
            url: '//some.custom.link'
        }],
        hideFooterLinks: true,
        hideProtectedBy: true,
    }
);
</script>
```

### Authentication Paywall Options

Optionally, you can authenticate users via `oauthAppKey` (the merchant's UUID is to be used by default) and by providing a valid SSO domain to enable SSO feature:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
// InplayerPaywall(merchantUUID, [Object{id, ...opts}], {...opts})
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112
    }, ], {
        oauthAppKey: 'some-key',
        ssoDomain: 'https://appkey.sso.domain.url',
    }
);
</script>
```

### Paywall Options Descriptions

To gain a better understanding of all paywall options mentioned above (both per asset and global) take a look at the following table:

| **Name** | **Description** | **Format** | **Usage type** |
| --- | --- | --- | --- |
| `preselectedFeeId` | Preselects a price option for a specific access fee by default and effectively skips the 'Price Options' screen; optional. | Number | Asset option |
| `noInject` | If it is set as `true`, the asset's content will not be injected; optional. | Boolean(set `false` by default) | Asset option |
| `noPreview` | If it is set as `true`, the asset preview will not be displayed (used for custom preview); optional. | Boolean(set` false` by default) | Asset option |
| `brandingId` | Sets a specific branding theme for the asset other than the default one; optional. | Number | Asset option |
| `showPreviewPrices` | If it is set as `true`, the prices preview will be displayed. | Boolean(set `false` by default) | Asset option |
| `playerScripts` | An array of objects that can either be of type `script` or type `stylesheet`. | JSON Object | Asset option |
| `playerParams` | An object containing custom player parameters for the video player used by the asset. | JSON Object | Asset option |
| `myParam` | A placeholder for any value you want to include. | Number | Asset option |
| `disableVoucher` | If it is set as `true`, the voucher section will not be displayed. | Boolean (set `false` by default) | Asset option |
| `codeAccess` | An object consisting of the access code, custom inputs, and code patterns. | JSON Object | Asset option |
| `inputs` | An object containing the access code and custom inputs. | JSON Object | Asset option |
| `access_code` | A custom placeholder for the access code input; optional. | Char | Asset option |
| `customInput1/2` | The placeholder of the custom input/code. | Char | Asset option |
| `codePattern` | The custom inputs and the access code together make the codePattern. The default value is `{ inputs: { access_code: 'Code' }, codePattern: '{{access_code}}' }`; optional. | Char | Asset option |
| `language` | Sets the fallback language; English or `en` is the default one. | Language code | Global option |
| `hideUserMenu` | If it is set as`true`, it hides the user menu dropdown of the registered account. | Boolean(set `false` by default) | Global option |
| `hideLogo` | If it is set as`true`, it hides the paywall logo (in the modal header). | Boolean(set `false` by default) | Global option |
| `footerLinks` | Inserts an array of external links in the paywall footer to replace the default ones; optional. | JSON, e.g. { text: "Google", url: "[https://www.google.com/](https://www.google.com/)" } | Global option |
| `hideFooterLinks` | If it is set as `true`, the footer links will not be displayed. | Boolean(set `false` by default) | Global option |
| `hideProtectedBy` | If it is set as `true`, the 'Protected by InPlayer' label will not be displayed. | Boolean(set `false` by default) | Global option |
| `oauthAppKey` | Sets the OAuth application to be used for authentication (sets the merchant's `uuid` by default); optional. | String | Global option |
| `brandingId` | Sets a global branding theme for all assets on a page. | Number | Global option |
| `registerFirst` | If `true`, it sets the 'Register screen' as default, as opposed to the 'Login screen'; optional. | Boolean(set `false` by default) | Global option |
| `ssoDomain` | By providing a valid `ssoDomain`, the SSO feature will be enabled; optional. | String | Global option |

## Paywall Methods

The paywall instance has methods that can be used for accomplishing different functionalities. This adds to the flexibility of the application in covering various use-cases in addition to what can be accomplished via the embed code.

Below follows a description of all the paywall methods:

### `setLanguage`

This method sets the language of the paywall interface. It is especially useful when invoked with the appropriate option from the language picker on multilingual pages. Thus, when you change the language of the site, the paywall language will be changed as well.

For instance, to set the paywall language to Danish, the following implementation is needed:

```
paywall.setLanguage('dk');
```

It is important to note that the language specified as method argument should be the short two-letter code for the language.

### `showPaywall`

This method is a multi-functional method that provides the option to invoke the paywall application for different use-cases via a custom HTML element on the page. This method has the following structure (with all the argument options included):

```
paywall.showPaywall({
    asset: {
        assetId: 42564,
        preselectedFeeId: 4508
    },
    registerFirst: true
});
```

In addition, the `assetId` is part of the asset object in the method argument and represents the ID of a specific InPlayer asset. When attached to an HTML element click event, the method opens the paywall modal. If the user is not authenticated, the login screen would appear. After a successful authentication, the price option screen, where all the prices added to the asset would be shown, allowing the end-user to select one and proceed further with the payment flow. Usage example:

```
paywall.showPaywall({asset: { assetId: 42564 }});
```

The `preselectedFeeId` is part of the asset object in the method argument and represents the ID of a specific price added to an InPlayer asset. It is always used together with the asset ID where the price is added. When attached to an HTML element click event, the method opens the paywall modal. If the user is not authenticated, the login screen would appear. After a successful authentication, the end-user would be sent directly to the payment screen where the specified price would be set for purchase.

Usage example:

```
paywall.showPaywall({
    asset: {
        assetId: 42564,
        preselectedFeeId: 4508
    }
});
```

The `registerFirst` is a boolean parameter that specifies whether the register or login screen of the paywall should be shown by default when the modal is open. Usage example:

```
paywall.showPaywall({ registerFirst: true });
```

The object argument for the `showPaywall` method is optional. This means that the method can be invoked without arguments. With that way of usage, if the user is not authenticated, the login screen would appear and after successful authentication the modal would be closed. Upon subsequent invoking of the method, with the user being logged in, the account screen will be shown.

Usage example:

```
paywall.showPaywall();
```

### `checkUserAccess`

This method checks whether the user has valid access for the specified combination of `assetId`, `clientId`, and `accessFeeId`

Example:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112
    }, ],
);

async paywall.checkUserAccess(assetId, clientId, accessFeeId);
</script>
```

### `isAuthenticated`

This method is a boolean method that tells whether an end-user has been authenticated on the page. 

Example:

```js
    paywall.isAuthenticated();
```

### `showDonationsFlow`

This method initiates the donation flow. 

Example:

```js
    paywall.showDonationsFlow(assetId);
```


### Asset Manipulation Methods

The Paywall 3.0 increases flexibility by introducing methods that help you easily manipulate with adding or removing specific or all assets to/from a paywall instance. Also, aids optimization of created paywall instances by giving you the choice of destroying those that are most likely not to be used in the recent future.

| **Method and Option** | **Description** |
| --- | --- |
| `addAssets([...assetArray]): void` | A method that adds an array of assets to a previously created paywall instance. |
| `removeAssets([...assetArray], keepAssetData?: boolean = false): void` | Removes specified assets from the paywall instance. Note 1: The assets must be specified exactly as they were added - if containerId was specified on adding, it would also have to be specified on removal.Note 2: The method receives an optional boolean argument which is `false` by default. If `true` is sent, it tells the paywall instance to keep all the data of the assets, so they can be reused at some point in the future. To learn more of the asset data preservation refer to the `keepAssetData?: boolean = false` method. |
| `removeAllAssets(keepAssetData?: boolean = false): void` | Removes all assets from a given paywall instance. Note 1: After the assets removal, the paywall instance remains 'alive' and other assets can be added to it at any later time.Note 2: The method receives an optional boolean argument which is `false` by default. If `true` is sent, it tells the paywall instance to keep all the data of the assets, so they can be reused at some point in the future. To learn more of the asset data preservation refer to the `keepAssetData?: boolean = false` method. |
| `keepAssetData?: boolean = false` | If it is set as `true`, this argument tells the paywall instance to preserve all the data of the asset(s) so it can be reused. In other words, you get to unmount all asset data so that the same assets can be re-added (by using the `.addAssets()` method) at some point in time. The process of asset remounting would progress faster as it skips making some of the backend API calls once again. |
| `destroy(): void` | Destroys the paywall instance and it can no longer be used in any way. |
| `isDestroyed():` | A boolean indicating whether the instance has been destroyed. |

Example:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112
    }, ],
);

paywall.addAssets([{
        id: 40113,
        options: {
            brandingId: 569.
        },
    },
    {
        external: {
            type: 'brightcove',
            id: '5784466086001',
        },
        containerId: 'bc-custom-asset-container-for-id-5784466086001',
        options: {
            brandingId: 564,
        },
    }
]);

paywall.removeAssets([{
        id: 40113,
    },
    true
]);

paywall.removeAllAssets(
    true
);

paywall.destroy();
paywall.isDestroyed();
</script>
```

### Asset Manipulation Paywall Options

There is also the possibility of enabling removal for all your assets by invoking a single paywall option and/or allowing destruction for a paywall instance. 

:::caution
Beware that these are **global options** which once being set cannot be changed later.
:::

| **Option** | **Description** | **Format** | **Usage Type** |
| --- | --- | --- | --- |
| `allowRemoveAssets` | Enables removal for all assets. If you don't want to allow removal of assets at any point, you need to set this option to `false` upon creating the paywall instance. Note: Once set to `false`, `paywall.removeAssets()` and `paywall.removeAllAssets()` will not work (but a non-blocking error message would be displayed on the console). | Boolean(`true` is set by default) | Global Option |
| `allowDestroy` | Enables destruction of a given paywall instance. If you don't want to allow destruction of the paywall instance at any point, you need to set this option to `false` upon creating the paywall instance. Once set to `false`, paywall.destroy() will not work (but a non-blocking error message would be displayed on the console). | Boolean(`true` is set by default) | Global Option |


## Paywall Events

The paywall instance supports custom event handlers for any of its public events by using its `paywallInstance.on('event_name', callback);` method. Below you can find examples of all supported public events as guidance on how to use them.

### `authenticated`

This event is fired whenever an account is successfully authenticated.

Usage example:

```
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

```
paywall.on('logout', function(e, data) {
    //e.type: 'logout'
    //data.account
    console.log("-- LOGOUT --");
    console.log(e, data);
});
```

### `inject`

This event is fired when the asset's content is added on the page.

Usage example:

```
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

```
paywall.on('payment', function(e, data) {
    console.log("-- PAYMENT --");
    console.log(e, data);
});
```

### `init`

This event is fired when a paywall instance is created and initiated. It only occurs once during the paywall instance lifecycle.

Usage example:

```
paywall.on('init', function(e, data) {
    console.log("-- INIT --");
    console.log(e, data);
});
```

### `player`

This event is fired whenever a player instance is created. Note: It is currently only supported for 'SportRadar' assets.

Usage example:

```
paywall.on('player', function(e, data) {
    console.log("-- PLAYER --");
    // e.type
    // data.name
    // data.instance
    console.log(e, data);
});
```

### `language`

The 'language' event is fired after the previously set up paywall language has been switched. This event is fired when a language is initially set as well as every time it gets changed by a user action or otherwise.

```
paywall.on('language', function(e, data) {
    console.log("-- LANGUAGE --");
    console.log(e, data);
});
```

### `access`

This event is fired when the paywall distributes the viewer the content they have access to. This event is fired every time it is initially determined if the current user has access to the current asset or not. Additionally, it is also fired when this access status gets changed, e.g. when the asset is 'paid' or the access status turns 'expired' or 'revoked'.

```
paywall.on('access', function(e, data) {
    console.log("-- ACCESS --");
    console.log(e, data);
});
```

### `any`

The 'any' event is fired for every action mentioned above.

```
paywall.on('any', function(e, data) {
    console.log("-- ANY EVENT --");
    console.log(e, data);
});
```

### `close`

This event is fired when the paywall's modal gets closed by a user action or otherwise.

```
paywall.on('close', function(e) {
    console.log("-- CLOSE --", e.type);
});
```

### `preview`

This event is fired when an asset's preview is added on the page.

example

```
paywall.on('preview', function(e) {
    //e.type: 'preview'
    console.log("-- PREVIEW --");
    console.log(e);
});
```

## Standalone Functionalities

Much like the previous version, Paywall 3.0 also supports the standalone functionalities involving the login/logout button functionality, the 'Change Password' screen, the card management screen, as well as accessing the 'My Account' section of the paywall application.

Although you may use the paywall's JavaScript methods to invoke some of the functionalities or certain paywall screens, you can achieve the same functionalities by adding HTML classes to the elements on the page. 

Here is the list of the HTML classes that can be used for creating each of the standalone functionalities: 

| HTML class	|   Description | 
|--------------|---------------|
| `inplayer-paywall-login`	| Invokes the login screen of the paywall | 
| `inplayer-paywall-logout`	| Invokes the logout action  | 
| `inplayer-paywall-account`	 | Invokes the 'My Account' screen of the registered user | 
| `inplayer-paywall-ccm`      | Invokes the  default card management screen | 
| `inplayer-paywall-change-pass`  | Invokes the 'Change Password' screen | 
| `inplayer-paywall-purchases`  | Invokes the 'My Purchases' paywall screen where an end-user can see the list of payments they have completed | 
| `inplayer-paywall-donations`	| Invokes the donations flow for the provided asset  | 


The HTML class **inplayer-paywall-donations** can be added to any HTML element. The `asset-id` represents the ID of a specific InPlayer asset. Usage example:

```
<button class="inplayer-paywall-donations" data-asset-id="{asset-id}" />
```

When clicking on this element, the donations flow for the provided asset is initiated by opening the donation options screen. 
The donation options screen lists all donation options added to the asset that is being accessed. After selecting a donation option the end-user can proceed with the donation payment.

The advantage of using these classes is that they come with a built-in logic for displaying and hiding the elements, depending on whether the user is authenticated or not. For example, the HTML element with the **inplayer-paywall-logout class** will only be shown when the user is authenticated.


### Standalone Paywall Functions

Our latest paywall version also introduces several standalone paywall functions. Apart from relying on the HTML classes, discussed above for invoking the login/logout button functionality, the 'Change Password' screen, the 'Credit Card Details' screen, or accessing 'My Account' section, you can now do the same by calling a function. Other standalone functions introduced by Paywall 3.0 include the setup of a language, invocation of the register button functionality, and invocation of the paywall application. 

Take a look at the following example to see how they can be used:

```
<div id="inplayer-40112" class="inplayer-paywall" />

<script>
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e8',
    [{
        id: 40112
    }, ],
);
paywall.setLanguage('en');
paywall.setLoginScreen();
paywall.setRegisterScreen();
paywall.logoutUser();
paywall.showMyAccount();
paywall.showCreditCardDetails();
paywall.showChangePassword();
paywall.showPaywall({
    options: {
        asset: {
            ...asset
        }, // optional
    } // optional
}); // displays the paywall (same as when you would click on the buy button)
</script>
```

Here are listed and defined the Paywall 3.0 standalone functions:

| **Function** | **Description** |
| --- | --- |
| `paywall.setLanguage('en')` | Sets the active paywall language (English is the default one). |
| `paywall.setLoginScreen()` | Displays the paywall login screen. |
| `paywall.setRegisterScreen()` | Displays the 'Register' screen. |
| `paywall.logoutUser()` | Invokes the logout action. |
| `paywall.showMyAccount()` | Displays the 'My Account' screen (to a previously authenticated user). |
| `paywall.showCreditCardDetails()` | Displays the 'Credit Card Details' screen (to a previously authenticated user). |
| `paywall.showChangePassword()` | Invokes the 'Change Password' screen. |
| `paywall.showPaywall` | Invokes the paywall application. |

Table 4


## Custom Asset Preview

There's a default asset preview template that you can tweak via our dashboard but if that doesn't meet your custom needs, you can always use the `noPreview` flag (by setting it to `true`) to disable displaying of the default preview altogether and put your own preview HTML code in the asset div.

```
<div id="inplayer-assetID"></div>

<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
    [{
        id: 123, //assetID
        options: {
            noPreview: true
        }
    }]
)
</script>
```

The embed code above will create a paywall instance but since `noPreview` is set as `true`, the preview will not be shown. The next step is optional and involves adding your own custom preview HTML code inside the DIV element of your asset, and a call-to-action button outside the DIV element. Whatever preview code you decide to add, it will be replaced with the actual asset content once the user gets access.

```
<div id="inplayer-assetID"></div>

// Create your HTML custom preview here

<button id="my-paywall-button">purchase</button>

<script type="text/javascript">
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7', //merchant UUID
    [{
        id: 123, //asset ID
        options: {
            noPreview: true
        }
    }]
)
</script>
```

Now, you have a custom preview and a custom call-to-action button that should invoke the paywall screen. To make the button functional, you need the following code:

```
document.getElementById('my-paywall-button').addEventListener("click", () => {
    paywall.showPaywall({
        asset: {
            assetId: 42564
        }
    })
});
```

The `showPaywall` method is linked to the button which triggers the paywall functionality. That is the final step for functional custom preview.

## Embedding Specific Prices

Our merchants are free to use our paywall for embedding different prices on their page for their content. In the process you get to create your own page (HTML) elements and as a result, alter the default display preview. A custom preview would display a different price for the same content depending on the pricing type (pay-per-view or subscription). In other words, you can have a custom preview displaying one price for a 24-hour-access, for example 10$ and another one with a different price for a recurring period, for example 5$ weekly for a month. To embed your prices, first, you should initialize the paywall via creating an empty paywall instance, as illustrated in the example below:

```
var paywall = new InplayerPaywall('c6f4002f-7415-4eb6-ab03-72b0f7aff0e7')
```

Once the empty paywall instance is created, you can use additional methods for invoking functionalities such as adding custom HTML blocks. The blocks should contain and describe the pricing options along with the corresponding call-to-action button.

Here's how to add the custom HTML code for your first price:

```
// First price description HTML code
<button id="first-price-button">purchase</button>
// Next, add the paywall functionality trigger to the button for the corresponding price:
document.getElementById('first-price-button').addEventListener("click", () => {
    paywall.showPaywall({
        asset: {
            assetId: 42564,
            preselectedFeeId: 4508
        }
    })
});
```
This way, the `showPaywall` functionality is connected to your action button for your first price. It will invoke the paywall flow with the preselected price as the `preselectedFeeId` parameter and the `asseetID` parameter. The pricing screen will be skipped as there is a specific price option already selected on that action.

As for the second price, the same `showPaywall` function needs to be added to your second button containing a different `preselectedFeeId` parameter that identifies your second price option.

Lastly, via the `payment` event you will be notified of each successful payment and therefore, you can redirect the customer to the page where they can consume the content of interest. To learn more about the `payment` event, check the 'Paywall Events' section of this guide.
