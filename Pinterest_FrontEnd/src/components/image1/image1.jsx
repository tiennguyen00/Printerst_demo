import React from 'react'
import './image1.scss'

export default function Image1(props) {
    return (
        <img className="image" src={props.link} alt="Error"/>
    )
}
