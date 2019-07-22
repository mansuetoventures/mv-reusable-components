import React, { useState,useEffect,useRef } from 'react';


import Dialog from '@material-ui/core/Dialog';
import {
  withStyles,
} from '@material-ui/core/styles';
const styles = {
  paper: {
    overflowY: 'visible'
  }
};

function ClassesNesting(props) {
  const { classes } = props;

  return (
    <Dialog
      classes={{
        paper: classes.paper // class name, e.g. `classes-nesting-root-x`
      }}
      {...props}
    >
      {props.children}
    </Dialog>
  );
}

const StyledDialog = withStyles(styles)(ClassesNesting);

import DialogTitle from '@material-ui/core/DialogTitle';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

function DialogBasedOnDialogMessage(props){
    const [message, setMessage] = useState(null);

    const prevMessageProp = usePrevious(props.message);
    const prevMessageState = usePrevious(message);

    useEffect(()=>{
        console.log(prevMessageState,message,typeof prevMessageState,typeof prevMessageState !== undefined && prevMessageState !== null && message == null)
        console.log(props.message,message)
        if (typeof prevMessageState !== 'undefined' && prevMessageState !== null && message == null) {
            setMessage(null);
            console.log(1)

        }
        else if (props.message !== message){
            if (typeof props.message == 'object') setMessage(props.message.message); //hack
            else setMessage(props.message);
            console.log(2)

        } 
        else {
            console.log(3)
        }
    });

    return <StyledDialog
        open={!!message}
        onClose={() => {
                setMessage(null);
                props.onClose && props.onClose();
            }
        }
    >
        <DialogTitle>{message}</DialogTitle>
    </StyledDialog>
}

export default DialogBasedOnDialogMessage;

//Bug: set it, then close out, then set to same message again.
