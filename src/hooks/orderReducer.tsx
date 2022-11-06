import { order, orderType } from "./types";


const orderReducer = (state:orderType, action:{
    type: string;
    payload: any;
}) => {
    switch(action.type){    
        case 'SET_MEAL':
            return {        
                ...state,
                mealType: action.payload.value,
            };
        case 'SET_PEOPLE':
            return {
                ...state,
                noOfPeople: action.payload.value,
            };
        case 'SET_RESTAURANT':
            return {
                ...state,
                restaurant: action.payload.value,
            };
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.payload.value,
            };
        default:
            throw new Error("No action matching");
    }
}

export default orderReducer;