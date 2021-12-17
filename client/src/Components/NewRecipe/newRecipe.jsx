import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import s from "./newRecipe.module.css";



export default function NewRecipe() {



   

    const [formState, setFormState] = useState({
        title: "",
        summary: "",
        punctuation: 0,
        healtyLevel: 0,
        steps: []
    })
    const [stepState, setStepState] = useState({
        steps: "",
        id: [1,2,3,4,5,6,7,8,9,10]
    })



     function close(number) {

        stepState.id.push(number);

         setFormState(prevState => {
            return {
                ...prevState,
                steps: formState.steps.filter(step => step.number !== number)
            }
        });


        setStepState(prevState =>{
        
            return{
                ...prevState,
                id: stepState.id.sort(function(a, b){return a - b})
            }
        })
    
    }

    function orderSteps(){

        return formState.steps.sort(function(a, b){return a.number - b.number})
       
    }

    function handleOnChange(e) {

        if (e.target.name !== "steps") {

            setFormState(prevState => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            });
        }
        setStepState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })

    }

    async function addStep(e) {

        if(stepState.id.length > 0){
            await setFormState(prevState => {
                return {
                    ...prevState,
                    steps: [...formState.steps, {
                        number: stepState.id[0],
                        step: stepState.steps
                    }]
                }
            });

            stepState.id.shift()
        }
        
    }

    function submmit(e) {
        e.preventDefault();
    }

    return (
        <form className={s.full} onSubmit={submmit}>
            <span className={s.title}>Create recipe.</span>
            <div className={s.main}>
                <div className={s.container}>
                    <div className={s.form}>
                        <input className={s.input} placeholder="Name" onChange={handleOnChange} name="title" type="text" />
                        <textarea placeholder="Summary" className={s.textarea} onChange={handleOnChange} name="summary" id="" cols="30" rows="10"></textarea>
                        <input className={s.input} placeholder="Punctuation" onChange={handleOnChange} name="punctuation" type="number" max="100" min="0" />
                        <input className={s.input} placeholder="Healty level" onChange={handleOnChange} name="healtyLevel" type="number" max="100" min="0" />
                    </div>

                </div>
                <div className={s.stepsContainer}>
                    <div className={s.steps}>
                        {
                            formState.steps.length > 0 ? orderSteps().map(step => (
                                <div className={s.stepNumber} key={step.number}>
                                    Step {step.number}
                                    <button onClick={() => close(step.number)} className={s.close}>X</button>
                                </div>
                            )) : ""
                        }
                    </div>
                    <textarea onChange={handleOnChange} className={s.textarea} placeholder="Steps" name="steps" id="" cols="30" rows="10"></textarea>
                    <button onClick={addStep} className={s.addButton}>Add</button>
                </div>
            </div>
            <button type="submit" className={s.button}>Create</button>
            <Link to="/home">
                <span className={s.buttonBack}>Back to Home</span>
            </Link>

        </form>

    )

}