import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AsyncActionOnInterval from './AsyncActionOnInterval.js';
import Switch from '@material-ui/core/Switch';



class AsyncActionOnIntervalDemo extends React.Component{
    constructor(){
        super();
        this.state = {
          isAdminMode:true,
          editModeShouldSucceed:true,
          isBrandview:false,
          modified:'{}',
          isOpen:false,
          headerType:'pano',
          bodyTextType:'string',
          showBottom: false,
          passOrFail: false,
        };
        if (typeof window!=='undefined') window.afd = this;
      }
    
    
    
    
      handleBeforeSave(){
        return new Promise((resolve,reject)=>{
          alert('Will have to save the image here I guess');
          resolve();
        });
    
      }
      handleOnSave(){
        return new Promise((resolve,reject)=>{
          alert('Update redux here I guess');
          resolve();
        });
      }
      handleOnPublish(){
        return new Promise((resolve,reject)=>{});
      }
    
      test(){
        let passOrFail = this.state.passOrFail;
        return new Promise((resolve,reject)=>{
          setTimeout(function () {
            if(passOrFail){
              console.log("Function");
              resolve();
            }
            else {
              console.log("Fail");
              reject();
            }
          }, 1000);
        });
    }
    
      onTChange(e,c){
        this.setState({showBottom:c});
      }
    
    
      handleSwitch(e,c){
        this.setState({passOrFail:c});
      }
    render(){
        return <React.Fragment>
        <div style={{
          display:'flex'
        }}>
        <p>Pass or fail</p>
        <Switch
          checked={this.state.passOrFail}
          onChange={this.handleSwitch.bind(this)}
          disabled={false}
        />
        <p>Turn on bottom toggle</p>
        <Switch
          checked={this.state.showBottom}
          onChange={this.onTChange.bind(this)}
          disabled={false}
        />
        </div> 
  
        <AsyncActionOnInterval
          disabled={false}
          readyMessage={'Run'}
          duringMessage={'Running...'}
          autoAction={true}
          action={this.test.bind(this)}
          doneMessage={'Ran'}
          errorMessage={'Failed'}
          secondsBetweenActionCalls={5}
          autoName={'AUTO'}
          showBottom = {this.state.showBottom}
        /></React.Fragment>
    }
}
console.log(document.getElementById('root'));

ReactDOM.render(<AsyncActionOnIntervalDemo />, document.getElementById('root'));
