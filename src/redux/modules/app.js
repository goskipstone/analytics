
const { REDUX_PREFIX } = process.env
import { default as client } from 'helpers/api'
export const GET_TOKEN = `${REDUX_PREFIX}/app/getToken`

const intitialState = {
  token: null
}

export function reducer (state = intitialState, action) {
  switch (action.type) {
    case '@redux-conn/LOAD_SUCCESS':
      const { data, key } = action.payload
      switch (key) {
        case GET_TOKEN:
          return {
            ...state,
            token: data.token
          }
        default:
          return state
      }
    default:
      return state
  }
}

export function getToken ({ store }) {
  const { token } = store.getState()
  if (token) {
    return null
  }
  return client.get('userToken/testadmin?password=Skipstone20')
}
