import React from 'react'

export default function Image1(props) {
    console.log("Props: ", props);
    return (
        <div>
            <img  src={props.link}/>
        </div>
    )
}
