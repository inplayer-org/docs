module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Libraries',
      items: [
        'libraries',
        {
          type: 'category',
          label: 'Paywall',
          items: ['paywall3', 'paywall2', 'paywall1']
        },
        'jssdk',
        'iossdk',
        'androidsdk'
      ],
    },
    'webhooks',
    'notifications',
    {
      type: 'link',
      label: 'API Reference',
      href: 'https://docs.inplayer.com/api/',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/paywall-events-tracking',
        {
          type: 'category',
          label: 'In-App Purchases',
          items: [
            'guides/in-app-purchases/in-app-services',
            'guides/in-app-purchases/in-app-authentication',
            'guides/in-app-purchases/ios-in-app-purchases',
            'guides/in-app-purchases/amazon-in-app-purchases',
            'guides/in-app-purchases/android-in-app-purchases',
            'guides/in-app-purchases/roku-in-app-purchases',
          ]
        },
        'guides/syndication',
        'guides/sca',
        'guides/page-protection',
        'guides/enable-web-payments-with-stripe',
        {
          type: 'category',
          label: 'Standalone Services',
          items: [
            'guides/standalone-services/overview',
            'guides/standalone-services/custom-authentication',
            'guides/standalone-services/custom-payment',
          ]
        },
      ],
    },
  ],
};
