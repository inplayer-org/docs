---
id: page-protection
title: Page Protection
---

The InPlayer platform ensures a smooth monetization process and guarantees full protection for your Premium Page, once you embody the status of an InPlayer Merchant. 
As a merchant, you intend your valuable content to reach, engage, and retain an audience without any geographical restrictions or ties to traditional content distributors (like cable, broadcast, or satellite television platforms). InPlayer offers you a way to bypass tradition and embrace the trend of developing OTT solutions, like a custom web-based premium content solution, by using our fully-packed UI Libraries. Due to your preference, you can turn to our embeddable paywall application or our JavaScript SDK. With the former, you get a ready ‘plug and play’ application that enables you to embed your premium content into any website. With the latter, you are provided with the flexibility of user-friendly methods that allow you to start developing from scratch. 

## Creating a Merchant Account

In order to protect your monetization page, first, we need you to create your merchant account. For step-by-step instructions, please refer to the following [guide](https://inplayer.com/docs/getting-started/creating-your-account/).
Once you are successfully logged in, you would be registered in the InPlayer system as a merchant.

## Creating Your Asset

Our platform supports almost all forms of online content: video, audio, text, HTML, file etc. out of which you can choose the one that best aligns with your needs. 
To begin with, you need to log into the [InPlayer dashboard](https://dashboard.inplayer.com/dashboard)  and click the 'Assets' icon from the navigation bar on the left. Then, click the '+Add new asset' button. This opens a window displaying the asset types. For the purpose of this guide let's choose the HTML/Text type. 
The following steps include naming your asset, setting the pricing type (choosing between login/register type or code/password as a means to gaining access), as well as setting the rest of the asset properties. 

You get to customize the look of your asset preview by adding an image, title, description, and personalized 'Buy' button; then choose between a pay-per-view or subscription as a payment option; set any geographic, domain and/or age restrictions you have considered; add your HTML code of the content in the 'Asset content' section and embed the asset on your website, simply by clicking the 'Get Asset Embed Code' button at the top right.
For a more picturesque guide on asset creation, please refer [here](https://inplayer.com/docs/assets/html-asset/).

## Finding Your Asset ID

Once the asset is created, its Asset ID represents both your identity as a merchant in our system and your Premium Page. To find your Asset ID go back to the ‘Assets’ tab and you will find your newly created asset listed along with its Asset ID and other information such as its title, asset type, the date of creation and the date of the last update. 

## Landing and Premium Page

In order to establish maximum protection to your website, we introduce a use case where two pages are at play. The first one is where the end-users come to authenticate and pay for the content of interest. This is your Landing Page. Then, after a successful authentication and purchase have taken place, your users get redirected to another, second page where they can consume the content. This is your Premium Page.

## Landing Page

Your Landing Page and our paywall thrive in a codependent relationship. More precisely, the core usage of the paywall is providing you, our merchant, with an embed code for your premium content so that you can embed it into your website. For each asset you create, a corresponding embed code is subsequently generated. To find and embed the code of interest, please refer to the following [guide](https://inplayer.com/docs/assets/html-asset/#embedding-the-asset). 


In order to implement the logic of having two pages coexisting, one for validating users' authentication and purchases and another where your content lays sheltered, you need to set your asset embed code options so that:

- `noInject` is true;
- have the `access` paywall event implemented. 

[Here](https://developers.inplayer.com/docs/paywall2.html#paywall-events) you can find our paywall events documented.


### `noInject`

Enabling this asset option prevents the premium content from being displayed on your Landing Page. The idea is that right after a user has signed in, made a successful purchase, and gained access to your asset, they get redirected to your Premium Page. In this scenario, the content is not going to be displayed on your Landing Page since it is part of your Premium Page, where additional protection is in place. 


### `access` event

You need this paywall event to implement the logic of extracting the end-user's token from the local storage of the browser and then converting it to a cookie. This is crucial for the logic on the Premium Page, which is discussed more at length below.
Additionally, if you would also like to have end-users automatically redirected to your Premium Page (rather than having them, say, pressing a button that would redirect them there), the `access` event should also implement the logic to enable this redirecting. Of course, you can execute both the token extraction and redirection only if the current end-user has a verified access to your content.


Example:

```
paywall.on('access', function(e, data) {
  if(data.hasAccess) {
    // token extraction to cookie
    // optional redirect to premium page
  }
});
```

## Premium Page 

Now that the customer is at your Premium Page, an access check needs to be executed before the customer can lay their hands on your content. For that reason, there should be a middleware setup on your part, that will fire every time a customer tries to reach your premium content. Once the Premium Page is accessed, the first thing to check for is a cookie with a token. The middleware searches the local storage of your browser to check whether there is a cookie with the customer's access token as value. If found, the next thing to check is whether the authenticated user has access to the premium content. For that purpose, the middleware then extracts the token and sends our API an access validation request. More precisely, the `Get item access` request is fired with the specified Asset ID (Item ID) and the token as an authorization header. 


Example:
```
 curl https://services.inplayer.com/items/{id}/access \
        -H "Authorization:Bearer <token>"
```

```
PATH PARAMETERS
id (required) -> Item id (integer)

Successful Response: 
{
  "id": 44,
  "account_id": 21,
  "customer_id": 33,
  "customer_uuid": "11a7ed90-65d3-4ee2-9d91-4e1409678576",
  "ip_address": "0.0.0.0",
  "country_code": "UK",
  "created_at": 1531482438,
  "expires_at": 1531482438,
  "item": {
    "content": "Assets's content",
    "id": 33,
    "merchant_id": 21,
    "merchant_uuid": "e5ac2013-8d10-42ba-abb5-291c5201cea8",
    "is_active": true,
    "title": "Foo bar",
    "access_control_type": {
      "id": 4,
      "name": "Paid",
      "auth": true
    },
    "item_type": {
      "id": 44,
      "name": "brightcove_asset",
      "content_type": "ovp",
      "host": "inplayer",
      "description": "OVP asset"
    },
    "age_restriction": {
      "min_age": 18
    },
    "metadata": {
      "property1": "string",
      "property2": "string"
    },
    "created_at": 1531482438,
    "updated_at": 1531482438
  }
}

Possible Errors:

{
  "code": 401,
  "message": "Invalid auth token"
}

{
  "code": 402,
  "message": "No access"
}

{
  "code": 403,
  "message": "Invalid privileges"
}

{
  "code": 404,
  "message": "Item not found"
}

{
  "code": 422,
  "message": "No access"
}


If the API request returns a successful response, we let the customer reach the premium section of your page and access the content behind. In case of any of the above illustrated errors, we redirect the customer back to your Landing Page where they can try to register and/or complete the payment successfully this time.
