

const isNeededReducer = (state = false, action) => {

    switch (action.type) {
        case 'SET_SHOW_BEST': return action.payload;
        
        default: return state;
    }



};


export default isNeededReducer;