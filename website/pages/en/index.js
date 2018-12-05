/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = () => (
  <h2 style={{"color": "#333"}} className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <a href={docUrl('api.html', language)}>
            <div className="feature-block">
            <img src={'img/plat-api.svg'} alt={'api'} title={'api'} /> 
            APIs
            </div>
            </a>
            <a href={docUrl('paywall2.html', language)}>
            <div className="feature-block">
            <img src={'img/plat-paywall.svg'} alt={'api'} title={'api'} /> 
            Paywall
            </div>
            </a>

            <a href={docUrl('jssdk.html', language)}>
            <div className="feature-block">
            <img src={'img/plat-partners.svg'} alt={'api'} title={'api'} /> 
            Webhooks
            </div>
            </a>

            <a href={docUrl('jssdk.html', language)}>
            <div className="feature-block">
            <img src={'img/plat-dashboard.svg'} alt={'api'} title={'api'} /> 
            Dashboard
            </div>
            </a>

            <a href={docUrl('jssdk.html', language)}>
            <div className="feature-block">
            <img src={'img/plat-docs.svg'} alt={'api'} title={'api'} /> 
            JavaScript SDK
            </div>
            </a>

     
            
          </PromoSection>
          </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const FeatureCallout = () => (
  <div
    className="productShowcaseSection paddingBottom feature"
    style={{textAlign: 'center'}}>

    <div className="gridBlock">
    <div className="blockElement alignCenter fourByGridBlock imageAlignTop">
    <div className="blockImage"><img src="/img/ip_ic-launch.svg" /></div>
    <div className="blockContent">
    <h2 style={{"padding":"0px"}}><div><span><p style={{}}>Building made easy</p></span></div></h2>
    <div><span><p>Get started quickly with powerful SDKs, comprehensive docs and handy tools that will jumpstart your paywall project</p></span></div>
    </div>
    </div>
    
    <div className="blockElement alignCenter fourByGridBlock imageAlignTop">
    <div className="blockImage"><img src="/img/ip_ic-architect.svg" /></div>
    <div className="blockContent">
    <h2 style={{"padding":"0px"}}><div><span><p>Complete monetisation platform</p></span></div></h2>
    <div><span><p>No other solution comes close to the level of detail we offer. You can build close to any monetisation solution using our platform.</p></span></div>
    </div>
    </div>
    
    </div>
</div>

);

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div style={{"paddingBottom":"0px"}} className="mainContainer">
          <FeatureCallout />
        </div>
      </div>
    );
  }
}

module.exports = Index;
