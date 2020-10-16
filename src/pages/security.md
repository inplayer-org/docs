---
id: security
title: Security at InPlayer
slug: /
---

Security is very important part we consider at InPlayer. If you have any questions after reading this guide, or have any issues, please contact us right away.

## HTTP and HTTPS for secure connections.

InPlayer forces secure connection over HTTPS using TLS(SSL) for all of its public projects:

Dashboard
Website
Paywall
API

Although the SSL of the Paywall application is forced, and all of the API calls to our servers from the application are over HTTPS, we insist that you embed the paywall code on a website with HTTPS and proper SSL set up.

## PCI compliance

Anyone that works with the processing, transmission, or storage of card data must comply with the Payment Card Industry Data Security Standards (PCI DSS). Although InPlayer is compliant with PCI DSS standards, PCI compliance is a shared responsibility and applies to both InPlayer and your business.

If you accept payments you need to take care to do that in the most secure way and keep the PCI standards in place. The easiest way to become PCI compliant is to never have access to card data at all. InPlayer can simplify your PCI compliance if you:

1. Use InPlayer Paywall application or Javascript SDK on your website, so you can use the payment services that securely transmits data directly to InPlayer servers without reaching your servers first.
2. Serve your payment pages securely using Transport Layer Security (TLS), so you can use HTTPS
3. Review and validate your PCI compliance on annual basis.