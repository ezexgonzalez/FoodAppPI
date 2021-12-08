import React,{useEffect, useState} from 'react';
import Card from './Card.jsx';
import { connect} from 'react-redux';
import { getRecipes } from '../../../reducer/actions.js';
import s from "./cards.module.css";
import Pagination from "./Pagination/pagination";


export function Cards(props) {
   
    

    useEffect(()=>{
        props.getRecipes();
    },[props.getRecipes])

    console.log(props.recipes)

    const [recipesPage, setRecipesPage] = useState(0);

    function recipesPages(){

        return props.recipes.results.slice(recipesPage, recipesPage + 10);
    }

    if(props.recipes.results){

    return( 
        <div>
            <Pagination 
            data={props.recipes.results}
            pages={recipesPage}
            setPages={setRecipesPage}
            />
        <div className={s.cardsContainer}>
          {

            recipesPages().map(r => (
              <Card
                title = {r.title}
                image={r.image}
                key={r.id}
              
              />
            ))

          }
  
        </div>
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


