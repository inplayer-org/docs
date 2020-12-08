import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// styles
import styles from './styles.module.css';

// components
import Features from './components/Features';

function Home() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <div className={styles.hero}>
        <div className={clsx('container', 'text--center', styles.headerContainer)}>
          <h1>WELCOME TO THE INPLAYER DEVELOPER CENTER</h1>
          <p>Build next-generation applications and integrations with ease</p>
        </div>
      </div>
      <main>
        <Features />
      </main>
    </Layout>
  );
}

export default Home;
