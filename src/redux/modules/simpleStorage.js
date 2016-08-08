const prefix = 'benjamintatum/simpleStorage'
export const STORE_TEXT = `${prefix}/STORE_TEXT`

export function storeText (text) {
  return {
    type: STORE_TEXT,
    payload: { text },
    storage: {
      [STORE_TEXT]: text
    }
  }
}

const intitialState = {
  text: ''
}

export function reducer (state = intitialState, action) {
  switch (action.type) {
    case STORE_TEXT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
