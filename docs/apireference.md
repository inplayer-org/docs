---
id: apireference
title: Resources
---


**Accounts and Authentications**

An account represents a user in our platform. The user can either be a merchant (online publisher) or a customer (end-user purchasing via the paywall application). By using this resource, you can create merchant accounts, update data for a specific merchant or customer, (de)activate your account and so on. In addition, the account resource focuses on what the merchant controls regarding their customers, such as creating a new customer and/or updating their details and much more.

**Assets and Access**

An asset in our platform represents a premium content that customers (=end users) purchase to consume. As a merchant, you can create and manage assets which can then be embedded online and become available for end users via the paywall application. In this section, you can find all the necessary endpoints for creating an asset and partaking in any operation regarding the Asset resource.
 
**Vouchers and Promotions**

The voucher is a promotional code, containing an array of numbers and letters, which grants your customers the privilege of using a discount, by adding those numbers and letters, when making a payment transaction. Our platform enables you to create, modify, and maintain the voucher easily.

**Branding**

Branding is a paywall customization resource which enables you as a merchant to enhance and personalize the appearance of your paywall. Our platform offers you a handful of easy-to-operate designs for branding your paywall - you can brand it with your logo, with your company’s (or project’s) name, you can set a theme and/or a cover photo in the fashion of your brand, and you can also change colours to fit your brand.

**Payment and Subscriptions**

This section focuses on all the necessary endpoints for implementing payments via our platform. The payments can be conducted using card and PayPal payment methods with one-time payment and subscription offers. Furthermore, you will also find additional endpoints for managing payment related actions such as connecting to Stripe and setting up bank details.
 
**Restrictions and Rules**

Via the Restrictions resource, merchants can specify locations and domains where assets should be available for purchase. For that purpose, this resource features two main restrictions: The Geo Restriction and The Domain Restriction. 
The Geo Restriction refers to specifying the set of countries where the asset(s) should be available (Whitelisting) or where the asset(s) should not be available (Blacklisting).
The Domain Restriction refers to specifying on which URLs or websites a certain asset should be available (Whitelisting).
Once you have stepped in the role of a merchant, you will be able to manage country sets and domains easily, as well as relate them to your assets in the platform.

**Reporting**

The Reporting resource enables you to generate reports regarding your audience, payments, subscriptions, and asset access. You can generate reports for a specified period of time and you can select the specific data you need presented in your report. Once tailored to your needs, the generated reports can be viewed for the following ten days. 

**Analytics**

The Analytics resource gives you an insight of how well your business is doing. You get to track the number of logins, registrations, and subscribers per country, you can measure the success of your asset(s) by tracking the number of purchases, you can keep record of the active, trialling, canceled, ended, incomplete, and expired subscriptions, and you track the total amount of refunds and revenue per currency and payment method (by card, Direct Debit, PayPal, or via in-apps). 

**Features**

With the Features resource you, as a merchant, are allowed to explore extra InPlayer features such as Terms and Conditions - acting as legal agreement between you and your users, which is a global feature (enabled for all merchants), Organization - enabled per merchant (meant for merchants who need the merchant panel to be managed by an organization of multiple user accounts), and ExternalPayPalIntegration - when the payment method is PayPal, a PayPal form can be integrated to carry out the transaction (enabled per merchant). Additionally, you can add new features and/or update existing ones.

For the full technical reference of the InPlayer API visit this [page.](http://docs.inplayer.com/api/)

