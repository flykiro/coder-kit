import { Action, Reducer, AnyAction } from "redux"
import { description as CSSColorConverter} from '../components/CSSColorConverter'
import { description as BillsInput} from '../components/BillsInput'
import { ApplicationCodes } from '../constants'

type Card = {
  key: string | number;
  title: string;
  appCode: string;
  component: React.ComponentType
}

const applications: Card[] = [
  CSSColorConverter,
  BillsInput,
]

export type DesktopModel = {
  applications: Card[],
  cards: Card[]
}

export enum types {
  GET_DATA = 'GET_DATA',
  SHOW_CARD = 'SHOW_CARD',
  HIDE_CARD = 'HIDE_CARD',
  MINIMIZE_CARD = 'MINIMIZE_CARD'
}

const defaultState = {
  applications,
  cards: []
}

const reducer: Reducer<DesktopModel> = (state: DesktopModel = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_CARD:
      const card = applications.find(item => item.appCode === action.payload.appCode)
      if (card) {
        return {
          ...state,
          cards: state.cards.concat(card)
        }
      }

    case types.HIDE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card, index) => index !== action.payload.index)
      }

    case types.MINIMIZE_CARD:
    case types.GET_DATA:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default reducer