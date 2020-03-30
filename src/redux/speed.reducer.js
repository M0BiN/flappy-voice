

const isNeededReducer = (state = 1, action) => {

    switch (action.type) {
        case 'SET_SPEED': return action.payload;
        
        default: return state;
    }



};


export default isNeededReducer;