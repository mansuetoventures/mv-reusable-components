import React, { Component } from 'react';
import {find,castArray,get} from 'lodash';
import css from './FeatureImage.scss';
import DraggableZoomableImage from 'components/common/DraggableZoomableImage/DraggableZoomableImage';

class FeatureImageFrame extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    let ImageCaption = find(castArray(this.props.children),child=>get(child,'type.isImageCaption'));
    let ImageCredit = find(castArray(this.props.children),child=>get(child,'type.isImageCredit'));
    let img = find(castArray(this.props.children),child=>get(child,'type')=='img');
    let ClickableBox = find(castArray(this.props.children),child=>get(child,'type.isClickableBox'));
    const additionalClasses = {
      main:'',
      ...this.props.additionalClasses
    };

    let imgprops;
    if (img){
      imgprops = img.props;
      if (this.state.imgdata) imgprops={
        ...imgprops,
        src:this.state.imgdata
      };
    }



    return <div className={css.wrapper}>

        {ClickableBox && <div className={css.centeredBox}>{ClickableBox}</div>}

        <div className={`${css.main || ''} ${additionalClasses.main || ''} ${css[this.props.type]}`}>


          {!!img &&
            <DraggableZoomableImage imgOverride={this.props.type == 'skinnypano' && <div className={css.photo} style={{background: `url(${img.props.src})`}}></div>} disabled={this.props.draggableDisabled} className={css.photo} onMouseUp={(imgdata=>{

            //document.querySelector('[src="https://www.incimages.com/inc-logo-black.png"]').src=imgdata;
            //this.setState({imgdata:imgdata});
            })} mouseOverBorder={this.props.mouseOverBorder}>
            <img className={css.featureImage} {...imgprops}/>
          </DraggableZoomableImage>
        }
      </div>
      <div className={css.imageCaptionCredit}>
        {ImageCredit}
      </div>
    </div>;
  }
}

FeatureImageFrame.defaultProps = {
  additionalClasses:{}
}



export default FeatureImageFrame;
