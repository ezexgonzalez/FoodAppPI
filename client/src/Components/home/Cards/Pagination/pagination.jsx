import React, {useState} from "react";
import s from "./pagination.module.css";
import Search from "./search";



export default function Pagination(props){


    const [page , setPage] = useState(1);
    

    function nextPage(){
        
        if(props.pages < props.data.length - 10){
            props.setPages(props.pages + 10);
            setPage(page + 1);
        }
    }

    function previusPage(){
        if(props.pages !== 0){

            props.setPages(props.pages - 10);
            setPage(page - 1);
        }
    }
    function start(){
        props.setPages(0);
        setPage(1);
    }
    function end(){
        props.setPages(props.data.length - 10);
        setPage(props.data.length/10);
    }


    

    return(

        <div className={s.container}>
            
            <Search
                setPages ={props.setPages}
                setPage = {setPage}
                search = {props.search}
            
            />

            <div>
                <button className={s.button} onClick={start}>Start</button>
                <button className={s.button} onClick={previusPage}>Prev</button>
                <span>{page}</span>
                <button className={s.button} onClick={nextPage}>Next</button>
                <button className={s.button} onClick={end}>End</button>
            </div>
            
        </div>

    )

}



