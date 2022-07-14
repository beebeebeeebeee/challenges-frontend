import { ActionModel } from "./model/action.model"
import { StateModel } from "./model/state.model"

const initState: StateModel = {
    lang: "zh-HK",
    isMobile: window.innerWidth < 680
}

export enum StateAction {
    SET_IS_MOBILE,
    SET_TOKEN,
    SET_REMEMBER,
    SET_LANG
}

export const reducer = (state: StateModel = initState, action: ActionModel): StateModel => {
    switch (action.type as StateAction) {
        case StateAction.SET_IS_MOBILE:
            return { ...state, isMobile: action.data }
        case StateAction.SET_TOKEN:
            return { ...state, token: action.data }
        case StateAction.SET_REMEMBER:
            return { ...state, remember: action.data }
        case StateAction.SET_LANG:
            return { ...state, lang: action.data }
        default:
            return state
    }
}