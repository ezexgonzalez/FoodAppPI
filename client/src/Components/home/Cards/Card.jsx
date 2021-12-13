import React from 'react';
import {Link} from 'react-router-dom';
import s from "./card.module.css";
import tick from "./tick.png";


export default function Card(props) {
    // acá va tu código
  



    return( 
      <div className={s.card} >
          <img src={props.image} alt="" />
          <div className={s.textContainer}>
            <Link className={s.link} to={`/recipes/${props.id}`}>
              <span className={s.text}>{props.title}</span>
            </Link>
            <div className={s.punctuation}>
              {
                props.diets.map(d =>(
                  <div key={d}>
                      <span  className={s.typeText}>{d}</span>
                      <img className={s.tick} src={tick} alt="tick" />
                   </div>
                ))
              }
              
            </div>
          </div>
          
         
      </div>
    )
  };


