import React, { Component, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';

let SWITCHING_ON = 0;
let SWITCHED_ON = 1;
let SWITCHING_OFF = 2;
let SWITCHED_OFF = 3;

let switchStates = {
  SWITCHING_ON,SWITCHED_ON,SWITCHING_OFF,SWITCHED_OFF
};




const AsyncSwitch = props=>{

    const [switchState,setSwitchState] = useState(props.initialChecked ? switchStates.SWITCHED_ON : switchStates.SWITCHED_OFF);

    let checked = !!(switchState == switchStates.SWITCHED_ON || switchState == switchStates.SWITCHING_OFF);
    let disabled = !!(switchState == switchStates.SWITCHING_OFF || switchState == switchStates.SWITCHING_ON);

    const handleClick = ()=>{
        if (props.clickable === false){
          return;
        }
    
    
        if (switchState == switchStates.SWITCHED_OFF){
            setSwitchState(switchStates.SWITCHING_ON);
    
          props.onSwitchingOn().then(()=>{
            setSwitchState(switchStates.SWITCHED_ON);
            props.onSwitchedOn && props.onSwitchedOn();
          }).catch(()=>{
            setSwitchState(switchStates.SWITCHED_OFF);
          });
    
        }
        else if (switchState == switchStates.SWITCHED_ON){
            setSwitchState(switchStates.SWITCHING_OFF);
    
          props.onSwitchingOff().then(()=>{
            setSwitchState(switchStates.SWITCHED_OFF);
            props.onSwitchedOff && props.onSwitchedOff();
          }).catch(()=>{
            setSwitchState(switchStates.SWITCHED_ON);
          });;
        }
    
      }

    let Component = props.SwitchComponent?
      <props.SwitchComponent
        checked={checked}
        disabled={disabled}
      />:
      <Switch
        checked={checked}
        disabled={disabled}
      />;

    return (
      <FormControlLabel
        control={Component}
        label={props.children || props.label}
        onClick={handleClick.bind(this)}
      />
    );
  }

  AsyncSwitch.defaultProps = {
    onSwitchingOn:()=>{
      return Promise.resolve();
    },
    onSwitchingOff:()=>{
      return Promise.resolve();
    }
  }


  

  



//An event for onSwitchingOn, onSwitchingOff might not be entirely necessary

AsyncSwitch.propTypes = {
  label: PropTypes.string,
  initialChecked: PropTypes.bool,
  onSwitchingOn: PropTypes.func,
  onSwitchedOn: PropTypes.func,
  onSwitchingOff: PropTypes.func,
  onSwitchedOff: PropTypes.func,
  SwitchComponent: PropTypes.func,
  clickable: PropTypes.bool,
  children: PropTypes.any
};

export default AsyncSwitch;
