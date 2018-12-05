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
| ------------- |:-------------:|
| *     | Any time any event is triggered (Wildcard Event). |
| external.payment.success	      | External payment sale operation succeeded |
| external.payment.failed	 | External payment sale operation failed |
| external.subscribe.success    |  External subscription succeeded  |
