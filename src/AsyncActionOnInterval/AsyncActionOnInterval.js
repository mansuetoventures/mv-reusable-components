import React, {Component} from 'react';
import PropTypes from 'prop-types';
import css from './AsyncActionOnInterval.scss';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

function toLowerCase(str){
  return str.charAt(0).toLowerCase() + str.slice(1);
}

//Ghetto css vars
Object.keys(css.root).forEach(varName=>{
  Object.keys(css).forEach(className=>{
    Object.keys(css[className]).forEach(cssPropName=>{
      console.log('var\\(--'+toLowerCase(varName)+'\\)');
      css[className][cssPropName] = css[className][cssPropName].replace(new RegExp('var\\(--'+toLowerCase(varName)+'\\)','g'),css.root[varName]);
    })
  })
});

console.log(css);

const SwitchRemoveWeirdStyles = withStyles({
    root:{
      display:'inline-block',
      width:'34px'
    },
    switchBase:{
      width:'20px',
      height:'20px'
    }
  
  })(class SwitchRemoveWeirdStyles extends React.Component{
    render(){
      return <Switch {...this.props}/>;
    }
  });
  
  


class Timer extends React.Component{
  constructor(props){
    super();
    this.state={
      secondsRemaining:props.length,
    };
  }

  componentDidMount(){

    this.props.isRunning && this.beginTimer();
  }

  componentDidUpdate(prevProps){
    if (!prevProps.isRunning && this.props.isRunning) {
      this.beginTimer();
    }

  }

  beginTimer(){
    this.setState({secondsRemaining:this.props.length},()=>setTimeout(this.countdownSecond.bind(this),1000));
  }

  resetTimer() {
    this.setState({secondsRemaining: this.props.length});
  }

  countdownSecond(){
    (new Promise((resolve,reject)=>{
      this.setState({secondsRemaining:this.state.secondsRemaining - 1},()=>{
        if (this.state.secondsRemaining == 0 && this.props.isRunning) {
          this.props.onTimerComplete().then(()=>{
            this.beginTimer();
            resolve();
          }).catch((err) => {
            this.beginTimer();
            reject(err);
          });;

        }
        else {
          this.props.isRunning && setTimeout(this.countdownSecond.bind(this),1000);
          resolve();
        }
      });
    }));
  }

  render(){
    return this.props.display ? <div style={css.timer}>
      {this.state.secondsRemaining}
    </div> : "";
  }
}

Timer.propTypes = {
  length:PropTypes.number,
  isRunning:PropTypes.bool,
  onTimerComplete:PropTypes.func
};





class AsyncActionOnInterval extends React.Component{
  constructor(props){
    super();
    this.state = {
      message:props.doneMessage,
      secondsRemaining:props.secondsBetweenActionCalls,
      switchChecked:typeof props.autoAction!=='undefined' ? props.autoAction : true,
    };
  }

  componentDidUpdate(prevProps){
    if (prevProps.disabled && !this.props.disabled) {
      this.setState({
        message:this.props.readyMessage,
      });
    }

    if (prevProps.autoAction !== this.props.autoAction){
      this.setState({
        switchChecked:this.props.autoAction
      });
    }
  }

  doAction(){
    return new Promise((resolve,reject)=>{
      this.props.action().then(()=>{
        this.setState({message:this.props.doneMessage});
        resolve();
      }).catch((err)=>{
        this.setState({message:this.props.errorMessage},()=>{
          reject(err);
        });
      });
    });
  }

  handleTimerComplete(){
    return new Promise((resolve,reject)=>{
      this.setState({message:this.props.duringMessage},()=>{
        this.doAction().then(() => {resolve()})
        .catch((err) => {
          reject(err);
        });
      });
    });
  }

  handleClick(){
    !this.props.disabled && this.setState({message:this.props.duringMessage}, this.doAction.bind(this));
  }

  handleSwitch(e,c){
    this.setState({switchChecked:c});

  }

  render(){
    return <div style={{
      ...css.main,
      ...css.showColors
    }}>
      <div style={css.main__button} onClick={this.handleClick.bind(this)}>
        <Button disabled={this.props.disabled}>
          {this.state.message}
        </Button>
      </div>

      <div style={css.main__menu}>
        {this.props.showBottom ?
          <div style={css.switchAndLabel}>
            <div style={css.label}>
              {this.props.autoName}
            </div>
            <div style={css.switch}>

              <Switch
                checked={this.state.switchChecked}
                onChange={this.handleSwitch.bind(this)}
                disabled={this.props.disabled}
              />
            </div>
          </div>
          :""
        }

        {this.state.switchChecked && <Timer disabled={this.props.disabled} length={this.props.secondsBetweenActionCalls} isRunning={true} display = {this.props.showBottom} onTimerComplete={this.handleTimerComplete.bind(this)}/>}
        {this.state.errorMessage && <div onMouseEnter={()=>{
          this.setState({questionMarkHover:this.state.errorMessage});
        }}
        onMouseLeave={()=>{
          this.setState({questionMarkHover:undefined});

        }}
       style={{
          fontSize:'20px',
          position:'relative'
        }}>
          {this.state.questionMarkHover && <div style={{
            position:'absolute',
            border:'2px solid black',
            width:'100px',
            background:'hsl(3, 88%, 50%)',
            padding:'5px'
          }}>{this.state.questionMarkHover}</div>}
          ⚠️
        </div>}
      </div>
    </div>;
  }
}

AsyncActionOnInterval.defaultProps={
  action:function(){
    return Promise.resolve();
  },
  showBottom: false
}

AsyncActionOnInterval.propTypes={
  disabled:PropTypes.bool,
  showBottom: PropTypes.bool,
  duringMessage:PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  readyMessage:PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  autoAction:PropTypes.bool,
  action:PropTypes.func,
  doneMessage:PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  errorMessage:PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  secondsBetweenActionCalls:PropTypes.number
};

export default AsyncActionOnInterval;


/*
  root:{
    transform:'scale(0.5)',
    height:'20px',
    width:'auto',

    //
    transform:'',
    height:'10px'

  },
  switchBase:{
    height:'20px',

    //
    height:'10px',
    width:'10px'

  },
  icon:{
    //
    height:'10px',
    width:'10px'
  },
  bar:{
    //
    width:'17px',
    height:'7px',
    position:'static',
    margin:'0'
  }*/
