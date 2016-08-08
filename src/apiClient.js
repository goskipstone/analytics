import superagent from 'superagent'
import _ from 'lodash'

const methods = ['get', 'post', 'put', 'patch', 'del']

export default class ApiClient {
  constructor () {
    methods.forEach((method) => {
      this[method] = ({ params, data, headers } = {}) =>
        new Promise((resolve, reject) => {
          const url = `${process.env.API_ENDPOINT}`
          const request = superagent[method](url)
          request.set('Accept', 'application/json')
          if (method === 'post') {
            request.set('Content-Type', 'application/json')
          }
          if (params) {
            request.query(params)
          }
          if (data) {
            request.send(data)
          }
          if (headers) {
            _.forOwn(headers, (val, key) => request.set(key, val))
          }
          request.end((err, { body } = {}) => {
            if (err) {
              return reject(body || err)
            }
            return resolve(body)
          })
        })
    })
  }
}
