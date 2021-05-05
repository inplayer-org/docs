import React from 'react';
import clsx from 'clsx';

// components
import Feature from './Feature';

// styles
import styles from './styles.module.css';

const featuresConfig = [
  [
    {
      imageUrl: 'img/1.png',
      description:
        'Design, create and deliver flawless monetization experiences.',
    },
    {
      imageUrl: 'img/2.png',
      description: 'Accelerate product time-to-market.',
    },
    {
      imageUrl: 'img/3.png',
      description: 'Monetize content across all distribution points.',
    },
    {
      imageUrl: 'img/4.png',
      description: 'Be successful. Create operation efficiencies.',
    },
  ],
  [
    {
      title: 'COMPLETE MONETIZATION PLATFORM',
      description:
        'Our experience and monetization platform is industry leading. Build any powerful monetization solution our advanced development tools.',
      centered: false,
      as: 'h2',
    },
    {
      imageUrl: 'img/complete-monetization-platform.png',
      centered: false,
    },
  ],
  [
    {
      imageUrl: 'img/building-made-easy.png',
      centered: false,
    },
    {
      title: 'BUILDING MADE EASY',
      description:
        'Get started quickly with powerful SDKs, comprehensive docs and handy tools that will jumpstart your paywall project.',
      centered: false,
      as: 'h2',
    },
  ],
  [
    {
      title: 'Android SDK',
      imageUrl: 'img/android-sdk.png',
      description:
        'Using our native Android SDK you have a simple interface to our core functionalities allowing you to build Android apps with authentication, in-app payments and access entitlement flows.',
      path: 'docs/androidsdk',
    },
    {
      title: 'iOS SDK',
      imageUrl: 'img/ios-sdk.png',
      description:
        'Build iOS apps that have authentication, in-app payments and access entitlement flows. Our iOS SDK can be used for easy integration with the InPlayer system.',
      path: 'docs/iossdk',
    },
    {
      title: 'JavaScript SDK',
      imageUrl: 'img/js-sdk.png',
      description:
        'Our JavaScript SDK is equipped with all methods our paywall app is using, allowing you to customize the end-user journey as you wish.',
      path: 'docs/jssdk',
    },
  ],
  [
    {
      title: 'Paywall App',
      imageUrl: 'img/paywall-app.png',
      description:
        'Our plug-and-play embeddable application that provides a sleek user experience of authentication, payment and access entitlement.',
      path: 'docs/paywall3',
    },
    {
      title: 'REST API',
      imageUrl: 'img/rest-api.png',
      description: 'Complete reference documentation to the InPlayer REST API',
      path: 'https://docs.inplayer.com/api/',
    },
    {
      title: 'Webhooks',
      imageUrl: 'img/webhooks.png',
      description:
        'InPlayer sends webhooks to notify you when an event happens in your merchant account (e.g. a new account registered to watch your content).',
      path: 'docs/webhooks',
    },
  ],
];

const Features = () => (
  <section className={styles.features}>
    <div className="container">
      <div className="row">
        <section className={clsx(styles.features, 'text--center', 'col')}>
          <h2>InPlayer Monetization Development Tools to</h2>
        </section>
      </div>
      {featuresConfig.map((features, i) => (
        <div key={i} className="row">
          <section className={styles.features}>
            {features.map((props, j) => (
              <Feature key={`feature-${i}-${j}`} {...props} />
            ))}
          </section>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
