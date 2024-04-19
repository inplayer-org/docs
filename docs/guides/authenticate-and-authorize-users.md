---
id: authenticate-and-authorize-users
title: Authenticate and authorize users
slug: /authenticate-and-authorize-users
---
Your video content is valuable and only authorized users should be permitted to view it. When a user launches your app, your app must identify the user and the content available to the user. JWP enables you to both identify users and manage their access to your content. 

<br />

## Prerequisites

<table>
    <thead>
        <tr>
            <th>Item</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Existing app</strong></td>
            <td><a href="https://docs.jwplayer.com/platform/docs/apps-get-started" target="_blank">App</a> connected to a JWP property
                <br /><br />
                The app can also be enabled for <a href="https://developers.inplayer.com/docs/enable-web-payments-with-stripe/" target="_blank">web</a> and <a href="https://developers.inplayer.com/docs/enable-third-party-platform-payments" target="_blank">third-party</a> payments.
            </td>
        </tr>
        <tr>
            <td><strong>Asset ID</strong> & <strong>Client ID</strong></td>
            <td>IDs that enable access to content when combined:
                <ul>
                    <li><strong>Asset ID</strong>: Subscription asset that must be purchased to watch content on the app</li>
                    <li><strong>Client ID</strong>: Authentication realm where user account is created</li>
                </ul>
                <em>Contact your JWP representative for more information.</em>
            </td>
        </tr>
    </tbody>
</table>

<br />

## Set user authentication and authorization

<br />

Follow these steps to enable authentication and authorization for an existing user:

1. Log in an existing user account by calling [`POST /v2/accounts/authenticate`](https://docs.inplayer.com/api/accounts/#tag/V2/operation/v2authenticate) (REST API) or [`InPlayer.Account.signIn()`](https://inplayer-js.netlify.app/classes/account___authentication.account#signInV2) (JavaScript).

    When the request **succeeds**, JWP returns a unique user authentication token. When the request **fails**, JWP returns a failure response.

    **REST API**
    ```cURL
    curl -L -X POST 'https://services.inplayer.com/v2/accounts/authenticate' \
         -H 'Content-Type: application/x-www-form-urlencoded' \
         --data-urlencode 'username=test@test.com' \
         --data-urlencode 'password=test123' \
         --data-urlencode 'grant_type=password' \
         --data-urlencode 'client_id=123-123-hf1hd1-12dhd1' \
    ```

    **JavaScript**
    ```javascript
    InPlayer.Account.signInV2({
        email: 'test@test.com',
        password: 'test123',
        cliendId: '123-123-hf1hd1-12dhd1',
        referrer: 'http://localhost:3000/'
    })
    .then(data => console.log(data));
    ```
2. Validate the user's access by calling `GET /v2/items/jw-media/token?app_config_id={appConfigId}&media_id={mediaId}` (REST API) or [`checkAccessForAsset()`](https://inplayer-js.netlify.app/classes/asset___access.asset#checkAccessForAsset) (Javascript).

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.

    **REST API**
    ```cURL
    curl https://services.inplayer.com/v2/items/jw-media/token?app_config_id={appConfigId}&media_id={mediaId} \
         -H "Authorization:Bearer <token>"
    ```
    
    **JavaScript**
    ```javascript
    InPlayer.Asset
    .checkAccessForAsset(InPlayer.Account.token(),ASSET_ID)
    .then(data => console.log(data))
    .catch(error => error.response.json().then(data => console.log("Error", data)));

    ```

<br/>

After you have validated the user's access, you can fetch the content by media ID and begin playback.

If you use an app config to manage your content, you can obtain the media ID from the `contentId` parameter of the app config URL.

:::tip
You can add <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#url-signing-for-apps" target="_blank">URL signing</a> or <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#drm" target="_blank">digital rights management (DRM)</a> for extra layers of content protection.
:::
