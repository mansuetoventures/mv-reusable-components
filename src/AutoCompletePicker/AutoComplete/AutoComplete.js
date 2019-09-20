import React, {Component} from 'react';
import PropTypes from 'prop-types'

import AutoCompleteResults from './AutoCompleteResults/AutoCompleteResults.js';
import AutoCompleteOption from './AutoCompleteOption/AutoCompleteOption.js';

class AutoComplete extends React.Component{
  constructor(props){
    super();

    let urlSrc = typeof props.data == 'string' && props.data;
    let dataArr = typeof props.data == 'object' ? props.data: [];

    this.state = {
      searchQuery:'',
      urlSrc,
      dataArr
    };
  }

  getFilteredData(){
    if (this.props.customFilteredDataFunction) {
      return this.props.customFilteredDataFunction(this.state.searchQuery);
    }
    else return new Promise((resolve,reject)=>{
      if (this.state.urlSrc) $.ajax({
        url:`${this.state.urlSrc}/${this.state.searchQuery}`,
        type: 'GET',
        success: data => {
          if (data.error){
            reject(data.error);
          }
          else resolve(data.data)

        },
        error: err => {
          // eslint-disable-next-line no-console
          reject('Error ',err);
        }
      }); 
    });
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.searchQuery !== this.state.searchQuery){
      this.getFilteredData().then((data)=>{
        this.setState({isError:false,dataArr:data});
      }).catch((err)=>{
        this.setState({isError:true})
        this.props.onError(err);
      });
    }
  }
  handleType(event){
    this.setState({
      searchQuery:event.target.value
    });
  }
  handleFocus(){
    this.setState({showResults:true});
  }
  handleBlur(){}
  handleChoose(obj){
    this.setState({searchQuery:''},this.props.onChoose.bind(null,obj));
  }
  render(){
    let results = [];
    if (this.state.searchQuery.length){

      results = this.state.dataArr.filter(data=>{
        // eslint-disable-next-line no-console
        if (data[this.props.nameField] == null) console.warn('object with null namefield',data);
        return  data[this.props.nameField] && data[this.props.nameField].toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) > -1;
      });
    }

    const style = {};
    if (this.state.isError) style.outline='3px solid red';
    style.display='inline-block';
    return <div style={style}>
      <input value={this.state.searchQuery} placeholder={this.props.children} onChange={this.handleType.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} />
      {!!results.length &&
        <AutoCompleteResults>
          {results.map((result,i)=>{
            return <AutoCompleteOption key={i} onClick={this.handleChoose.bind(this,result)}>
              {result[this.props.nameField]}
            </AutoCompleteOption>;
          })}
        </AutoCompleteResults>
      }
    </div>;
  }
}

AutoComplete.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),
  nameField: PropTypes.string,
  onChoose: PropTypes.func,
  children: PropTypes.string,
  onError: PropTypes.func.isRequired
};

AutoComplete.defaultProps = {
  onChoose:(obj)=>{
    // eslint-disable-next-line no-console
    console.log("You have chosen:",obj, "Please pass an onChoose prop to this component.");
  },
  nameField:'name',
  allowMultiple:false//true not completely supported at this time
}

export default AutoComplete;
