import React from 'react'
import '../style.css'
export default function Popup(props) {
    return (
        <div className={props.victory ? "popup" : "popup_hidden"}>
            <p>You Won!!!</p>
        </div>
    )


}