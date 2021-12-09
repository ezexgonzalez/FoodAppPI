import React from "react";
import s from "./search.module.css";


export default function Search(props){

   

    function searchState(e){

        
        props.search(data=>{
            props.setPages(0);
            props.setPage(1);
            return {
                ...data,
                [e.target.name] : e.target.value
            }
        })

    }

 

    return(
        <div>
            <select className={s.select} onChange={(e)=>searchState(e)}  name="type" id="type">
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                </select>
                <input className={s.search} name="search" onChange={(e)=>searchState(e)} placeholder="Search" type="search" />
                

        </div>

    )



}