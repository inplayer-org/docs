---
id: enable-web-payments-with-stripe
title: Enable web payments with Stripe
slug: /enable-web-payments-with-stripe
---
JWP enables you to monetize your content through web payments.

For your videos that require registration and payment, a new user must register and provide payment details. Your app makes an API call to create an account and recurring subscription. Payment is processed. After a successful payment, the app validates the user's access and begins content playback.

:::info
Since this implementation uses both JWP and <a href="https://jwplayer.com/press-releases/jw-player-acquires-inplayer/" target="_blank">InPlayer</a> technologies, SDK methods and API calls will use the following namespaces and domains:
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
            <td>Web-based app that displays content to users</td>
        </tr>
        <tr>
            <td><strong>Web Payment Entitlement</strong></td>
            <td>Entitlement required to set up web payments
                <br /><br />
                <em>Contact your JWP representative for more information.</em>
            </td>
        </tr>
        <tr>
            <td><strong>Payment Plan</strong></td>
            <td>Plan that allows access to specified app content
                <br /><br />
                You can <a href="https://docs.jwplayer.com/platform/docs/create-a-plan" target="_blank">create basic payment plans</a> or <a href="https://docs.jwplayer.com/platform/docs/apps-monetize-apps-with-a-subscription" target="_blank">complex payment plans</a> that include features such as discount codes.
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
        <tr>
            <td><strong>Stripe Account</strong></td>
            <td>JWP-supported web payment provider
                <br /><br />
                JWP only supports Stripe as a web payment provider. If you use another web payment provider, <strong>you will need to migrate to Stripe</strong>.
            </td>
        </tr>
    </tbody>
</table>

<br />

## Configure WebSocket notifications

WebSocket notifications enable communication between your app and JWP. Whether you implement web payments with the JavaScript SDK or REST API, you must set up JavaScript to set up and configure WebSockets notifications.

You can provide updates to your users by displaying a WebSocket notification.

Follow these steps to listen for a subscription notification and display a message to your users:

1. Add the following code to your app.
    ```javascript
    InPlayer.subscribe(uuid, {

        onMessage: function(message) {

            // Popup style
            let style = document.createElement('style');
            style.innerHTML = `
                .popup {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.25);
                }
            `;

            if (message.type === 'subscribe.failed') {

                // Create and style popup
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.innerHTML = message.text;

                // Append popup & styles
                document.body.appendChild(popup);
                document.body.appendChild(style);

                // Hide after 3 secs
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 3000);

            } else if (message.type === 'subscribe.success') {

                // Create success popup
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.innerHTML = "Subscription created successfully";

                // Append popup & styles
                document.body.appendChild(popup);
                document.body.appendChild(style);

                // Hide after 3 secs
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 3000);
            }
        }
    });
    ```
2. Replace `uuid` with your UUID.
3. Configure the appearance of the popup in the `.popup` CSS settings.
4. Define how long the popup displays by adjusting the `setTimeout` values.

You can now set up web payments through the [JavaScript API](#javascript-sdk) or [REST API](#rest-api).

## Set up web payments

JWP enables you to set up web payments using either a JavaScript SDK or REST API:

- **JavaScript SDK**: Use for a direct integration between the app and JWP.
- **REST API**: Use this for integrations where the app communicates with JWP using middleware.

:::info
This web payment solution only supports single packages.
:::

<br />

### JavaScript SDK

#### New User

Follow these steps to enable web payments with Stripe for a new user:

1. Create a new user account by calling <a href="https://inplayer-js.netlify.app/classes/account___authentication.account#signUp" target="_blank">`InPlayer.Account.signUp()`</a>.

    When the request **succeeds**, JWP creates a new user object and returns a unique user authentication token. When the request **fails**, JWP returns a failure response.
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
2. Retrieve the subscription price by calling <a href="https://inplayer-js.netlify.app/classes/asset___access.asset#getAssetAccessFees" target="_blank">`InPlayer.Asset`</a>. The SDK will return the `currency` and `amount` in the response that can be used to display the subscription price in your app.
    ```javascript
    InPlayer.Asset
    .getAssetAccessFees(555)
    .then(data => console.log(data));
    ```
3. Create a recurring payment card subscription by calling <a href="https://inplayer-js.netlify.app/classes/subscription.subscription-1#createSubscription" target="_blank">`InPlayer.Subscription()`</a>.

    If the request **succeeds**, the following actions occur:
    - JWP sends a subscription record to Stripe.
    - Stripe creates a subscription and sends it to JWP.
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.success`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays the notification to the user.

    If the request **fails**, the following actions occurs:
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.failed`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays a failure or error message to the user.

    ```javascript
    InPlayer.Subscription
    .createSubscription(
        {
            number: 1,
            cardName: 'Payoneer',
            expMonth: 11,
            expYear: 12,
            cvv: 546,
            accessFee: 13.4,
            paymentMethod: 1,
            referrer: 'http://localhost:3000',
            voucherCode: '123123125914i2erjfg',
            brandingId?: 1234,
            returnUrl?: 'https://event.inplayer.com/staging',
        }
    )
    .then(data => console.log(data));
    ```
4. Validate the user's access by calling <a href="https://inplayer-js.netlify.app/classes/asset___access.asset#checkAccessForAsset" target="_blank">`checkAccessForAsset()`</a>.

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.
    ```javascript
    InPlayer.Asset
    .checkAccessForAsset(InPlayer.Account.token(),ASSET_ID)
    .then(data => console.log(data))
    .catch(error => error.response.json().then(data => console.log("Error", data)));
    ```

<br />

After you have validated the user's access, you can fetch the content by media ID and begin playback.

If you use an app config to manage your content, you can obtain the media ID from the `contentId` parameter of the app config URL.

:::tip
You can add <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#url-signing-for-apps" target="_blank">URL signing</a> or <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#drm" target="_blank">digital rights management (DRM)</a> for extra layers of content protection.
:::

<br /><br />

#### Existing User

Follow these steps to enable web payments with Stripe for an existing user:

1. Log in an existing user account by calling <a href="https://inplayer-js.netlify.app/classes/account___authentication.account#signInV2" target="_blank">`InPlayer.Account.signIn()`</a>.

    When the request **succeeds**, JWP returns a promise conntaining a unique user authentication token. When the request **fails**, JWP returns a failure response.
    ```javascript
    InPlayer.Account.signInV2({
        email: 'test@test.com',
        password: 'test123',
        cliendId: '123-123-hf1hd1-12dhd1',
        referrer: 'http://localhost:3000/'
    })
    .then(data => console.log(data));
    ```
2. Retrieve the subscription price by calling <a href="https://inplayer-js.netlify.app/classes/asset___access.asset#getAssetAccessFees" target="_blank">`InPlayer.Asset`</a>. The SDK will return the `currency` and `amount` in the response that can be used to display the subscription price in your app.
    ```javascript
    InPlayer.Asset
    .getAssetAccessFees(555)
    .then(data => console.log(data));
    ```
3. Create a recurring payment card subscription by calling <a href="https://inplayer-js.netlify.app/classes/subscription.subscription-1#createSubscription" target="_blank">`InPlayer.Subscription()`</a>.

    If the request **succeeds**, the following actions occur:
    - JWP sends a subscription record to Stripe.
    - Stripe creates a subscription and sends it to JWP.
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.success`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays the notification to the user.

    If the request **fails**, the following actions occurs:
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.failed`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays a failure or error message to the user.

    ```javascript
    InPlayer.Subscription
    .createSubscription(
        {
            number: 1,
            cardName: 'Payoneer',
            expMonth: 11,
            expYear: 12,
            cvv: 546,
            accessFee: 13.4,
            paymentMethod: 1,
            referrer: 'http://localhost:3000',
            voucherCode: '123123125914i2erjfg',
            brandingId?: 1234,
            returnUrl?: 'https://event.inplayer.com/staging',
        }
    )
    .then(data => console.log(data));
    ```
4. Validate the user's access by calling <a href="https://inplayer-js.netlify.app/classes/asset___access.asset#checkAccessForAsset" target="_blank">`checkAccessForAsset()`</a>.

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.
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

<br />

### REST API

#### New User

Follow these steps to enable web payments with Stripe for a new user:

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
2. Retrieve the subscription price by calling <a href="https://docs.inplayer.com/api/assets/#tag/V2/operation/v2GetAccessFees" target="_blank">`GET /v2/items/{id}/access-fees`</a>. The API will return the `currency` and `amount` in the response that can be used to display the subscription price in your app.
    ```cURL
    curl --location 'https://services.inplayer.com/v2/items/{id}/access-fees' \
         --header 'Authorization: Bearer <token>' \
    ```
3. Create a recurring payment card subscription by calling <a href="https://docs.inplayer.com/api/payments/#tag/V1/operation/createSubscription" target="_blank">`POST /subscriptions`</a>.

    If the request **succeeds**, the following actions occur:
    - JWP sends a subscription record to Stripe.
    - Stripe creates a subscription and sends it to JWP.
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.success`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays the notification to the user.

    If the request **fails**, the following actions occurs:
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.failed`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays a failure or error message to the user.

    ```cURL
    curl --location 'https://services.inplayer.com/subscriptions' \
         --header 'Content-Type: application/x-www-form-urlencoded' \
         --header 'Authorization: Bearer <token>' \
         --data-urlencode 'number=4242424242424242' \
         --data-urlencode 'card_name=John Doe' \
         --data-urlencode 'exp_month=02' \
         --data-urlencode 'exp_year=2043' \
         --data-urlencode 'cvv=444' \
         --data-urlencode 'access_fee=7916' \
         --data-urlencode 'payment_method=1' \
         --data-urlencode 'referrer=https://event.inplayer.com/v3/sandbox?asset=43222'
    ```
4. Validate the user's access by calling <a href="https://docs.inplayer.com/api/assets/#tag/V1/operation/getAccess" target="_blank">`GET /items/{asset-ID}/access`</a>.

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.

    ```cURL
    curl https://services.inplayer.com/items/{id}/access \
         -H "Authorization:Bearer <token>"
    ```

<br />

After you have validated the user's access, you can fetch the content by media ID and begin playback.

If you use an app config to manage your content, you can obtain the media ID from the `contentId` parameter of the app config URL.

:::tip
You can add <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#url-signing-for-apps" target="_blank">URL signing</a> or <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#drm" target="_blank">digital rights management (DRM)</a> for extra layers of content protection.
:::

<br /><br />

#### Existing User

Follow these steps to enable web payments with Stripe for an existing user:

1. Log in an existing user account by calling <a href="https://docs.inplayer.com/api/accounts/#tag/V2/operation/v2authenticate" target="_blank">`POST /v2/accounts/authenticate`</a>.

    When the request **succeeds**, JWP returns a unique user authentication token that is valid for **30 days**. When the request **fails**, JWP returns a failure response.

    ```cURL
    curl -L -X POST 'https://services.inplayer.com/v2/accounts/authenticate' \
         -H 'Content-Type: application/x-www-form-urlencoded' \
         --data-urlencode 'client_secret=foobar123' \
         --data-urlencode 'grant_type=password' \
         --data-urlencode 'client_id=12345678-90ab-1c23-4567-89d0e123f45' \
    ```
2. Retrieve the subscription price by calling <a href="https://docs.inplayer.com/api/assets/#tag/V2/operation/v2GetAccessFees" target="_blank">`GET /v2/items/{id}/access-fees`</a>. The API will return the `currency` and `amount` in the response that can be used to display the subscription price in your app.
    ```cURL
    curl --location 'https://services.inplayer.com/v2/items/{id}/access-fees' \
         --header 'Authorization: Bearer <token>' \
    ```
3. Create a recurring payment card subscription by calling <a href="https://docs.inplayer.com/api/payments/#tag/V1/operation/createSubscription" target="_blank">`POST /subscriptions`</a>.

    If the request **succeeds**, the following actions occur:
    - JWP sends a subscription record to Stripe.
    - Stripe creates a subscription and sends it to JWP.
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.success`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays the notification to the user.

    If the request **fails**, the following actions occurs:
    - JWP sends your app a <a href="https://developers.inplayer.com/docs/notifications/#subscriptions" target="_blank">`subscribe.failed`</a> WebSocket [notification](#configure-websocket-notifications).
    - Your app displays a failure or error message to the user.

    ```cURL
    curl --location 'https://services.inplayer.com/subscriptions' \
         --header 'Content-Type: application/x-www-form-urlencoded' \
         --header 'Authorization: Bearer <token>' \
         --data-urlencode 'number=4242424242424242' \
         --data-urlencode 'card_name=John Doe' \
         --data-urlencode 'exp_month=02' \
         --data-urlencode 'exp_year=2043' \
         --data-urlencode 'cvv=444' \
         --data-urlencode 'access_fee=7916' \
         --data-urlencode 'payment_method=1' \
         --data-urlencode 'referrer=https://event.inplayer.com/v3/sandbox?asset=43222'
    ```
4. Validate the user's access by calling <a href="https://docs.inplayer.com/api/assets/#tag/V1/operation/getAccess" target="_blank">`GET /items/{asset-ID}/access`</a>.

    If access to the asset **is verified**, the method returns the content in the response that you can display in your app. If access to the asset **cannot be verified**, your app should redirect the user to your payment page to re-enter payment details.

    ```cURL
    curl https://services.inplayer.com/items/{id}/access \
         -H "Authorization:Bearer <token>"
    ```

<br />

After you have validated the user's access, you can fetch the content by media ID and begin playback.

If you use an app config to manage your content, you can obtain the media ID from the `contentId` parameter of the app config URL.

:::tip
You can add <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#url-signing-for-apps" target="_blank">URL signing</a> or <a href="https://docs.jwplayer.com/platform/docs/enable-protection-apps#drm" target="_blank">digital rights management (DRM)</a> for extra layers of content protection.
:::
