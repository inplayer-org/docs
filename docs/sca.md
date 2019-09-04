---
id: sca
title: Strong Customer Authentication 
---

Strong Customer Authentication (SCA) is a new payment regulative introduced by the new EU Payment Services Directive (PSD2) as to ensure additional security authentications for electronic payments, concerning only your customers within the European Economic Area. The central idea of strong customer authentication revolves around reducing any form of fraud and validating that the customer is who they claim to be.

The novelty brought about by the SCA is that the European customers purchasing your asset, in specific cases, would need to further authenticate during the payment process by a multi-factor customer authentication. They might be required to authenticate their initiated payments using something they know (their password, PIN), something they own (their card, smartphone) or something which is part of who they are (their fingerprint). 
The authentication process happens outside of our paywall, in a third party application from the customer's bank where the customer should be redirected. 

In our system, this new regulative presents an additional step to the payment and subscription creation flow, as well as, potentially to any subsequent subscription charges.  
As the customer payment journey would appear slightly different from the usual, proceed reading to find discussed in detail the customer UI flow, both for one-time and recurring payments, with the SCA applied.

## One-time Payments UI Flow

During the payment process for one-time payments, the UI flow for the customer progresses through the following steps:

1. Payment initiated
The customer initiates payment by entering their CC details and clicking the 'Pay' button afterwards. This is done by firing the `create_payment` endpoint (which includes the `return_url` parameter) or calling for the `createPayment` SDK method (which also includes the `return_url`), respectfully. 

API Example for `create_payment`

```javascript
curl -X POST  https://services.inplayer.com/payments \
    -H 'Authorization:Bearer <token>' \
    -d access_fee=3 \
    -d payment_method=1
    -d number=4556667461842391 \
    -d cvv=123 \
    -d exp_month=11 \
    -d exp_year=18 \
    -d card_name='John Doe' \
    -d return_url='http://example.com' \
    -d voucher_code=F00B4R!@
```

JS SDK Example for `createPayment`

```javascript
InPlayer.Payment
.create({
  number: 4111111111111111,
  cardName: 'PayPal',
  expMonth: 10,
  expYear: 2030,
  cvv: 656,
  accessFee: 2341,
  paymentMethod: 1,
  returnUrl: 'http://example.com',
  referrer: 'http://google.com',
  voucherCode: 'fgh1982gff-0f2grfds'
  brandingId: 1234
 })
.then(data => console.log(data));
```

2. Authentication required checkup 
At this point, the customer's bank determines whether the payment for the asset in play requires an additional authentication step (SCA). If so, the authentication is performed so that your customer is redirected to their banks' 3D secure page. 
When SCA is needed, the customer follows through step 3, otherwise proceeds directly to step 4.

3. SCA process 
Upon a SCA request, we send the `payment.card.requires.action` notification to the paywall application via the socket you have established previously. The socket notification contains a `redirect_to_url` for redirecting the targeted customer to a third party page where the additional payment authentication can be completed. In addition, we also send an informative email to the customer including SCA related information (explanation as to why the email has been sent), asset information (the title and price of the asset being purchased), customer information (the name of the customer) and redirection for authentication (the URL where the customer can complete the payment authentication).
Once the SCA is completed successfully, the customer is automatically redirected back to the payment page. If the SCA process has failed by chance, we would inform the customer on the paywall screen. Afterwards, the customer should initiate the payment again by providing their CC information.

Subscribe to listen to the `payment.card.requires.action` notification:

```InPlayer.subscribe("adsasd-d1-cjc1c-1ajaveo", {
  onMessage: message => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "payment.card.requires.action") {
      const {
        resource: { redirect_to_url }
      } = parsedMessage;

      window.location.href = redirect_to_url;
    }
  }
});
```

4. Payment completion 
If there is no need for additional authentication, the payment flow follows its usual course without any additional steps and with all the records stored in our system. In contrast, if the customer has completed the SCA process successfully, the paywall application again initiates and then confirms the payment intent. 
In other words, the customer would be redirected to the payment page via the `return_url` which holds (for query parameter) the value of the `payment_intent` that is the id of the payment, initially created at step 1. This is the value you need to take and confirm whenever a customer sends an additional payment request to complete the payment process. 
So, you take the `payment_intent` and fire either the `create_payment` endpoint or the `confirmPayment` SDK method, respectively. The `create_payment` endpoint is the same API call used at step 1 for payment initiation, only this time providing the `pi_id` as parameter. The `confirmPayment` method is a new SDK method that also includes the payment intent as parameter. 
Finally, the funds should be instantaneously debited and our system will proceed with the regular process of storing transaction records and granting the customer access to the premium content being purchased.

After the successful authentication, the customer is redirected back to the `return_url` with the `payment_intent` query parameter with which we can confirm the payment like in the example below:

```const parseURLparams = (urlString, wantedParams = []) => {
  const res = {
    href: urlString,
    query: {}
  };

  const {
    url,
    url: { searchParams }
  } = { url: new URL(urlString) };

  wantedParams.forEach(paramName => {
    if (searchParams.has(paramName)) {
      const val = searchParams.get(paramName);
      searchParams.delete(paramName);
      res.query[paramName] = val;
    }
  });

  res.href = url.href;

  return res;
};

// get payment intent id from route params
const {
  query: { ippwat: accessType, payment_intent: paymentIntentId }
} = parseURLparams(window.location.href, ["ippwat", "payment_intent"]);

// confirmPayment should only be called if the accees fee type is 'ppv'
if (accessType === "ppv" && paymentIntentId) {
  InPlayer.Payment.confirmPayment(paymentIntentId);
}
```

## Subscription Creation Flow

The SCA can also be initiated during the subscription creation process, when the customer initially pays for the subscription of interest. Having that in consideration, the customer payment flow for subscription creation progresses through the following steps:


1. Subscription creation
The customer enters their CC details and creates a subscription by clicking the 'Subscribe' button. This is done by firing the `create_subscription` endpoint or the `create` SDK method which need to include an optional parameter called `return_url` where the payment page should be provided as value.

2. Authentication required checkup
At this point the subscription is already created and again the customer's bank determines whether an additional authentication step is needed to complete the subscription payment. In that case, much like with the one-time payment flow, we send the customer an email informing them of the necessity to authenticate a payment.
We will also store the subscription records in our system. 

3. SCA process
Upon SCA request, the subscription status in our system is set to `incomplete`. This status expires after 24h, meaning if the customer fails to meanwhile authenticate and complete the subscription payment, the subscription would be set to `incomplete_expired` in our system, after which the subscription can no longer be activated. 
Once the subscription status is set to `incomplete` we send the customer the `subscribe.requires.action` notification containing the `redirect_to_url` parameter and they are redirected to their banks' 3D secure page to complete the authentication process. 

Subscribe to listen to the `subscribe.requires.action` notification:

```InPlayer.subscribe("adsasd-d1-cjc1c-1ajaveo", {
  onMessage: message => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "subscribe.requires.action") {
      const {
        resource: { redirect_to_url }
      } = parsedMessage;

      window.location.href = redirect_to_url;
    }
  }
});
```

4. Subscription confirmation 
Once the SCA process is completed successfully, the subscription status changes to `active` and the customer is automatically redirected back to the payment page where they would be granted access to the premium content. 

Customer Off-session SCA Flow

Both one-time payment and subscription creation flows are cases when the customer is active on a website/application or put differently on-session and initiates payment. However, in the case of subscriptions, there might be cases when the customer is off-session, meaning not on the website/application and a payment is still being initiated. 
Currently, there are two such cases: 
- free-trial ended - the trial period has ended and the user is to be charged for the first recurring subscription transaction.
- subscription recurring transaction - a recurring transaction for the subscription in play is initiated.

The SCA applies also for both off-session cases so the customer might be required to authenticate the payment again, as to ensure the funds have been successfully transferred.

## The off-session SCA flow progresses through the following steps:

1. SCA process initiated
When Stripe determines that SCA is needed for the aforementioned cases they send us a hook with that information to our system. 
/ When SCA is needed for the aforementioned cases and we receive a hook with that information to our system. 
2. Email to customer 
At this point, we send an email to the customer informing them of the need for further payment authentication. The email will contain the redirect URL that leads the customer to an external application where they can complete the authentication. 
3. Customer completes authentication
Once the customer completes the authentication, they should be redirected to a hosted page where information about payment competition would be provided.



