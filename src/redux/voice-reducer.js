


const Voice = (state = false, action) => {

    switch (action.type) {
        case 'SET_VOICE': return action.payload;
        
        default: return state;
    }



};


export default Voice;