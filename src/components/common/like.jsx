import React from 'react';

const Like = (props) => {
    let classes = "";
    props.liked === true ? classes="fas fa-heart" : classes="far fa-heart";
    return ( 
            <i  style={{cursor:'pointer'}} 
                onClick={props.onClick} 
                className={classes}>
            </i>
            );
}
 
export default Like;