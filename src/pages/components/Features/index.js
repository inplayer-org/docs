import React from 'react';
import clsx from 'clsx';

// components
import Feature from './Feature';

// configs
import config from './config';

// styles
import styles from '../../styles.module.css';

const Features = () => (
  <section className={styles.features}>
    <div className="container">
      <div className="row">
        <section className={clsx(styles.features, 'text--center', 'col')}>
          <h2>InPlayer Monetization Development Tools to</h2>
        </section>
      </div>
      {config.map((features, i) => (
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
