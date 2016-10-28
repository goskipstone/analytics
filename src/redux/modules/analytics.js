
const { REDUX_PREFIX } = process.env
export const SET_CHART_DATA = `${REDUX_PREFIX}/app/setChartData`
export const PARENT_MEDIA_REPORT = `${REDUX_PREFIX}/analytics/parentMediaReport`
export const SET_HIGHLIGHT = `${REDUX_PREFIX}/analytics/setHighlight`

const intitialState = {
  parentMediaReport: [],
  dataType: 'requestCount',
  highlight: null
}

export function reducer (state = intitialState, action) {
  switch (action.type) {
    case SET_HIGHLIGHT:
    case SET_CHART_DATA:
      return { ...state, ...action.payload }
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

export function setDataType (dataType) {
  return {
    type: SET_CHART_DATA,
    payload: { dataType }
  }
}

export function setHighlight (highlight) {
  return {
    type: SET_HIGHLIGHT,
    payload: { highlight }
  }
}
