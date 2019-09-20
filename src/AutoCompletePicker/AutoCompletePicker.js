import React, {Component, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {reject} from 'lodash';
import PropTypes from 'prop-types';
import loadScript from 'load-script';



/*import {SortableContainer, SortableElement} from 'react-sortable-hoc';*/


import { faTimes } from '@fortawesome/fontawesome-free-solid';

import styled from 'styled-components';

import MainMenu from './MainMenu/MainMenu.js';

import DoubleView from './DoubleView/DoubleView.js';

import LoadingAndPlus from './LoadingAndPlus/LoadingAndPlus.js';

const AutoCompletePickerWrapper=styled.div`
  box-shadow:1px 2px 5px 0px #333;

  padding:0 10px;
  box-sizing:border-box;
  position:relative;

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */`;







    














class AutoCompletePicker extends Component{
  constructor(props){
    super();
    this.state={
      isOpen:false,
      showInput:false,
      isLoading:false,
      selected:[],
      data:[]
    };
  }

  componentDidMount(){
    this.loadDataIfNecessary().then(data=>{
      console.log("ldif",data)
      const selected = this.props.selected.map(selected=>{
        return data.filter(datum=>datum[this.props.nameValue]==(typeof selected == 'string'?selected:selected[this.props.nameValue]))[0]
      });
      console.log("ldif",data,selected);
      this.setState({
        data:data,
        selected:selected
      });
    });
  }

  loadDataIfNecessary(){

    //call loadData if props.data is a URL and not already data.

    return new Promise((resolve,reject)=>{
      if (typeof this.props.data == 'object') {
        resolve(this.props.data);
      }
      else if (typeof this.props.data == 'string'){
        this.loadData().then((data)=>resolve(data)).catch(reject);
      }
    });
  }

  loadData(){

    //load data setting isLoading and error state. Pass data through callback.

    return new Promise((resolve,reject)=>{
      this.setState({isLoading:true},()=>{this.fetchData().then((data)=>{
        this.setState({
          isLoading:false
        },()=>resolve(data));
      }).catch(()=>{
        this.setState({
          isLoading:false,
          error:"Error"
        },reject); //Todo error handling. Rather than isLoading boolean maybe status: loading, loaded, error
      })});
    })

  }

  fetchData(){

    //fetch data

    return new Promise((resolve,reject)=>{
      loadScript('https://code.jquery.com/jquery-3.3.1.js',(err)=>{
        if (err) reject(err);
        $.ajax({
          url:this.props.data,
          type:'GET',
          dataType: 'json',
          success:(data)=>{
            resolve(data);
          },
          error:(jqXHR,textStatus,errorThrown)=>{
            reject(errorThrown)
          }
        })}
      );
    })
  }


  componentDidUpdate(prevProps){
    if (this.props.selected && this.props.selected.join('|') !== prevProps.selected.join('|')){
      this.loadDataIfNecessary().then((data)=>{
        this.setState({
          selected:this.props.selected.map(selected=>data.filter(datum=>datum[this.props.nameValue]==selected)[0])
        })
      })
    }

    if (this.props.data!==prevProps.data){
      this.updateData();


    }

    return null;



  }


/*
  updateData(){
    if (typeof this.props.data == 'string'){
      this.setState({isLoading:true},()=>{
        setTimeout(()=>{
          loadScript('https://code.jquery.com/jquery-3.3.1.js',()=>{
            $.ajax({
              url:this.props.data,
              type:'GET',
              dataType: 'json',
              success:(data)=>{
                this.props.onLoad && this.props.onLoad(data);
                if (this.props.reducer) data = this.props.reducer(data);

                //const selected = filter(data,this.props.initialSelected);
                //debugger;

                this.setState({
                  data:data,
                  isLoading:false,
                  selected:selected
                },()=>{});

              },
              error:(err)=>{
                //reject(err);
              }
            });
          });
        },0);
      });


    }
    else {
      this.setState({
        data:this.props.data,
        selected:filter(this.props.data,this.props.initialSelected)
      });
    }

  }*/


  updateAutoComplete(){
  }
  handleClickMinus(obj){
    /*
    window._filter = filter;
    window._selected = this.state.selected;
    window._obj = obj;*/

    this.setState({
      selected:reject(this.state.selected,obj)
    });
  }
  handleDrag(e){
  }




  handleType(){}


  render(){

    let additionalStyles = {};

    if (!this.state.isOpen) additionalStyles = {...additionalStyles,
      width: '20px',
      height: '20px',
      padding: '2px 3px',
      borderRadius:'15px',
      display: 'flex',
      justifyContent: 'center'
    };

      if (!this.state.showInput) additionalStyles = {...additionalStyles,
        //width: '100px',
        //height: '26px',
        margin: '2px 0',
        fontSize: '14px',
        lineHeight: '16px',
        
      }
      else additionalStyles = {}

    return <AutoCompletePickerWrapper style={additionalStyles}>
      <DoubleView 
        view1={<LoadingAndPlus isLoading={this.state.isLoading} onPlus={()=>this.setState({isOpen:true})}/>}
        view2={<MainMenu 
          onEx={()=>this.setState({isOpen:false})} 
          onApply={()=>{this.setState({isOpen:false})}} 
          customFilteredDataFunction={(query)=>{
            return Promise.resolve(this.props.dataSource.filter(f=>f.name.indexOf(query) > -1));
          }}
        />
        }
        onEx={()=>this.setState({isOpen:false})}
        viewIndex={+ this.state.isOpen} //fancy syntax using "+": https://stackoverflow.com/questions/7820683/convert-boolean-result-into-number-integer 
      />
     
      </AutoCompletePickerWrapper>;
  }
}
AutoCompletePicker.defaultProps = {
  selected:[],
  nameValue:'name'
}
AutoCompletePicker.propTypes = {
  placeholder: PropTypes.string,
  nameValue: PropTypes.string,
  selected: PropTypes.array,
  //data: PropTypes.object,
  data: PropTypes.array,
  onApply: PropTypes.func,
  onSwitch: PropTypes.func
};


export default AutoCompletePicker;
