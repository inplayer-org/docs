---
id: webhooks
title: InPlayer Webhooks
---

## Webhooks Overview

With Webhooks you can build or setup Applications which are subscribed to certain events in the InPlayer platform. When such events get triggered, we will send a HTTP POST requests with specific payloads to the Webhook’s configured URL.

Web hooks are usually used to update or create platform action/operation tracker, trigger marketing campaigns, sync data between platforms or to fetch results of operations in backend applications.

Webhooks can be installed on a merchant account by setting up Web-hook URL and select specific events that you will like to receive. The Webhooks options and setup details are located in InPlayer dashboard under API Settings in the top right corner menu.

## Payloads

Each event type has a specific payload format with the relevant event information. InPlayer Webhooks payload has 2 main parts different by context: payload headers and payload data.

### Payload headers

HTTP Post requests that are sent to your Webhook URL will have several headers. Among the standard HTTP headers you can find the custom inplayer signature header. You will use signature to validate the event as described in the validating events section.

| Header        | Value           |
| ------------- |-------------|
| X-InPlayer-Signature	| Signature hash created from your secret key and the request payload, using the sha256 algorithm |
|Content-Type |application/x-www-form-urlencoded |

Another header we sent in the POST requests is `Content-Type: application/x-www-form-urlencoded` , which indicates the media type of the resource that we send to your server. The keys and values are encoded in key-value tuples separated by '&', with a '=' between the key and the value. Non-alphanumeric characters in both keys and values are percent encoded. Here is an example request:

```
POST / HTTP/1.1
Host: foo.com
User-Agent: InPlayer/WHS-2.0
Content-Length: 460
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded
X-Inplayer-Signature: sha256=93d44e3e8bddac4e1a4acd5e76108cfe564b62a29cf0224867c92204adae5147

created=15475835&id=2333&resource%5Bfoo%5D=bar&type=payment.success
```

### Payload data

You can find all relevant info about the event inside the Payload data. In the data of all events you can find the following structure:

| Data        | Description           |
| ------------- |-------------|
| id	| Unique alpha-numeric string that is generated for each sent event |
| created | Unix timestamp of the event |
| type | The actual event type |
| resource | Array of all information connected to the resource/operation that you receive for each event |


## Events

When configuring a Webhook, you can chose one or part of the events that you would like to receive payloads for. You can even opt-in to all known InPlayer events. In the following section you can find more details about each webhook event in the InPlayer platform along with example data.

### Accounts

Accounts webhooks are events that are fired when operations about our Accounts service ocurs. Usualy they are used to inform the merchant about the most important actions for his customers. 

These are all of the Accounts webhooks.


| Webhook Type        | Description           |
| ------------- |-------------|
| ``customer.registered``| Fired each time new customer is registered |

Example Payload Data:

```javascript
created=1547543325
id="6c9fb170-e0b8-4559-b442-0c986f6354b8"
resource[active]=false
resource[completed]=true
resource[created_at]=1547543324
resource[email]="customer@inplayer.com"
resource[full_name]="Customer Name"
resource[id]=29237
resource[merchant_id]=68
resource[merchant_uuid]="c6f4002f-7415-4eb6-ab03-72b0f7aff0e8"
resource[referrer]="https://event.inplayer.com/staging?asset=43861"
resource[updated_at]=1547543324
resource[username]="customer@inplayer.com"
resource[uuid]="5948829d-15da-426b-ab91-6cc586953de2"
type="customer.registered"
```

<br>
| Type        | Description           |
| ------------- |-------------|
| ``asset.access.granted``| Fired each time new customer is registered |

Example Payload Data:

```javascript
created=1547556321
id="cdcbec0c-06b7-40ed-aefb-9da08c43ba92"
resource[access_fee_id]=5146
resource[consumer_email]="customer@inplayer.com"
resource[consumer_id]=29238
resource[created_at]=1547556321
resource[date]="2019-01-15T12:45:21Z"
resource[expires_at]=1547642721
resource[extended]=0
resource[is_trial]=false
resource[item_access_id]=47487
resource[item_id]=43861
resource[item_title]="Sample Title"
resource[merchant_id]=68
resource[original_expires_at]=1547642721
resource[parent_resource_id]="C-m8StiUz3XBZnDRPORWwqIkTfF-ST"
resource[payment_method]="Card"
resource[payment_tool]="Visa+1111"
resource[purchased_access_fee_description]="sample price description"
resource[purchased_access_fee_id]=5146
resource[purchased_access_fee_type]="ppv"
resource[purchased_amount]=3
resource[purchased_currency_iso]="EUR"
resource[revoked]=false
resource[starts_at]=1545231639
resource[type]="purchased"
type="asset.access.granted"
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

function verifySignature($body, $token) {
    $sig = "sha256=" . hash_hmac("sha256", $body, $token);
    return hash_equals($_SERVER["HTTP_X_INPLAYER_SIGNATURE"], $sig);
}

var_dump(verifySignature($entityBody, "secret"));
```

You can implement the validation in any backend programming language. However, all implementations should have the following two things in common:

1. No matter which implementation you use, the hash signature starts with sha256=, using the key of your secret token and your payload body.

2. Using a plain == operator is not advised. A method like hash_equals performs a "constant time" string comparison, which renders it safe from certain timing attacks against regular equality operators.



