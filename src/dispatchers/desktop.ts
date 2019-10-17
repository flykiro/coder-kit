import store from '../store'
import { types as desktopTypes } from '../store/desktop'

export const showCard  = (appCode) => {
  store.dispatch({
    type: desktopTypes.SHOW_CARD,
    payload: {
      appCode
    }
  })
}

export const hideCard = (index: number) => {
  store.dispatch({
    type: desktopTypes.HIDE_CARD,
    payload: {
      index
    }
  })
}