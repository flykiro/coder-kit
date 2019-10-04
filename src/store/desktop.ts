import { Action, Reducer } from "redux"


enum DesktopActions {
  GET_DATA = 'GET_DATA'
}

export type DesktopModel = {
  cards: any[]
}

const defaultState: DesktopModel = {
  cards: []
}

const reducer: Reducer<DesktopModel> = (state: DesktopModel = defaultState, action) => {
  switch (action.type) {
    case DesktopActions.GET_DATA:
      return {
        ...state,
      }
    default:
      return state
  }
}

export {
  reducer
}

export default reducer