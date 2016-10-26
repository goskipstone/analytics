
const { REDUX_PREFIX } = process.env
export const PARENT_MEDIA_REPORT = `${REDUX_PREFIX}/analytics/parentMediaReport`

const intitialState = {
  parentMediaReport: []
}

export function reducer (state = intitialState, action) {
  switch (action.type) {
    case '@redux-conn/LOAD_SUCCESS': {
      const { data, key } = action.payload
      switch (key) {
        case PARENT_MEDIA_REPORT:
          return {
            ...state,
            parentMediaReport: data
          }
        default:
          return state
      }
    }
    default:
      return state
  }
}

export function parentMediaReport ({ location: { query }, helpers: { client }, store: { getState } }) {
  const { app: { token } } = getState()
  const params = { token }
  return client.get(`parentMediaReport/${query.org}`, { params })
}
