---
id: webhooks
title: Webhooks
---

## Overview

Whenever an event occurs in the InPlayer platform, that is of interest to you as our merchant, we automatically notify you using **webhooks**. Even more so, you can build or set up applications which are subscribed to certain events on our platform. When these events are triggered, we send **HTTP POST requests** with specific **payloads** to the webhooks' configured URL.

Typically, the webhooks are being used for creating or updating a platform action/operation tracker for triggering marketing campaigns, for syncing data between platforms, or for fetching results of backend applications' operations.

You can install a handful of webhooks on your merchant account by setting up a webhook URL and by selecting the specific events you have interest in being notified of. You can find the webhooks’ setup details and other options in the **Webhooks Settings** section. More precisely, once you navigate to the InPlayer’s dashboard, open the top right-hand corner menu and choose 'Webhooks'.


## Payloads

Each event type has a specific payload format. The InPlayer webhooks’ payload has two main parts: **payload headers** and **payload data**. 

### Payload headers

The HTTP POST requests sent to your webhook URL have several **headers**, including the **custom InPlayer signature header**. You will use this signature to validate the event concerned, as described in the validating events section.

| Header        | Value           |
| ------------- |-------------|
| X-InPlayer-Signature	| The signature is created by hashing your secret key together with the request payload, using the sha256 algorithm |
|Content-Type |application/x-www-form-urlencoded |

Another header we send in the POST requests is `Content-Type: application/x-www-form-urlencoded` which indicates the media type of the resource that we send to your server. The keys and values are encoded in **key-value tuples** separated by '**&'**, with an **'='** between the key and the value. The non-alphanumeric characters in both keys and values are **percent encoded**. Here is an example request:

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

When configuring webhooks, you can choose one or several events that you would like to receive payloads for. The following section offers more details about each webhook and event in our Platform. 

### Account Webhooks

**Account webhooks** are fired to notify you of events that occur whenever an operation concerning our **Accounts Service** is taking place. Usually, they are used to inform the merchant of the most important actions their customers had performed using their accounts. 

Below you can find an illustration of the account webhooks within our platform.

### `customer.registered`

| Webhook Type        | Description           |
| ------------- |-------------|
| ``customer.registered``| Fired to notify you that a new customer is registered |

Example Payload Data:

```javascript
created=1547543325
id="6c9fb170-e0b8-4559-b442-0c986f6354b8"
resource[active]=false
resource[completed]=true
resource[created_at]=1547543324
resource[email]="customer@inplayer.com"
resource[full_name]="Customer Name"
resource[date_of_birth]=1547543324
resource[id]=29237
resource[merchant_id]=68
resource[merchant_uuid]="c6f4002f-7415-4eb6-ab03-72b0f7aff0e8"
resource[referrer]="https://event.inplayer.com/staging?asset=43861"
resource[updated_at]=1547543324
resource[username]="customer@inplayer.com"
resource[uuid]="5948829d-15da-426b-ab91-6cc586953de2"
type="customer.registered"
```


### `customer.updated`

| Webhook Type        | Description           |
| ------------- |-------------|
| ``customer.updated``| Fired to notify you that data regarding an existing customer of yours have been updated |

Example Payload Data:

```javascript
created=1547543325
id="6c9fb170-e0b8-4559-b442-0c986f6354b8"
resource[active]=false
resource[completed]=true
resource[created_at]=1547543324
resource[email]="customer@inplayer.com"
resource[full_name]="Customer Name"
resource[date_of_birth]=1547543324
resource[id]=29237
resource[merchant_id]=68
resource[merchant_uuid]="c6f4002f-7415-4eb6-ab03-72b0f7aff0e8"
resource[referrer]="https://event.inplayer.com/staging?asset=43861"
resource[updated_at]=1547543324
resource[username]="customer@inplayer.com"
resource[uuid]="5948829d-15da-426b-ab91-6cc586953de2"
type="customer.updated"
```

### Access Webhooks

The access webhooks are fired to notify you of events that occur whenever an operation concerning the **Asset Access** is taking place.


### `access.granted`

| Type        | Description           |
| ------------- |-------------|
| ``asset.access.granted``| Fired to notify you that a customer has been granted access to your asset |

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
resource[voucher_code]=FOOrGmv60pT
resource[revoked]=false
resource[starts_at]=1545231639
resource[type]="purchased"
type="asset.access.granted"
```



### `access.revoked`

| Type        | Description           |
| ------------- |-------------|
| ``asset.access.revoked``| Fired to notify you when a customer's access to your asset has been revoked |

Example Payload Data:

```javascript
id="WHE-tyW8QjyCAYeQDOG0"
created=1559913102
type="asset.access.revoked"
version=2.4.2
resource[type]="revoked"
resource[merchant_id]=68
resource[consumer_id]=73
resource[consumer_email]="example@email.com"
resource[item_id]=49306
resource[item_title]="For+Paywall+03"
resource[item_access_id]=85950
resource[voucher_code]=FOOrGmv60pT
resource[created_at]=1559913101
resource[date]="2019-06-07T13:11:41+0000"
resource[starts_at]=1559896473
resource[expires_at]=1559913101
resource[revoked]=1
```

### Payment and Subscription Webhooks

These events are fired whenever operations concerning Payments and Recurring Subscriptions occur.
These events are fired to notify you of events that occur whenever operations concerning **Payments** and **Recurring Subscriptions** are taking place.


### `payment.card.success`

| Type        | Description           |
| ------------- |-------------|
| ``payment.card.success``| Fired to notify you that a customer of yours has made a successful payment |

Example Payload Data:

```javascript
created=1551455676
id="6437c6bb-eb1a-46b8-aaf3-88cca8869a0e"
resource[access_fee_id]=6113
resource[amount]=10.00
resource[code]=200
resource[currency_iso]="EUR"
resource[customer_id]=29894
resource[item_id]=4122
resource[description]="PPV"
resource[previewTitle]="Example title"
resource[email]="filiptestettas@inplayer.com"
resource[formatted_amount]="€10.00"
resource[status]="success"
resource[timestamp]=1551455675
resource[transaction]="C-MP3obSF5w81JsveRg4LiPV3iS-SC"
type="payment.card.success"
```



### `subscribe.success`

| Type        | Description           |
| ------------- |-------------|
| ``subscribe.success``| Fired to notify you that a customer has just subscribed to your asset successfully |

Example Payload Data:

```javascript
id="WHE-jAlBR7bGKGIV2mSr"
created=1559906599
type="subscribe.success"
version=2.4.2
resource[transaction]="S-S8CqAw18ihqbgYsxCjIly3MwQ-ST"
resource[description]="sub"
resource[email]="example@email.com"
resource[customer_id]=27288
resource[item_id]=4122
resource[previewTitle]="Example title"
resource[formatted_amount]="€10.00"
resource[amount]=10.00
resource[currency_iso]="EUR"
resource[status]="success"
resource[timestamp]=1559906598
resource[code]=200
resource[access_fee_id]=3936
resource[previewTitle]="ooyala+muse+mp4"
```


### `external.payment.success`

| Type        | Description           |
| ------------- |-------------|
| ``external.payment.success``| Fired to notify you that a customer has made a successful payment via PayPal or other external payment method |

Example Payload Data:

```javascript
id="WHE-yQfbAuScIV59b1Ze"
created=1559896720
type="external.payment.success"
version=2.4.2
resource[transaction]="C-OnG25z3eKkZWUMmXlvz36oc3S-PP"
resource[description]="test+price"
resource[email]="example@email.com"
resource[customer_id]=73
resource[item_id]=4122
resource[previewTitle]="Example title"
resource[formatted_amount]="$20.00"
resource[amount]=20.00
resource[currency_iso]="USD"
resource[status]="success"
resource[timestamp]=1559896720
resource[code]=200
resource[access_fee_id]=6973
resource[previewTitle]="Asset+Title"
```



### `external.subscribe.success`

| Type        | Description           |
| ------------- |-------------|
| ``external.subscribe.success``| Fired to notify you that a customer has made a successful subscription via PayPal or other external payment method |

Example Payload Data:

```javascript
id="WHE-H3YtX6QP4aTUCXnB"
created=1559897762
type="external.subscribe.success"
version=2.4.2
resource[transaction]="S-aYPBAwMelYIKG7SOgame8etb1-PP"
resource[description]="For+Paywall+03"
resource[email]="test+232@inplayer.com"
resource[customer_id]=33036
resource[item_id]=4122
resource[previewTitle]="Example title"
resource[formatted_amount]="€50.00"
resource[amount]=50.00
resource[currency_iso]="EUR"
resource[status]="success"
resource[timestamp]=1559897761
resource[code]=200
resource[access_fee_id]=6967
resource[previewTitle]="Asset+Title"
```



### `external.subscribe.cancel.success`

| Type        | Description           |
| ------------- |-------------|
| `external.subscribe.cancel.success`| Fired to notify you that the subscription of a customer of yours who has been subscribed to your asset via PayPal or other external payment method is cancelled successfully |

Example Payload Data:

```javascript
id="WHE-FMyb3xJlpdaJTCFq"
created=1559912055
type="external.subscribe.cancel.success"
version=2.4.2
resource[transaction]="S-n55B9gkzl73lmp5IDjza0HNCH-PP"
resource[description]="Subscription"
resource[email]="example@email.com"
resource[customer_id]=32389
resource[item_id]=4122
resource[previewTitle]="Example title"
resource[formatted_amount]="€10.00"
resource[amount]=10.00
resource[currency_iso]="EUR"
resource[status]="success"
resource[timestamp]=1559912055
resource[code]=200
resource[access_fee_id]=6471
resource[previewTitle]="Asset+Title"
```


## Securing Webhooks

Once you start receiving webhooks, make sure the requests you have received are coming only from InPlayer. Some of the popular methods to confirm this include restriction per domain or the IP address from where you receive the requests. At InPlayer, we insist that you use the **InPlayer signature** to validate the event.

In order to use the signature for validation, first you need to have an **API secret** generated. To do so, navigate to the InPlayer’s dashboard and choose the 'API Settings' section.

Once the secret is generated, you can use it in your backend application to validate the event concerned.


## Validating Events

After you have your secret code set up, InPlayer will use it for generating a **hash signature** for each event that is to be sent as a header, along with every request as 'X-InPlayer-Signature'.

Once you receive an event and find the signature header, you should create a **HASH** using the same secret token and then compare your hash to the **InPlayer signature header value**. If both have the same values, you can take that as a validation proof that the event has been sent from InPlayer.

Here it is a PHP example of validating an event while using the signature comparison method:

```
$entityBody = file_get_contents(‘php://input’);

function verifySignature($body, $token) {
    $sig = "sha256=" . hash_hmac("sha256", $body, $token);
    return hash_equals($_SERVER["HTTP_X_INPLAYER_SIGNATURE"], $sig);
}

var_dump(verifySignature($entityBody, "secret"));
```

You can implement the validation in any backend programming language. However, all implementations should have the following two things in common:

1. Regardless which implementation you use, the hash signature starts with `sha256=`, using the key of your secret token and your payload body.

2. Using a plain '==' operator is not advised. Rather, you can use a method like `hash_equals` which performs a 'constant time' string comparison that renders the comparison safe from certain timing attacks against regular equality operators.



