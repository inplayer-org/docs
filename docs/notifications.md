---
id: notifications
title: Notifications Overview
---

To enable a real-time bidirectional communication between our backend services and the client’s applications at InPlayer, we use **notifications** via **WebSockets**. WebSocket is a communication protocol that provides communication channels over a single TCP connection. For each event that occurs in the InPlayer Platform, there is a corresponding notification sent over the WebSocket. 

Each of our SDK libraries contains integration that enables a real-time communication by opening a WebSocket, listening to, and catching client’s notifications. For more information, refer to the tutorials in each of the separate Libraries documentation in the Real-Time Notifications section. 

## Notification Types

Bellow are listed and exemplified the types of notifications that can be sent and received in the InPlayer Platform.

### Payments 

The Payments' notifications are fired after every payment event, notifying the client's application of each successful or unsuccessful one-time payment.


|Event Type| Event Description|
| ------------- |-------------|
|``payment.card.success``| This event is fired after each successful one-time payment.|

Example Structure:
```javascript 
{ 
    type: "payment.card.success",
    timestamp: 1546609799,
    resource: {
        access_fee_id: 4805,
        amount: "3.00",
        code: 200,
        currency_iso: "EUR",
        customer_id: 29117,
        description: "get access",
        email: "example@inplayer.com",
        formatted_amount: "€3.00",
        status: "success",
        timestamp: 1546609799,
        transaction: "C-eSALJW6w2oSdsh4iAq6qiFpyJ-ST"
    }
}
```
<br >

|Event Type| Event Description| 
| ------------- |-------------| 
|``payment.card.failed``| This event is fired after each unsuccessful one-time payment.| 

Example Structure:
```javascript
{ 
    type: "payment.card.failed",
    timestamp: 1546611150,
    resource: {
        access_fee_id: 4805,
        account_id: 29120,
        code: 422,
        message: "Your card was declined. Your request was in test mode but used a non-test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing."
}
```

|Event Type| Event Description|
| ------------- |-------------|
|``external.payment.success``| This event is fired whenever a payment conducted via an external payment method (= PayPal or in-app) is completed successfully.|


|Event Type| Event Description|
| ------------- |-------------|
|``external.payment.failed``| This event is fired whenever a payment conducted via an external payment method (= PayPal or in-app) has failed to complete successfully.|

Example Structure:
```javascript
{ 
    type: "external.payment.failed",
    timestamp: 1546611150,
    resource: {
        message: "Payment parameters error.",
        explain: "you already have access for this asset",
        code: 422
}
```

### Subscriptions

The Subscription notifications are fired only when recurring subscription payment takes place, notifying the client’s application of the outcome of the subscription payments.

|Event Type| Event Description|
| ------------- |-------------|
|``subscribe.success``| This event is fired after each successful recurring subscription.|

Example Structure:
```javascript 
{ 
    type: "subscribe.success",
    timestamp: 1546612934,
    resource: {
        access_fee_id: 5227,
        amount: "3.00",
        code: 200,
        currency_iso: "EUR",
        customer_id: 106,
        description: "subscription",
        email: "example@inplayer.com",
        formatted_amount: "€3.00",
        status: "success",
        timestamp: 1546612934,
        transaction: "S-Cx4WsDA9vU3huXfznCQifLZLG-ST"
    }
}
```

<br >

|Event Type| Event Description|
| ------------- |-------------|
|``subscribe.failed``| This event is fired after each unsuccessful recurring subscription.|

Example Structure:
```javascript
{ 
    type: "subscribe.failed",
    timestamp: 1546612267,
    resource: {
        account_id: 106,
        code: 422,
        explain: {422: "Your card was declined. Your request was in test mode but used a non-test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing."},
        message: "Failed to create a subscription"
    }
}
```

### Access

|Event Type| Event Description|
| ------------- |-------------|
|``access.granted``| This event is fired after a customer has been granted access to an asset (this event also occurs after successful payment).|

Example Structure:
```javascript 
{ 
    type: "access.granted",
    timestamp: 1546613927,
    resource: {
        account_id: 21,
        country_code: "MK",
        created_at: 1546613927,
        customer_id: 29124,
        customer_uuid: "c720d397-3398-4b6d-9998-b925154b4b30",
        expires_at: 1549292327,
        id: 44757,
        ip_address: "62.168.158.134",
        item: {
            active: true,
            content: "<iframe width='560' height='315' src='https://www.youtube.com/embed/VDa5iGiPgGs' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
            created_at: 1546612165,
            id: 43929,
            item_type: {
                content_type: "html",
                description: "HTML Content",
                host: "inplayer",
                id: 2,
                name: "html_asset"
            },
            merchant_id: 21,
            merchant_uuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
            metadata: {
                paywall_cover_photo: "https://inplayer-paywall-v2.s3.amazonaws.com/images/ip-preview-premium.jpg",
                preview_button_label: "Buy",
                preview_description: "Asset description",
                preview_title: "Example Asset Preview Title",
            },
            title: "Asset Example Title",
            updated_at: 1546612165
        },
    starts_at: -62135596800
    }
}
```

<br >

|Event Type| Event Description|
| ------------- |-------------|
|``access.revoked``| This event is fired after a customer’s entitlement to an asset expires (the asset can either expire naturally, or it can be manually revoked).|

Example Structure:
```javascript
{ 
    type: "access.revoked",
    timestamp: 1546612267,
    resource: {
        item_id: 41224
    }
}
```

### Account

|Event Type| Event Description|
| ------------- |-------------|
|``account.logout``| This event is fired when the customer is logged out for some reason, typically due to reaching maximum concurrent sessions, so that the first session must be logged out.|

Example Structure:
```javascript
{ 
    type: "account.logout",
    timestamp: 1546612267
}
```

<br >

|Event Type| Event Description|
| ------------- |-------------|
|``account.erased``| This event is fired when the customer has erased their account or an InPlayer Admin has invoked that operation.|

Example Structure:
```javascript
{ 
    type: "account.erased",
    timestamp: 1546612267,
}
```

<br >

|Event Type| Event Description|
| ------------- |-------------|
|``account.deactivated``| This event is fired when the customer has deactivated their account or an InPlayer Admin has invoked that operation.|

Example Structure:
```javascript
{ 
    type: "account.deactivated",
    timestamp: 1546612267,
}
```
