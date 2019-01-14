---
id: notifications
title: Notifications Overview
---

Every time our backend services need to comunicate with the client applications at InPlayer we use notifications over Web-sockets. 

Websocket is a communication protocol that provides communcation channels over a single TCP connection. Each event that happens in the InPlayer platfrom has its own notification that is sent over websocket.

In most of the cases a "Premium Content" project will be developed using some of the InPlayer libraries. In all of our libraries there is sepparate integration for this communication that can be used to open websocket, listen and catch client notifications. 

You can find the websockets tutorial in each of the sepparate Libraries documentation in the Websockets section. 

In adition you can find all details about the Notification types and the payload data of all events that are sent through websockets. 

## Notification Types

The following notification types can be sent and recieved in the InPlayer platform.

### Payments 

The Payments notifications are fired on single payment events. They can serve to notify the client application of successful or not successful one time payment.

|Event Type| Event Description|
| ------------- |-------------|
|``payment.card.success``| This event is fired each time successful one time payment is made|

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
|``payment.card.failed``| This event is fired when one time payment is not successful|

Example Structure:
```javascript
{ 
    type: "payment.card.failed",
    timestamp: 1546611150,
    resource: {
        access_fee_id: 4805,
        account_id: 29120,
        code: 422,
        message: "Your card was declined. Your request was in test mode, but used a non test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing."
}
```

### Subscriptions

The Subscription notifications are similar to the Payment ones, but they are only fired when recurring subscription payment happens. It servers to notify the application about the outcome of subscription payments.  

|Event Type| Event Description|
| ------------- |-------------|
|``subscribe.success``| This event is fired when successful recurring subscription is made|

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
|``subscribe.failed``| This event is fired when recuring subscription is not successful|

Example Structure:
```javascript
{ 
    type: "subscribe.failed",
    timestamp: 1546612267,
    resource: {
        account_id: 106,
        code: 422,
        explain: {422: "Your card was declined. Your request was in test mode, but used a non test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing."},
        message: "Failed to create a subscription"
    }
}
```

### Access

|Event Type| Event Description|
| ------------- |-------------|
|``access.granted``| This event is fired when it is granted access to a customer for some asset. This happens always after successful payment as well|

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
|``access.revoked``| This event is fired when customer loses access for some Asset. It can be either naturaly expired or manualy revoked|

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
|``account.logout``| This event is fired when the customer is logged out due to some reason. Mostly it is used when max concurent sessions are reached so the first session has to be logged out|

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
|``account.erased``| This event is fired when the customer has erased his account or InPlayer Admin has invoked that operation|

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
|``account.deactivated``| This event is fired when the customer has deactivated his account or InPlayer Admin has invoked that operation|

Example Structure:
```javascript
{ 
    type: "account.deactivated",
    timestamp: 1546612267,
}
```