import { useState } from "react";
import {Link} from "react-router-dom"
import s from "./newRecipe.module.css";



export default function NewRecipe() {


    const [formState, setFormState] = useState({
        title: "",
        summary: "",
        punctuation: 0,
        healtyLevel: 0,
        steps: []
    })

    function handleOnChange(e) {

        if (e.target.name !== "steps") {

            setFormState(prevState => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    return (
        <div>
            
            <div className={s.container}>
            <span className={s.title}>Create recipe.</span>
                <form className={s.form} action="">
                    
                    <input className={s.input} placeholder="Name" onChange={handleOnChange} name="title" type="text" />
                    <textarea placeholder="Summary" className={s.textarea} onChange={handleOnChange} name="summary" id="" cols="30" rows="10"></textarea>
                    <input className={s.input} placeholder="Punctuation" onChange={handleOnChange} name="punctuation" type="number" max="100" min="0" />
                    <input className={s.input} placeholder="Healty level" onChange={handleOnChange} name="healtyLevel" type="number" max="100" min="0" />
                    <button className={s.button}>Create</button>
                </form>
                <Link to="/home">
                    <span className={s.buttonBack}>Back to Home</span>
                </Link>
               
            </div>
        </div>

    )

}