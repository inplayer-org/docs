---
id: paywall-events-tracking
title: Paywall Events Tracking
slug: /paywall-events-tracking
---

In this tutorial we will use the [InPlayer Paywall Events](paywall2.md#paywall-events) to setup different types of tracking integrating Facebook Pixel code, Google Analythics and Instragram tracking code.  

These javascript events can ocure on any important action in the system. The purpose of this tutorial is how to catch the data from the events and send it to coresponging tracking and analythics services. 

In the following section we will explain what needs to be done to develop custom tracking with Facebook Pixel.

## Facebook Pixel Code

The Facebook pixel is code that you place on your website. It collects data that helps you track conversions from Facebook ads, optimize ads, build targeted audiences for future ads, and remarket to people who have already taken some kind of action on your website.

Before you start tracking purchases with the paywall you will need the standard PageView pixel code installed on your website. The base pixel code contains your pixel's ID in two places and looks like this:

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'your-pixel-id-goes-here');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none" 
       src="https://www.facebook.com/tr?id=your-pixel-id-goes-here&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->
```
Although its recommended adding the pixel directly to your website's `<head>` tags, the pixel will work in most tag management and tag container solutions.

### Tracking Paywall Purchases

Once having the standard pixel code installed on your website, you can track specific events like purchases. All standard events are tracked by calling the pixel's fbq('track') function, with the event name, and (optionally) a JSON object as its parameters. For example, here's a function call to track when a visitor has completed a purchase event, with currency and value included as a parameter:

```javascript
fbq('track', 'Purchase', {currency: "USD", value: 30.00});
```

In order to connect the facebook purchase pixel code with the InPlayer Paywall you need to combine that code with the Paywall Events. For example: 

```javascript
paywall.on('payment', function(){
  fbq('track', 'Purchase', {value: '29.95', currency: 'USD'});
});
```

The complete html code for basic usage of the Paywall embed code and the Facebook Pixel Code for tracking purchases would be:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- InPlayer Paywall Script -->
    <script type='text/javascript' src='https://assets.inplayer.com/paywall/latest/paywall.min.js'></script>
    <!-- End InPlayer Paywall Script -->
    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'your-pixel-id-goes-here');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" style="display:none" 
            src="https://www.facebook.com/tr?id=your-pixel-id-goes-here&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->
  <head>
  <body>
    <!--InPlayer Paywall Embed Code -->
    <div id="inplayer-'inplayer-asset-id'"></div>
    <script type="text/javascript">
    var paywall = new InplayerPaywall('your-inplayer-merchant-uuid', [{ id: 'inplayer-asset-id'}]);     

    // Facebook Pixel Purchase Tracking Code
    paywall.on('payment', function(){
      fbq('track', 'Purchase', {value: '29.95', currency: 'AUD'});
    });
    </script>
    <!--End InPlayer Paywall Embed Code -->
  </body>
<html>
```

As shown in the example from abobe the Paywall `onPayment` event is used to pass the pixel event code each time a succesfull purchases from the InPlayer Paywall is made. 

Aditionaly you can use the data from the Paywall event to send dynamic details to the Pixel Code:

```javascript
paywall.on('payment', function(e, data) {            
    fbq('track', 'Purchase', {value: data.amount, currency: data.currency});
});
```

### Tracking Registered Accounts

Similar as the Pixel Purchase event there is apropriate code for tracking registered users. The Facebook completeRegistration event can be conntected to the InPlayer Paywall as well. The Pixel Code alone looks like the following:

```javascript
fbq('track', 'CompleteRegistration');
```

The same Pixel Code can be wrapped into the `onRegister` Paywall Event:

```javascript
paywall.on('register', function(){
    fbq('track', 'CompleteRegistration');
});
```
