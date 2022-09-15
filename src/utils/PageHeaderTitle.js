import React from 'react';

const PageHeaderTitle = props =>{
    return <span
        style={{
            fontSize:"30px"
        }}
    >
        {props.title || ""}
    </span>
}

export default PageHeaderTitle;