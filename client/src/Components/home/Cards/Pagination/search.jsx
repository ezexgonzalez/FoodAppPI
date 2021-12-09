import React from "react";


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
            <select  name="type" id="type">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                </select>
                <input name="search" onChange={(e)=>searchState(e)} placeholder="Search" type="search" />
                

        </div>

    )



}