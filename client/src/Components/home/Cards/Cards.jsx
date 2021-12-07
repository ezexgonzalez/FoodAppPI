import React,{useEffect} from 'react';
import Card from './Card.jsx';
import { connect} from 'react-redux';
import { getRecipes } from '../../../reducer/actions.js';
import s from "./cards.module.css";


export function Cards(props) {
   
    

    useEffect(()=>{
        props.getRecipes();
    },[props.getRecipes])

    console.log(props.recipes)

    if(props.recipes.results){

    return( 
        <div className={s.cardsContainer}>
          {

            props.recipes.results.map(r => (
              <Card
                title = {r.title}
                image={r.image}
                key={r.id}
              
              />
            ))

          }
  
        </div>
    )
    }else{
        return (
            <div>
                Loading...
            </div>
        )
    }
  
};

function mapStateToProps(state){

    return{
        recipes: state.recipes
    }


}


export default connect(mapStateToProps, {getRecipes})(Cards);


