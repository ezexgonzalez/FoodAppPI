import React from 'react';
import {Link} from 'react-router-dom';
import s from "./card.module.css";

export default function Card(props) {
    // acá va tu código
 
    return( 
      <div className={s.card} >
          <img src={props.image} alt="" />
          <span className={s.text}>{props.title}</span>
         
      </div>
    )
  };


