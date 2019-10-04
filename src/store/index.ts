import { combineReducers, createStore } from 'redux'
import desktop, { DesktopModel } from './desktop'

export type Store = {
  desktop: DesktopModel
}

const reducers = combineReducers({
  desktop
})

const store = createStore(reducers)

export default store