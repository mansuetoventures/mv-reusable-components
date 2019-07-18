import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';


class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (typeof window!=='undefined') window.inf = this;
  }

  handleArticleEnter(index, articleBundle, previousArticle){
      console.log("handleArticleEnter (from top)",index)
    //This function is called when an item enters the view
    this.props.onArticleEnter && this.props.onArticleEnter.bind(this, index, articleBundle, previousArticle);
  }

  handleArticleLeave(itemIndex, item, previousItem, waypoint){
    console.log("handleArticleLeave (from top)",itemIndex)

    //Calculate the current article based omn <Waypoint> above the article of index=itemIndex leaving the viewport
    let newIndex;
    if (waypoint.currentPosition == 'above'){ //the Waypoint left the screen and is now above the viewport (so you were scrolling down)
      newIndex = itemIndex;
    }
    else { //the item left the screen is as now below the waypoint (so you were scrolling up)
      newIndex = itemIndex - 1;
    }

    let newItem = this.props.items[newIndex];
    this.props.onChangeIndex(newItem,newIndex,previousItem);
  }


  render() {


    this.eachRef = [];
    return (
      <div className="articlesHolder" ref={e => this.articlesHolder = e}>
        {this.props.items.map((item, index) => {
          let previousItem = index > 0 && this.props.items[(index - 1)];
          let componentEvents = {...this.props.componentEvents};

          Object.keys(componentEvents).forEach(function(key) {
            componentEvents[key] = componentEvents[key].bind(null,item,index);
          });


          const waypoint = <Waypoint onEnter={()=>{
            this.props.onCrossLoadWaypoint(item,index)
          }
        } />;

          const child = this.props.children(item,index,waypoint);

        const props = {
          ...child.props,
          [this.props.waypointPropName]:waypoint
        }


          const childEnchanced = <child.type {...child.props} waypoint={
            <Waypoint onEnter={()=>{
              this.props.onCrossLoadWaypoint(item,index)
            }
          } />
          }/>

          return (
            <div key={index}>

              <Waypoint
                topOffset={this.props.topOffset}
                onEnter={this.handleArticleEnter.bind(this,index,item, previousItem) }
                onLeave={this.handleArticleLeave.bind(this,index,item, previousItem) }
                >
                {this.props.debugMode && <div style={{width:'100%',height:'1px',background:'red'}}></div>}
              </Waypoint>
              {childEnchanced}
            </div>
          );
        })}
      </div>
    );
  }
}
InfiniteScroll.defaultProps={
  waypointPropName:'waypoint',
  onChangeIndex:()=>{}
}

InfiniteScroll.propTypes = {
  topOffset: PropTypes.string,
  items: PropTypes.array,
  onChangeIndex: PropTypes.func,
  onCrossLoadWaypoint: PropTypes.func
};


export default InfiniteScroll;
