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
            <td><strong>New or existing app</strong></td>
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
                    <li><strong>Client ID</strong>: Authentication realm where user account is created
                <br /><br />
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

## Configure WebSocket notifications

WebSocket notifications enable communication between your app and JWP. Whether you implement web payments with the JavaScript SDK or REST API, you must set up JavaScript to set up and configure WebSockets notifications.

You can provide updates to your users by displaying a WebSocket notification.

Follow these steps to listen for a subscription notification and display a message to your users:

1. Add the following code to your app.
    ```
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

You can now set up web payments through the JavaScript API or REST API.

## Set up web payments

JWP enables you to set up web payments using either a JavaScript SDK or REST API:

- **JavaScript SDK**: Use for a direct integration between the app and JWP.
- **REST API**: Use this for integrations where the app communicates with JWP using middleware.

:::info
This web payment solution only supports single packages.
:::

### JavaScript SDK

#### New User