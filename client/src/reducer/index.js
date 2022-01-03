

const initialState= {
   recipes: [],
   recipeDetail: [],
    responseCreate: []
}



function rootReducer(state = initialState, action) {

    if(action.type === "GET_RECIPES"){

        return {
            ...state,
            recipes: action.payload
        }
    }
    if(action.type === "GET_RECIPE_BY_ID"){

        return {
            ...state,
            recipeDetail: action.payload
        }
    }
    if(action.type === "CREATE_RECIPE"){

        return {
            ...state,
            responseCreate: action.payload
        }

    }
 

    return state;
    


}

export default rootReducer;