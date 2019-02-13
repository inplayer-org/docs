---
id: webhooks
title: InPlayer Webhooks
---

## Webhooks Overview

Our Platform enables you to get automatically notified on certain events happening within the InPlayer Platform by using **webhooks**. In other words, you can build or setup applications which are subscribed to certain events in our Platform. When these events are triggered, we send **HTTP POST requests** with specific **payloads** to the webhook’s configured URL. 

The webhooks are usually used for updating or creating a platform action/operation tracker, for triggering marketing campaigns, for syncing data between platforms or for fetching results of operations in backend applications.

You can install webhooks on your merchant account by setting up a webhook URL and by selecting the specific events you would like to be notified of. You can find the webhooks’ setup details and other options in the **API Settings** section, once you navigate to the InPlayer’s Dashboard, open the top right-hand corner menu and choose 'API'. 


## Payloads

Each event type has a specific payload format. The InPlayer webhooks’ payload has two main parts: **payload headers** and **payload data**. 

### Payload headers

The HTTP POST requests sent to your webhook URL have several **headers**, including the **custom InPlayer signature header**. You will use this signature to validate the event concerned, as described in the validating events section.

| Header        | Value           |
| ------------- |-------------|
| X-InPlayer-Signature	| The signature is created by hashing your secret key together with the request payload, using the sha256 algorithm |
|Content-Type |application/x-www-form-urlencoded |

Another header we send in the POST requests is `Content-Type: application/x-www-form-urlencoded` , which indicates the media type of the resource that we send to your server. The keys and values are encoded in **key-value tuples** separated by '**&'**, with an **'='** between the key and the value. The non-alphanumeric characters in both keys and values are **percent encoded**. Here is an example request:

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

The Payload data holds all the relevant information regarding the event concerned, in the following structure:

| Data        | Description           |
| ------------- |-------------|
| id	| Unique alpha-numeric string that is generated for each sent event |
| created | Unix timestamp of the event |
| type | The type of event |
| resource | Array of all the information connected to the resource/operation that you receive for each event |


## Events

When configuring webhooks, you can choose one or several events that you would like to receive payloads for. The following section offers more details about each webhook event in our Platform. 

### Account Webhooks

**Account webhooks** are events that are fired whenever operations concerning our **'Accounts Service'** occur. Usually, they are used to inform the merchant of the most important actions their customers had performed using their accounts. 

Bellow you can find all the Account webhooks.


| Webhook Type        | Description           |
| ------------- |-------------|
| ``customer.registered``| Fired whenever a new customer is registered |

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
| ``asset.access.granted``| Fired when the customer is granted access to an asset  |

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

Once you start receiving webhooks, make sure the requests you have received come only from InPlayer. Some of the popular methods to confirm this include restriction per domain or the IP address from where you receive the requests, but at InPlayer, we insist that you use the **InPlayer signature** to validate the event.

In order to use the signature for validation, first you will need to have an **API secret** generated. To do so, navigate to the InPlayer’s Dashboard and choose the 'API Settings' section.

Once the secret is generated, you can use it in your backend application to validate the event concerned.


## Validating Events

After you have your secret code set up, InPlayer will use it for generating a **hash signature** for each event that is to be sent as a header along with every request as 'X-InPlayer-Signature'.

Once you receive an event and find the signature header, you should create a **HASH** using the same secret token and then compare your hash to the **InPlayer signature header value**. If both have the same values, you can take that as a validation prove that the event has been sent from InPlayer.

Here it is a PHP example of validating an event while using the signature comparison method:

```php
$entityBody = file_get_contents(‘php://input’);

function verifySignature($body, $token) {
    $sig = "sha256=" . hash_hmac("sha256", $body, $token);
    return hash_equals($_SERVER["HTTP_X_INPLAYER_SIGNATURE"], $sig);
}

var_dump(verifySignature($entityBody, "secret"));
```

You can implement the validation in any backend programming language. However, all implementations should have the following two things in common:

1. Regardless which implementation you use, the hash signature starts with `sha256=`, using the key of your secret token and your payload body.

2. Using a plain '==' operator is not advised. Rather, you can use a method like `hash_equals` which performs a 'constant time' string comparison, that renders the comparisson safe from certain timing attacks against regular equality operators.



