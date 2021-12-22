import { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import { createRecipe } from "../../reducer/actions";
import s from "./newRecipe.module.css";


 function NewRecipe(props) {

    const [formState, setFormState] = useState({
        title: "",
        summary: "",
        punctuation: 0,
        healtyLevel: 0,
        steps: [],
        types: []
    });
    const [stepState, setStepState] = useState({
        steps: "",
        id: [1,2,3,4,5,6,7,8,9,10]
    });

    const [typeState, setTypeState] = useState({
        value: "",
        types: []
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
            setStepState(prevState => {
                return {
                    ...prevState,
                    steps: ""
                }
            })
            stepState.id.shift()
        }
    }

    function handleOnChangeType(e){

        setTypeState(prevState =>{
            return{
                ...prevState,
                value: e.target.value
            }
        })
    }

    function addType(){

        let typesNames = ["Gluten Free","Laco-Ovo-Vegetarian","Vegan","Pescatarian","Paleo","Primal","Low FODMAP","Dairy Free","Whole30"];
        
        for (let i = 0; i < typesNames.length; i++) {
            if(i+1 === Number(typeState.value)){
                setTypeState(prevState =>{
                    return{
                        ...prevState,
                        types: [...typeState.types,typesNames[i]]
                    }
                })
            }
        }
    }

    function typeClose(name){

        setTypeState(prevState =>{
            return {
                ...prevState,
                types: typeState.types.filter(t => t !== name)
            }
        })

    }

    async function submmit(e) {
        e.preventDefault();
       await props.createRecipe(formState);
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
                    <textarea onChange={handleOnChange} value={stepState.steps} className={s.textarea} placeholder="Steps" name="steps" id="" cols="30" rows="10"></textarea>
                    <button onClick={addStep} type="button" className={s.addButton}>Add</button>
                </div>
                <div className={s.typesContainer}>
                    <div className={s.types}>
                        {
                            typeState.types.length > 0 ? typeState.types.map(type =>(
                                <div className={s.typeName} key={type}>
                                    {type}
                                    <button type="button" onClick={()=> typeClose(type)} className={s.close}>X</button>
                                </div>
                            )) : ""
                        }
                    </div>
                <select onChange={handleOnChangeType} className={s.options}  name="type" id="type">
                        <option value={1}>Gluten Free</option>
                        <option value={2}>Lacto-Ovo-Vegetarian</option>
                        <option value={3}>Vegan</option>
                        <option value={4}>Pescatarian</option>
                        <option value={5}>Paleo</option>
                        <option value={6}>Primal</option>
                        <option value={7}>Low FODMAP</option>
                        <option value={8}>Dairy Free</option>
                        <option value={9}>Whole30</option>
                    </select>
                    <button type="button" onClick={addType} className={s.addButton}>Add</button>
                </div>
            </div>
            <button type="submit" className={s.button}>Create</button>
            <Link to="/home">
                <span className={s.buttonBack}>Back to Home</span>
            </Link>

        </form>

    )

}


export default connect(null, {createRecipe} )(NewRecipe)