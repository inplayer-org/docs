---
id: webhooks
title: InPlayer Webhooks
---

## Webhooks Overview

With Webhooks you can build or setup Applications which are subscribed to certain events in the InPlayer platform. When such events get triggered, we will send a HTTP POST requests with specific payloads to the Webhook’s configured URL.

Web hooks are usually used to update or create platform action/operation tracker, trigger marketing campaigns, sync data between platforms or to fetch results of operations in backend applications.

Webhooks can be installed on a merchant account by setting up Web-hook URL and select specific events that you will like to receive. The Webhooks options and setup details are located in InPlayer dashboard under API Settings in the top right corner menu.

![alt text](https://inplayer.com/wp-content/uploads/2018/05/api-settings-1024x452.jpg "Logo Title Text 1")

## Events

When configuring a Webhook, you can chose one or part of the events that you would like to receive payloads for. You can even opt-in to all known InPlayer events.

| Name        | Description           |
| ------------- |-------------|
| *     | Any time any event is triggered (Wildcard Event). |
| external.payment.success	      | External payment sale operation succeeded |
| external.payment.failed	 | External payment sale operation failed |
| external.subscribe.success    |  External subscription succeeded  |
| external.subscribe.failed	|External subscription failed |
| external.subscribe.update.success	| External subscription update succeeded |
| external.subscribe.update.failed	 |  External subscription update failed | 
| external.subscribe.cancel.success	 | External subscription cancellation succeeded |
| external.subscribe.cancel.failed	 | External subscription cancellation failed |
| external.payment.refund.success | External payment refund operation succeeded | 
| external.payment.refund.failed | External payment refund operation failed |
| subscribe.success	| Billing subscription created | 
| subscribe.cancelled.success | Billing subscription cancelled |
| subscribe.failed	| Billing subscription failed |
| subscribe.cancelled.failed | Billing subscription cancellation failed |
| subscribe.expired	| Billing subscription expired |
| subscribe.updated	| Billing subscription updated |
| freemium.grant.success | Free asset access was given |
| freemium.grant.failed	 | Free asset access failed |
| payment.card.success	 | Payment sale with card succeeded |
| payment.card.failed | Payment sale with card failed |
| payment.refund.success | Payment asset refunded | 
| payment.refund.failed	| Payment asset refund failed |


## Payloads

Each event type has a specific payload format with the relevant event information. InPlayer Webhooks payload has 2 main parts different by context: payload headers and payload data.

### Payload headers

HTTP Post requests that are sent to your Webhook URL will have several headers. Among the standard HTTP headers you can find the custom inplayer signature header. You will use signature to validate the event as described in the validating events section.

| Header        | Description           |
| ------------- |-------------|
| X-InPlayer-Signature	| Inplayer signature hash. Using the signature you can validate the event request |

### Payload data

You can find all relevant info about the event inside the Payload data. In the data of all events you can find the following structure:

| Data        | Description           |
| ------------- |-------------|
| id	| Unique alpha-numeric string that is generated for each sent event. |
| created | Unix timestamp of the event |
| type | The actual event type |
| version | The Webhooks service version |
| resource | Array of all information connected to the resource/operation that you receive for each event. |

```json
{
    "id": "WHE-Vfl9Pcrm6PEA7fjq",
    "created": 1478972478,
    "type": "subscribe.success",
    "version": "1.8.0",
    "resource": {
    "subscription": "SUB-kZAxmHoUHcHlz3DdYJDYyXI3",
    "description": "Subscription for asset (1 month subscription)",
    "email": "customer@example.com",
    "code": "200",
    "status": "success",
    "timestamp": "1478972478"
}
```

## Securing Webhooks

Once you start receiving Webhooks you will need to be sure that the requests you receive are sent only from InPlayer. Some popular methods include restriction per domain or IP address from where you receive the requests, but at InPlayer we insist that you use the InPlayer signature to validate the event.

In order to use the signature for validation, first you will need to have generated API secret. You can do this at the InPlayer dashboard in the API settings section.

Once you have generated secret, you can use it in your backend application to validate the complete event.

## Validating Events

Once your secret code is set up, InPlayer use it to generate a hash signature with each event. The hash signature is sent as a header with each request as X-InPlayer-Signature.

When you recieve an event and you find the signature header, you should create a HASH using the same secret token and then compare your hash to InPlayer signature header value. If both have the same values you can take that as a validation prove that the event is sent from InPlayer.

Here is a PHP example of validating an event using signature comparison method.

```php
$entityBody = file_get_contents(‘php://input’);
function verifySignature($body, $token)
{
$sig = "sha256=" . hash_hmac("sha256", $body, $token);
return hash_equals($_SERVER["HTTP_X_INPLAYER_SIGNATURE"], $sig);
}
var_dump(verifySignature($entityBody, "secret"));
```

You can implement the validation in any backend programming language. However, all implementations should have the following two things in common:

1. No matter which implementation you use, the hash signature starts with sha256=, using the key of your secret token and your payload body.

2. Using a plain == operator is not advised. A method like hash_equals performs a "constant time" string comparison, which renders it safe from certain timing attacks against regular equality operators.



