import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

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
        <div className={styles.heroInner}>
          <h1 className={styles.heroProjectTagline}>
            <img
              alt="Docusaurus with Keytar"
              className={styles.heroLogo}
              src={useBaseUrl('img/inplayer-logo.png')}
            />
            Develop with{' '}
            <span className={styles.heroProjectKeywords}>ease</span>{' '}
            with InPlayer{' '}
            <span className={styles.heroProjectKeywords}>content monetization</span>{' '}tools
          </h1>
          <div className={styles.indexCtas}>
            <Link
              className={styles.indexCtasGetStartedButton}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <main>
        <Features />
      </main>
    </Layout>
  );
}

export default Home;
