

const initialState= {
   recipes: []
}



function rootReducer(state = initialState, action) {

    if(action.type === "GET_RECIPES"){

        return {
            ...state,
            recipes: action.payload
        }

    }
 

    return state;
    


}

export default rootReducer;