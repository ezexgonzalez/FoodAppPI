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


    console.log("Data",props.recipes);

    const [recipesPage, setRecipesPage] = useState(0);
    const [search, setSearch] = useState({
        search: "",
        type:"All",
        order: "-"
    });


    function orderPages(){

        if(search.order ==="asc"){

            return props.recipes.results.sort((a,b)=> a.aggregateLikes - b.aggregateLikes);

        }
        if(search.order ==="des"){
          
            return props.recipes.results.sort((a,b)=> b.aggregateLikes - a.aggregateLikes);
        }
        if(search.order ==="alp"){
           return props.recipes.results.sort((a,b)=> a.title.localeCompare(b.title));
        
        }
        if(search.order === "-"){
            return props.recipes.results 
        }

    }
    
    

    function recipesPages(){

        /* OPCION BUSQUEDA Y TIPO */
        if(search.search.length > 0 && search.type !== "All"){
            let filter = orderPages().filter(r => r.title.includes(search.search));
            filter = filter.filter(r => r.diets.includes(search.type));
            
            return {
                page: filter.slice(recipesPage, recipesPage + 10),
                allResults: filter
            }
               
        }

        /* OPCION BUSQUEDA ALL */
        
        if(search.search.length > 0 && search.type === "All"){
            
            const filter = orderPages().filter(r => r.title.includes(search.search));
        
            return {
                page: filter.slice(recipesPage, recipesPage + 10),
                allResults: filter
            }
        }

        /* OPCION SOLO POR TIPO */

        if(search.search.length === 0 && search.type !== "All"){

            const filter = orderPages().filter(r => r.diets.includes(search.type));
        
            return {
                page: filter.slice(recipesPage, recipesPage + 10),
                allResults: filter
            }
        }
 
        return {page: orderPages().slice(recipesPage, recipesPage + 10),
                allResults: props.recipes.results
        }
        
    }


    if(props.recipes.results){

    return( 
        <div>
            <Pagination 
            data={recipesPages().allResults}
            pages={recipesPage}
            setPages={setRecipesPage}
            search={setSearch}
            searchState={search}

            />
        
        
            <div className={s.cardsContainer}>
            {

                recipesPages().page.map(r => (
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


