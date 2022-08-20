import React from 'react';

export default function Die(props) {
    
    return (
        
        <div 
         key={props.id}
         className={`die ${props.clicked ? "active" : ""}`}
         onClick={props.lockNumber}>
         
        <p className="number">{props.num}</p>
        
        </div>
        )
} 