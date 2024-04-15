---
id: enable-third-party-platform-payments
title: Enable third-party platform payments
slug: /enable-third-party-platform-payments
---
JWP enables you to monetize your content through third-party platform payments.

For your videos that require registration and payment, a new user must register or an existing user must log in. Then, the user must provide payment details. 

Your app makes an API call to create an account or authenticate an existing account. Then, a recurring subscription is initiated. Payment is processed. After a successful payment, the app validates the user's access and begins content playback.

:::info
Since this implementation uses both JWP and <a href="https://jwplayer.com/press-releases/jw-player-acquires-inplayer/" target="_blank">InPlayer</a> technologies, API calls will use the following namespaces and domains:
- InPlayer
- inplayer.com
- jwplayer.com
:::

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
            <td><strong>New&nbsp;or&nbsp;existing app</strong></td>
            <td><a href="https://docs.jwplayer.com/platform/docs/apps-get-started" target="_blank">App</a> connected to a JWP property</td>
        </tr>
        <tr>
            <td><strong>Payment & Subscription Entitlement</strong></td>
            <td>Entitlement required to set up payments
                <br /><br />
                <em>Contact your JWP representative for more information.</em>
            </td>
        </tr>
        <tr>
            <td><strong>Payment Plan</strong></td>
            <td>Plan that allows access to specified app content
                <br /><br />
                You can <a href="https://docs.jwplayer.com/platform/docs/create-a-plan" target="_blank">create basic payment plans</a> or <a href="https://docs.jwplayer.com/platform/docs/apps-monetize-apps-with-a-subscription" target="_blank">complex payment plans</a> that include features such as <a href="https://docs.jwplayer.com/platform/docs/create-a-discount-code" target="_blank">discount codes</a>.
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

## Set up web payments

:::info
This web payment solution only supports single packages.
:::

<br />

### New User

Follow these steps to enable in-app payments for a new user:

1. Create a new user account by calling <a href="https://docs.inplayer.com/api/accounts/#tag/V1/operation/createAccount" target="_blank">`POST /accounts`</a>.

    When the request **succeeds**, JWP creates a new user object and returns a unique user authentication token that is valid for **30 days**. When the request **fails**, JWP returns a failure response.
    ```cURL
    curl -L -X POST 'https://services.inplayer.com/accounts' \
         -H 'Content-Type: application/x-www-form-urlencoded' \
         --data-urlencode 'full_name=John Doe' \
         --data-urlencode 'username=john@example.com' \
         --data-urlencode 'password=foobar123' \
         --data-urlencode 'password_confirmation=foobar123' \
         --data-urlencode 'type=consumer' \
         --data-urlencode 'grant_type=password' \
         --data-urlencode 'client_id=12345678-90ab-1c23-4567-89d0e123f45' \
         --data-urlencode 'metadata%5Bphone%5D=bar'
    ```
2. Use the app store's API to create an in-app purchase. This includes displaying the subscription price and setting up a subscription:
   - <a href="https://developer.amazon.com/docs/in-app-purchasing/iap-overview.html" target="_blank">Amazon</a>
   - <a href="https://developers.google.com/android-publisher#subscriptions" target="_blank">Android</a>
   - <a href="https://developer.apple.com/documentation/appstoreconnectapi/app_store/in-app_purchase/in-app_purchases" target="_blank">Apple</a>
   - <a href="https://developer.roku.com/docs/developer-program/roku-pay/implementation/channel-store.md" target="_blank">Roku</a>
3. Validate the user's purchase by calling `POST /external-payments/<platform>/validate`. After making this API call, JWP verifies the payment on the third-party platform, stores transaction and subscription details, and grants the user access to the purchased content.

   :::info
   See the following links for more information about each vendor-specific route:
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateAmazonReceipt" target="_blank">Amazon</a>
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateAndroidReceipt" target="_blank">Android</a>
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateAppleReceipt" target="_blank">Apple</a>
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateRokuReceipt" target="_blank">Roku</a>
   :::
   
   ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/amazon/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<AMZ_RVS_RECEIPT>' \
     --data-urlencode 'product_name=<AMZ_PRODUCT_ID>'
   ```
   ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/apple/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<APP_STORE_JSON_PURCHASE_OBJECT>' \
     --data-urlencode 'product_name=<APPLE_PRODUCT_ID>'
   ```
   ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/google-play/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<GOOGLE_JSON_PURCHASE_OBJECT>' \
     --data-urlencode 'product_name=<GOOGLE_PRODUCT_ID>'
   ```
      ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/roku/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<ROKU_RECEIPT>' \
     --data-urlencode 'product_name=<ROKU_PRODUCT_ID>'
   ```
   
5. Validate the user's access by calling <a href="https://docs.inplayer.com/api/assets/#tag/V1/operation/getAccess" target="_blank">`GET /items/{asset-ID}/access`</a>.

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.
    ```cURL
    curl https://services.inplayer.com/items/{id}/access \
    -H "Authorization:Bearer <TOKEN>"
    ```

<br />

After you have validated the user's access, you can fetch the content by media ID and begin playback.

If you use an app config to manage your content, you can obtain the media ID from the `contentId` parameter of the app config URL.

:::tip
You can add <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#url-signing-for-apps" target="_blank">URL signing</a> or <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#drm" target="_blank">digital rights management (DRM)</a> for extra layers of content protection.
:::

<br /><br />

#### Existing User

Follow these steps to enable in-app payments for an existing user:

1. Log in an existing user account by calling <a href="https://docs.inplayer.com/api/accounts/#tag/V2/operation/v2authenticate" target="_blank">`POST /v2/accounts/authenticate`</a>.

    When the request **succeeds**, JWP creates a new user object and returns a unique user authentication token. When the request **fails**, JWP returns a failure response.
    ```cURL
    curl -L -X POST 'https://services.inplayer.com/v2/accounts/authenticate' \
         -H 'Content-Type: application/x-www-form-urlencoded' \
         --data-urlencode 'username=test@test.com' \
         --data-urlencode 'password=test123' \
         --data-urlencode 'grant_type=password' \
         --data-urlencode 'client_id=123-123-hf1hd1-12dhd1' \

    ```
2. Use the app store's API to create an in-app purchase. This includes displaying the subscription price and setting up a subscription:
   - <a href="https://developer.amazon.com/docs/in-app-purchasing/iap-overview.html" target="_blank">Amazon</a>
   - <a href="https://developers.google.com/android-publisher#subscriptions" target="_blank">Android</a>
   - <a href="https://developer.apple.com/documentation/appstoreconnectapi/app_store/in-app_purchase/in-app_purchases" target="_blank">Apple</a>
   - <a href="https://developer.roku.com/docs/developer-program/roku-pay/implementation/channel-store.md" target="_blank">Roku</a>
3. Validate the user's purchase by calling `POST /external-payments/<platform>/validate`. After making this API call, JWP verifies the payment on the third-party platform, stores transaction and subscription details, and grants the user access to the purchased content.

   :::info
   See the following links for more information about each vendor-specific route:
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateAmazonReceipt" target="_blank">Amazon</a>
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateAndroidReceipt" target="_blank">Android</a>
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateAppleReceipt" target="_blank">Apple</a>
   - <a href="https://docs.inplayer.com/api/payments/#tag/V2/operation/validateRokuReceipt" target="_blank">Roku</a>
   :::
   
   ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/amazon/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<AMZ_RVS_RECEIPT>' \
     --data-urlencode 'product_name=<AMZ_PRODUCT_ID>'
   ```
   ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/apple/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<APP_STORE_JSON_PURCHASE_OBJECT>' \
     --data-urlencode 'product_name=<APPLE_PRODUCT_ID>'
   ```
   ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/google-play/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<GOOGLE_JSON_PURCHASE_OBJECT>' \
     --data-urlencode 'product_name=<GOOGLE_PRODUCT_ID>'
   ```
      ```cuRL
   curl POST https://services.inplayer.com/v2/external-payments/roku/validate \
     -H 'Authorization: <TOKEN>' \
     --data-urlencode 'receipt=<ROKU_RECEIPT>' \
     --data-urlencode 'product_name=<ROKU_PRODUCT_ID>'
   ```
   
5. Validate the user's access by calling <a href="https://docs.inplayer.com/api/assets/#tag/V1/operation/getAccess" target="_blank">`GET /items/{asset-ID}/access`</a>.

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.
    ```cURL
    curl https://services.inplayer.com/items/{id}/access \
    -H "Authorization:Bearer <TOKEN>"
    ```
    
<br/>

After you have validated the user's access, you can fetch the content by media ID and begin playback.

If you use an app config to manage your content, you can obtain the media ID from the `contentId` parameter of the app config URL.

:::tip
You can add <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#url-signing-for-apps" target="_blank">URL signing</a> or <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#drm" target="_blank">digital rights management (DRM)</a> for extra layers of content protection.
:::
