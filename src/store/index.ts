import { combineReducers, createStore } from 'redux'
import home from './home'


const reducers = combineReducers({
  home
})

const store = createStore(reducers)

export default store