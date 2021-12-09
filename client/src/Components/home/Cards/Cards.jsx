import React,{useEffect, useState} from 'react';
import Card from './Card.jsx';
import { connect} from 'react-redux';
import { getRecipes } from '../../../reducer/actions.js';
import s from "./cards.module.css";
import Pagination from "./Pagination/pagination";


export function Cards(props) {
   
    
    useEffect(()=>{
        props.getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.getRecipes]);


    console.log(props.recipes);

    const [recipesPage, setRecipesPage] = useState(0);
    const [search, setSearch] = useState({
        search: "",
        type:"All"
    });
    

    function recipesPages(){

        /* OPCION BUSQUEDA Y TIPO */
        if(search.search.length > 0 && search.type !== "All"){
            let filter = props.recipes.results.filter(r => r.title.includes(search.search));
            console.log(filter);
            filter = filter.filter(r => r.diets.includes(search.type));
            return filter.slice(recipesPage, recipesPage + 10);
            
            
        }

        /* OPCION BUSQUEDA ALL */
        
        if(search.search.length > 0 && search.type === "All"){
            
            const filter = props.recipes.results.filter(r => r.title.includes(search.search));
            
            return filter.slice(recipesPage, recipesPage + 10);
        }

        /* OPCION SOLO POR TIPO */

        if(search.search.length === 0 && search.type !== "All"){

            const filter = props.recipes.results.filter(r => r.diets.includes(search.type));

            return filter.slice(recipesPage, recipesPage + 10);
        }

        return props.recipes.results.slice(recipesPage, recipesPage + 10);
        
    }


    if(props.recipes.results){

    return( 
        <div>
            <Pagination 
            data={props.recipes.results}
            pages={recipesPage}
            setPages={setRecipesPage}
            search={setSearch}
            />
        
        
        <div className={s.cardsContainer}>
          {

            recipesPages().map(r => (
              <Card
                title = {r.title}
                image={r.image}
                key={r.id}
                likes={r.aggregateLikes}
                diets={r.diets}
                id={r.id}
              
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


