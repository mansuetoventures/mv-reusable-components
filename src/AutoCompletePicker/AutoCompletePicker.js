import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import css from './AutoCompletePicker.scss';
import {reject, identity, pullAt, filter} from 'lodash';
import PropTypes from 'prop-types';
import loadScript from 'load-script';
import Draggable from 'components/common/Draggable/Draggable.js';

import DraggableList from './DraggableList/DraggableList.js';
import Item from './Item/Item.js';

import MenuBar from './MenuBar/MenuBar.js';
import AutoComplete from './AutoComplete/AutoComplete.js';

/*import {SortableContainer, SortableElement} from 'react-sortable-hoc';*/

import {Optional, OneOf} from '../Optional/Optional.js';


const Plus = props=><FontAwesomeIcon icon={['fas', 'plus']}  onClick={props.action} className={css.plus}/>;
Plus.propTypes = {
  action: PropTypes.func
};
const X = props=><FontAwesomeIcon icon={['fas', 'times']}  onClick={props.action} className={css.ex} />;
X.propTypes = {
  action: PropTypes.func
};

const Loading = props=><FontAwesomeIcon icon={['fas', 'spinner']}  onClick={props.action} className={css.loading}/>;
Loading.propTypes = {
  action: PropTypes.func
};


class Minus extends React.Component{
  handleMouseDown(e){
    this.startY = e.clientY;
  }
  handleMouseUp(e){
    this.endY = e.clientY;
    if (this.startY == this.endY) this.props.action();
  }
  render(){
    return <FontAwesomeIcon icon={['fas','minus-square']} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}/>;
  }
}

Minus.propTypes = {
  action: PropTypes.func
};











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
      const selected = this.props.selected.map(selected=>{
        return data.filter(datum=>datum[this.props.nameValue]==(typeof selected == 'string'?selected:selected[this.props.nameValue]))[0]
      });
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
  handleChoose(obj){
    this.setState({
      selected:[...this.state.selected,obj],
      showInput:false
    });

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

  handleItemMinus(i){
    let copy = [...this.state.selected];
    this.setState({
      selected:pullAt(copy,i) && copy
    });
  }
  handleApply(){
    this.props.onApply & this.props.onApply(this.state.selected);
    this.setState({isOpen:false});
  }
  handleOnSwitch(draggingIndex,switchWith){
    let selected = this.state.selected;

    function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    }

    array_move(this.state.selected,draggingIndex,switchWith);

    this.props.onSwitch && this.props.onSwitch(this.state.selected)

  }
  render(){
    return <div className={`${css.autoCompletePicker} ${this.state.isOpen?'':css.closed} ${this.state.showInput?css.input:css.apply}`}>
      <OneOf whichOne={this.state.isOpen}>
        <div className={`${css.row}`}>
          <OneOf whichOne={this.state.isLoading}>
            <Plus action={()=>this.setState({isOpen:true})} />
            <Loading />
          </OneOf>
        </div>
        <React.Fragment>
          <DraggableList onSwitch={this.handleOnSwitch.bind(this)}>
            {this.state.selected.map((obj,i)=>{
              return <div key={i} className={`${css.row}`} ref={div=>this.wrapperDiv=div}>
                {obj[this.props.nameValue]}
                <Minus action={this.handleItemMinus.bind(this,i)}/>
              </div>
            }
            )}

          </DraggableList>
          <MenuBar>
            <Plus action={()=>this.setState({showInput:true})} />
            <OneOf whichOne={this.state.showInput}>
              <div className={css.apply} onClick={this.handleApply.bind(this)}>APPLY</div>
              <AutoComplete data={this.state.data} nameField={this.props.nameValue} onChoose={this.handleChoose.bind(this)}>{this.props.placeholder}</AutoComplete>
            </OneOf>
            <X action={()=>{if (this.state.showInput) this.setState({showInput:false}); else this.setState({isOpen:false});}} />
          </MenuBar>
        </React.Fragment>
      </OneOf>
    </div>;
  }
}
AutoCompletePicker.defaultProps = {
  selected:[]
}
AutoCompletePicker.propTypes = {
  placeholder: PropTypes.string,
  nameValue: PropTypes.string,
  selected: PropTypes.array,
  data: PropTypes.object,
  onApply: PropTypes.func,
  onSwitch: PropTypes.func
};


export default AutoCompletePicker;
