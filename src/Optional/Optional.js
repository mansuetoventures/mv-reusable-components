const Optional = props=>(props.display && props.children) || null;
const OneOf = props=>{


  let whichOne;
  if (typeof props.whichOne ==='function') whichOne = props.whichOne();
  else whichOne = props.whichOne;

  if (whichOne === false) return props.children[0];
  else if (whichOne === true) return props.children[1];
  else if (typeof whichOne === 'number') {
    return props.children[whichOne] || null;
  }
  else if (whichOne) return whichOne;
  else return props.children[props.children.length - 1] || null;
};

export {Optional, OneOf};
