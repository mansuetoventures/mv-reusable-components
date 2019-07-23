//meant to be an HTML frame type of component I think. Otherwise not much of a need for it?
//Also, this could be where the <h2> of the Deck is written ONCE, for dryness.
import React, {Component} from 'react';
import css from 'components/article/ArticleFrame/ArticleFrame.scss';
import Frames from '../../Frames/Frames';

import styles from './MultipleArticleHeaderFrames.scss';




//import {SkinnyPano, Lead, Portrait, Full, Pano} from 'components/article/ArticleFrame/ArticleHeaderTypes/ArticleHeaderTypes.js'

import Full from 'mv-reusable-components/build/BootstrapFrames/Full/Full.js';
import SkinnyPano from 'mv-reusable-components/build/BootstrapFrames/SkinnyPano/SkinnyPano.js';
import Portrait from 'mv-reusable-components/build/BootstrapFrames/Portrait/Portrait.js';
import Lead from 'mv-reusable-components/build/BootstrapFrames/Lead/Lead.js';


const Pano = Full;

const HeaderTypes = [Full,Pano,Portrait,SkinnyPano,Lead]
//const browPlacement = new Map(HeaderTypes.map(Type=>[Type,'Brow']));
//const h1Placement = new Map(HeaderTypes.map(Type=>[Type,'Title']));
const browPlacement = new Map([
  [Full,'Row1'],
  [SkinnyPano,'Row1'],
  [Portrait, 'Col1'],
  [Lead,'Row1Top']
]);
const h1Placement = new Map([
  [Full,'Row1'],
  [SkinnyPano,'Row1'],
  [Portrait, 'Col1'],
  [Lead,'Row1Bottom']

]);
//const h2Placement = new Map(HeaderTypes.map(Type=>[Type,'Deck']));
const h2Placement = new Map([
  [Full,'Row3'],
  [SkinnyPano,'Row3'],
  [Portrait, 'Col1'],
  [Lead,'Row4']
])
//const authorPlacement = new Map(HeaderTypes.map(Type=>[Type,'Author']));
const authorPlacement = new Map([
  [Full,'UnderRows'],
  [SkinnyPano,'UnderRows'],
  [Portrait,'UnderContent'],
  [Lead,'UnderRows']

]);


//const featureItemPlacement = new Map(HeaderTypes.map(Type=>[Type,'FeatureItem']));
const featureItemPlacement = new Map([
  [Full,'UnderContainer'],
  [SkinnyPano,'TopDivContent'],
  [Portrait,'Col2'],
  [Lead,'Row1Middle']

])
//const sponsorLogoPlacement = new Map(HeaderTypes.map(Type=>[Type,'SponsorLogo']));

const sponsorLogoPlacement = new Map([
  [Full,'UnderRows'],
  [SkinnyPano,'UnderRows'],
  [Portrait,'UnderContent'],
  [Lead,'UnderRows']

]);

//const productComparisonGridPlacement = new Map(HeaderTypes.map(Type=>[Type,'ProductComparisonGrid']))


const productComparisonGridPlacement = new Map([
  [Full,'Row2'],
  [SkinnyPano,'Row2'],
  [Portrait,'?'],
  [Lead,'Row2']

]);


//const shareButtonPlacement = new Map(HeaderTypes.map(Type=>[Type,'ShareButtons']));


const shareButtonPlacement = new Map([
  [Full,'Row4'],
  [SkinnyPano,'Row4'],
  [Portrait,'InnerRow'],
  [Lead,'Row3']

]);


import ShareButton from 'components/common/ShareButton/ShareButton';

const AbstractShareButtons = props=>{



  return props.types.map((type,i)=>{



    Object.keys(props.override[type]).forEach(key=>{
      if (!props.override[type][key]) delete props.override[type][key];
    })


    const config = {
      ...props.default,
      ...props.override[type]
    }
    return <ShareButton type={type} key={i} {...config}/>
  });
}

const ShareButtons = props=> <AbstractShareButtons types={['LinkedIn','Facebook','Twitter']} {...props}/>;



import Editable from 'components/common/Editable/Editable.js';
Editable.isEditable = true;

import ReactFrame from 'components/common/ReactFrame/ReactFrame.js';

const Section = props => props.children || null;

function ArticleHeader(){
    const currentFrame = ({
        full:Full,
        pano:Pano,
        portrait:Portrait,
        skinnypano:SkinnyPano,
        lead:Lead
      })[this.props.headerType];
  
      const shareButtonsDefault = {
        url:props.shareUrl,
        headline:props.shareHeadline,
        summary:props.shareSummary
      };
  
      const shareButtonsOverride = {
        LinkedIn:{
          url:props.linkedin.url,
          headline:props.linkedin.headline,
          summary:props.linkedin.summary
        },
        Facebook:{
          url:props.facebook.url,
          headline:props.facebook.headline,
          summary:props.facebook.summary
        },
        Twitter:{
          url:props.twitter.url,
          headline:props.twitter.headline,
          summary:props.twitter.summary
        }
      };
      return <header style={styles.articleHeader}>
      {props.topRegion} {/*Random crap that goes at the top*/}
        <Frames
          currentFrame={currentFrame}
          isOpenView={this.state.isOpen || (this.props.autoTease && !teaserSection)}
        >
           <div className={styles.articleShareBar}  map={shareButtonPlacement}>
            <ShareButtons default={shareButtonsDefault} override={shareButtonsOverride}/>
           </div>

          <Section map={browPlacement}>
            {articleHeaderBrow}
          </Section>
          <Section map={h1Placement}>
            {articleHeaderH1}
          </Section>


          <Section map={h2Placement}>
              {articleHeaderH2}
          </Section>


          <Section map={featureItemPlacement}>
            {articleHeaderFeatureItem}
          </Section>

          <Section map={authorPlacement}>
            {articleHeaderAuthors}



          </Section>
          <Section map={productComparisonGridPlacement}>
            {articleHeaderProductGrid}
          </Section>
          <Section map={sponsorLogoPlacement}>
            {articleHeaderSponsorLogo}
          </Section>
        </Frames>


        {props.bottomRegion} {/*Random crap that goes at the bottom*/}





        {!this.state.isOpen && this.props.autoTease == true && (
          <Teaser>

          <div className={`article-body col-sm-12`}>
            <div>
              {teaserSection ? teaserSection.props.children : this.bodyTextTransform(articleBodySection.props.children,true)}
            </div>
          </div>



          </Teaser>
        )}

        {false && AdSection && AdSection}
      </header>;

}


class ArticleHeaderOld extends ReactFrame{
  constructor(props){
    super(props,[
      'ArticleHeaderTop',
      'ArticleHeaderH1',
      'ArticleHeaderH2',
      'ArticleHeaderFeatureItem',
      'ArticleHeaderBrow',
      'ArticleHeaderAuthors',
      'ArticleHeaderProductGrid',
      'ArticleHeaderSponsorLogo'
    ]);
    this.state = {
      headerType:props.headerType
    }
    if (typeof window!=='undefined') window.ah = this;
  }
  render(){

    const props = this.props;

    const {

      articleHeaderTop,
      articleHeaderH1,
      articleHeaderH2,
      articleHeaderFeatureItem,
      articleHeaderBrow,
      articleHeaderAuthors,
      articleHeaderProductGrid,
      articleHeaderSponsorLogo

    } = this.getChildren();

    const currentFrame = ({
      full:Full,
      pano:Pano,
      portrait:Portrait,
      skinnypano:SkinnyPano,
      lead:Lead
    })[this.props.headerType];

    const shareButtonsDefault = {
      url:props.shareUrl,
      headline:props.shareHeadline,
      summary:props.shareSummary
    };

    const shareButtonsOverride = {
      LinkedIn:{
        url:props.linkedin.url,
        headline:props.linkedin.headline,
        summary:props.linkedin.summary
      },
      Facebook:{
        url:props.facebook.url,
        headline:props.facebook.headline,
        summary:props.facebook.summary
      },
      Twitter:{
        url:props.twitter.url,
        headline:props.twitter.headline,
        summary:props.twitter.summary
      }
    };

    return <header style={styles.articleHeader}>
        {articleHeaderTop} {/*Random crap that goes at the top*/}
          <Frames
            currentFrame={currentFrame}
            isOpenView={this.state.isOpen || (this.props.autoTease && !teaserSection)}
          >
             <div className={styles.articleShareBar}  map={shareButtonPlacement}>
              <ShareButtons default={shareButtonsDefault} override={shareButtonsOverride}/>
             </div>

            <Section map={browPlacement}>
              {articleHeaderBrow}
            </Section>
            <Section map={h1Placement}>
              {articleHeaderH1}
            </Section>


            <Section map={h2Placement}>
                {articleHeaderH2}
            </Section>


            <Section map={featureItemPlacement}>
              {articleHeaderFeatureItem}
            </Section>

            <Section map={authorPlacement}>
              {articleHeaderAuthors}



            </Section>
            <Section map={productComparisonGridPlacement}>
              {articleHeaderProductGrid}
            </Section>
            <Section map={sponsorLogoPlacement}>
              {articleHeaderSponsorLogo}
            </Section>
          </Frames>








          {!this.state.isOpen && this.props.autoTease == true && (
            <Teaser>

            <div className={`article-body col-sm-12`}>
              <div>
                {teaserSection ? teaserSection.props.children : this.bodyTextTransform(articleBodySection.props.children,true)}
              </div>
            </div>



            </Teaser>
          )}

          {false && AdSection && AdSection}
        </header>
  }
}
ArticleHeader.defaultProps = {
  linkedin:{},
  facebook:{},
  twitter:{},
  headerType:'pano'
}

const ArticleHeaderTop = props=>props.children || null;
ArticleHeaderTop.isArticleHeaderTop = true;

const ArticleHeaderH1 = props=>props.children || null;
ArticleHeaderH1.isArticleHeaderH1 = true;

const ArticleHeaderH2 = props=>props.children || null;
ArticleHeaderH2.isArticleHeaderH2 = true;

const ArticleHeaderFeatureItem = props=>props.children || null;
ArticleHeaderFeatureItem.isArticleHeaderFeatureItem = true;

const ArticleHeaderBrow = props=>props.children || null;
ArticleHeaderBrow.isArticleHeaderBrow = true;

const ArticleHeaderAuthors = props=>props.children || null;
ArticleHeaderAuthors.isArticleHeaderAuthors = true;

const ArticleHeaderProductGrid = props=>props.children || null;
ArticleHeaderProductGrid.isArticleHeaderProductGrid = true;

const ArticleHeaderSponsorLogo = props=>props.children || null;
ArticleHeaderSponsorLogo.isArticleHeaderSponsorLogo = props=>props.children;

export {
  ArticleHeaderTop,
  ArticleHeaderH1,
  ArticleHeaderH2,
  ArticleHeaderFeatureItem,
  ArticleHeaderBrow,
  ArticleHeaderAuthors,
  ArticleHeaderProductGrid,
  ArticleHeaderSponsorLogo
}

export default ArticleHeader;
