
import React, {Component} from 'react';

class Frames extends React.Component{
    render(){
      const childrenAsArray = React.Children.toArray(this.props.children);
      if (this.props.logChildren) {
        // eslint-disable-next-line no-console
        console.log(this.props.children);
        // eslint-disable-next-line no-console
        console.log(childrenAsArray);
      }
      const newProps = childrenAsArray.reduce((obj, child) => {
        if (!obj[child.props.map.get(this.props.currentFrame)]) obj[child.props.map.get(this.props.currentFrame)] = [];
        obj[child.props.map.get(this.props.currentFrame)].push(child);
        return obj;
      }, {});
  
      return <this.props.currentFrame {...newProps} {...this.props}/>;
    }
  }
  
export default Frames;
