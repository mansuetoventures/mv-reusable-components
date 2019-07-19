import React, { Component } from 'react';

const SiteFrame = props=><div className='site-frame'>
    <div>
        {this.props.children[0]}
    </div>
    <div style={{marginTop:this.props.marginTop}}>
        {this.props.children[1]}
    </div>
</div>;

const SiteFrameBody = props=>props.children;

export {SiteFrameBody};
export default SiteFrame;
