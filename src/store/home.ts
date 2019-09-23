

enum HomeActions {
  GET_DATA = 'GET_DATA'
}

function reducer(state = [], action) {
  switch (action.type) {
    case HomeActions.GET_DATA:
      return [
        ...state,
      ]
    default:
      return state
  }
}

export {
  reducer
}

export default reducer