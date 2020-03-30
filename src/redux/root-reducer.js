import { combineReducers } from 'redux';
import speed from './speed.reducer'
import showBest from './switch-reducer';
import voice from './voice-reducer'
export default combineReducers({
    speed,
    showBest,
    voice

})