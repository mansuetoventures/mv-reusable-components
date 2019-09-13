import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import loadScript from 'load-script';
import css from './FeatureImagePicker.scss';
import PropTypes from 'prop-types';

class FeatureImagePicker extends Component{
  constructor(props){
    super(props);
    this.state = {
      partner:'creative',
      sort:'popular',
      imgs:[]
    };
  }

  handleSelectChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSearchChange(event){
    event.preventDefault();

    let dataToSend = {
      proxy_type: 'search',
      image_family: this.state.partner,
      page_size: 20,
      sort_order: 'best',
      //exclude these collections
      collection_codes: 'NLM',
      collections_filter_type: 'exclude',
      exclude_nudity: true,
      phrase: this.state.search
    };


    loadScript('https://code.jquery.com/jquery-3.3.1.js',()=>{
      $.ajax({
        dataType: 'json',
        url: 'https://sitemanager.inc.com/getty/proxy-api.php',
        data: dataToSend,
        cache: false
      })
        .done((response => {
          if (!response.images || !response.images.length) response.images = [false];
          this.setState({imgs:response.images/*.map(img=>{
            try{

              let comp = img.display_sizes.filter(ds=>ds.name==='comp')[0];
              let preview = img.display_sizes.filter(ds=>ds.name==='preview')[0];
              let thumb = img.display_sizes.filter(ds=>ds.name==='thumb')[0];

              return preview.uri;
            }
            catch(e){
              return 'http://via.placeholder.com/750x450/c00/fff?text=No+images+were+returned';
            }
          })*/});
        }))
        .fail((function(response) {
          window.r = response;
        }))
      ;
    });
  }


  render(){
    return <form className={css.form} onSubmit={this.handleSearchChange.bind(this)}>
      <TextField placeholder="Search" fullWidth onChange={e=>{this.setState({search:e.target.value});}}/>
      <Select
        onChange={this.handleSelectChange.bind(this)}
        inputProps={{
          name: 'partner',
          id: 'partner',
        }}
        value={this.state.partner}
      >
        <MenuItem value='creative'>Creative (Topics)</MenuItem>
        <MenuItem value='editorial'>Editorial (News)</MenuItem>
        <MenuItem value='inc'>Inc.</MenuItem>
        <MenuItem value='personal'>Personal</MenuItem>
      </Select>
      <Select
        onChange={this.handleSelectChange.bind(this)}
        inputProps={{
          name: 'sort',
          id: 'sort',
        }}
        value={this.state.sort}
        //onChange={this.changePartner.bind(this)}
      >
        <MenuItem value='popular'>Most Popular</MenuItem>
        <MenuItem value='relevant'>Most Relevant</MenuItem>
        <MenuItem value='recent'>Most Recent</MenuItem>
      </Select>
      <div className={css.imagelist}>
        {this.state.imgs.map((image,i) => {
          return <div className={css.item} key={i}>
            <img src={image.display_sizes.filter(ds=>ds.name==='preview')[0].uri} onClick={this.props.onClickImage.bind(this,image,i)}/>
          </div>;
        })}
      </div>
    </form>;
  }
}

FeatureImagePicker.propTypes = {
  onClickImage: PropTypes.func
}

export default FeatureImagePicker;
