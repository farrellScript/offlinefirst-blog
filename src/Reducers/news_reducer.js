import {
    UPDATE_STORE,
    UPDATE_CURRENT,
    GET_BY_SLUG,
    SEND_ROUTER_PROPS
} from '../actions/types'

const DEFAULT_STATE = {
    allItems: [],
    currentItem: {
        id: "",
        date: "",
        title: "",
        body: "",
        url: "",
        slug: ""

    }
}

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SEND_ROUTER_PROPS: 
            return {...state , currentItem: action.payload}

        case UPDATE_STORE:
            return { ...state,
                allItems: action.payload, 
            }
        case UPDATE_CURRENT: 
            return {
                ...state, currentItem: action.payload
            }
        case GET_BY_SLUG:
            return { ...state,
                currentItem: action.payload
            }
        default:
            return state
    }
}