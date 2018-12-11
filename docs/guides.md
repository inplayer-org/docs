---
id: guides
title: In-app Purchases
---

In-app purchases are purchases made from within a mobile application. Users typically make an in-app purchase in order to access special content or features in an app. The purchasing process is completed directly from within the app and is seamless to the user in most cases.

In-app purchases can be a valid payment method in the InPlayer Platform as well. However, there are few things that are requirements before you jump into native apps payments. 

## How to create In-app purchases

You can use the InPlayer REST API in combination with i-app Payment methods to deliver in-app purchases. The only way of implmenting payments into native mobile application is to integrate with the native payment systems of the devices providers. 

There are several stepps before you execcute such payments. In the following section we will describe one flow of a native application using in-app purchases.

**Access Check -** The first step that needs to be done is to [verify that the user doesnt have access](https://docs.inplayer.com/api/#operation/getAccess) to the content in the Inplayer system before he is taken to the payment screen.

Valid Item ID and valid authorisation header are needed is sent, the response will be not successful if the user doesnt have active access. 

**Payment process initiated -** The next step is to initiate the Payment Process in the native device payment system (Android or Apple)

On the following link you can find our more about Apple in-app purchases 
https://developer.apple.com/in-app-purchase/

On the following link you can find our more about Android in-app purchases 
https://developer.android.com/google/play/billing/billing_overview

**Forward receipt to InPlayer -**  After succesfull payment into the native mobile system a succesfull payment reciept will be recieved. THe receipt needs to be forwarded to InPlayer end-point to process the payment. 

The end point for validating reciepts is the following

**/v2/external-payments/apple/validate**

**Content display -** Once the InPlayer system completes the process, access will be granted to the enduser and a notiﬁcation will be sent to the application. In order to follow this ﬂow, the application should have a websocket established with the InPlayer system through which the notiﬁcation will be sent. 

[Follow this guide](https://docs.inplayer.com/api/#operation/getAccess) to find out more about listening to notifications over web-sockets using our JavaScript SDK.



