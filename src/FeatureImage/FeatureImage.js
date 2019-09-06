import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './FeatureImage.scss';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { isNull, isUndefined, isEmpty } from 'lodash';
import AddModal from 'hocs/AddModal/AddModal.js';
import {find,castArray,get} from 'lodash';
import articleContainerCSS from 'pages/Article/ArticlePage.scss';

import FeatureImageFrame from './FeatureImageFrame.js';

const ImageCaption = props => <div onClick={props.onClick} className={css.imageCaption} dangerouslySetInnerHTML={{ __html: props.children }}></div>; // eslint-disable-line react/prop-types
ImageCaption.isImageCaption = true;
ImageCaption.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
}

const ImageCredit = props => <div onClick={props.onClick} className={css.imageCredit} dangerouslySetInnerHTML={{ __html: props.children && props.children.replace(/^CREDIT:\s/i , '') }}></div>;
ImageCredit.isImageCredit = true;
ImageCredit.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
}


const ClickableBox = props=>props.children;
ClickableBox.isClickableBox = true;

import AddImage from 'components/common/FeatureImage/AddImage/AddImage.js';
import MaterialModal from '@material-ui/core/Modal';
import FeatureImagePicker from 'components/common/FeatureImage/FeatureImagePicker.js';

class FeatureImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      sort1: 'creative',
      src: props.src
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src){
      this.setState({src:this.props.src})
    }
  }

  handleModalClose(){
    this.setState({ open: false });
  }

  render() {
    let img = find(castArray(this.props.children),child=>get(child,'type')=='img');
    //let ClickableBox = find(castArray(this.props.children),child=>get(child,'type.isClickableBox'));


    if (!img && this.props.editMode){
       img = <img src='https://place-hold.it/970x450?text=YouNeedToSupplyAnImage' />;
        imgprops = img.props;
        if (this.state.imgdata) imgprops={
          ...imgprops,
          src:this.state.imgdata
        };
      }



    return (
      <FeatureImageFrame additionalClasses={{main:css[this.props.type]}} type={this.props.type}>
        {this.props.editMode && <ClickableBox>
          <AddImage
            text={!this.state.featureImageSrc ? 'Add' : 'Change'}
            onClick={() => {
              this.setState(
                {
                  featureImagePickerOpen: true
                },
                () => {
                  //console.log(this.state);
                }
              );
            }}
          />

          <MaterialModal
            onClose={() =>
              this.setState({
                featureImagePickerOpen: false
              })
            }
            open={!!this.state.featureImagePickerOpen}
          >
            <FeatureImagePicker
              onClickImage={(img, imageIndex) =>{
                this.setState({featureImagePickerOpen:false})
                this.props.onPickImage(imageIndex, img)
              }
            }
            />
          </MaterialModal>
        </ClickableBox>}
        {img && <img className={css.featureImage}
                        draggable="false"
                        className={
                          `${this.props.editMode && !this.state.src
                            ? articleContainerCSS.noImage
                            : ''} ${this.props.editMode?css.mouseOverEditMode:''}`
                        }
                        src={this.state.src}
                        /*key={this.props.url} what's this prop for? */ style={{
                          cursor: this.props.editMode ? 'move' : ''
                        }}
                      />
          }

      </FeatureImageFrame>);
  }

}

FeatureImage.defaultProps = {
  onPickImage: ()=>{},
  src: 'https://place-hold.it/970x450?text=YouNeedToSupplyAnImage'
}

FeatureImage.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string,
  onPickImage: PropTypes.func,
  children: PropTypes.array,
  editMode: PropTypes.bool,
  onClick: PropTypes.func
};

export default FeatureImage;
export {ImageCaption, ImageCredit};
