import React from 'react';

const FlexItem = props=>{
    return <div style={{flex:props.flex}}>{props.children}</div>
}
FlexItem.defaultProps={
    flex:1
}

const FlexContainer = props=>{
    return <div style={{display:'flex'}}>{props.children}</div>
}

const FormLine = props=>{
    return <div style={{paddingBottom:'10px',paddingTop:'10px',paddingLeft:'10px',borderBottom:'1px solid #666'}}>
        {props.children}
    </div>
}

const Field = props=>{

    const content = ()=>{
        if (props.children) return props.children;
        else return <input value={props.value}  onChange={props.onChange} style={{width:'100%'}} />
    }

    return <FormLine>
            <FlexContainer>
                <label style={{marginRight:'20px'}}>{props.label}</label>
                <FlexItem flex={1}>
                    {content()}
                </FlexItem>
            </FlexContainer>
            {props.description && <div style={{color:'#333', fontSize:'10px'}}>
                {props.description}
            </div>}
    </FormLine>
}

const Form = props=>{
    const fields = props.children;
    let fieldsByColumn = [];
    for (var i=0;i<props.numberOfColumns;i++){
        fieldsByColumn.push([])
    }

    let currentColumn = 0;
    fields.forEach(field=>{
        const column = fieldsByColumn[currentColumn % props.numberOfColumns];
        column.push(field);
        currentColumn++;
    });

    return <div style={{marginTop:'20px'}}>
        <FlexContainer>
            {fieldsByColumn.map((column,i)=>{
                return <FlexItem key={i}>
                    {column}
                </FlexItem>
            })}
        </FlexContainer>
    </div>
}
Form.defaultProps = {
    numberOfColumns:1
}



const Content = props=>{
    return <div style={{display:'flex',justifyContent:'center',margin:'10px'}}>{props.children}</div>
}

export {Content, Form, Field}
