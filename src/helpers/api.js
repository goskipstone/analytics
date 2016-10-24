
import { default as btoa } from 'btoa'
import { default as ApiClient } from 'api-bro'

const options = {
  pathPrefix: process.env.API_PATH,
  globalHeaders: {
    Authorization: `Basic ${btoa('testadmin:Skipstone20')}`
  }
}

export default new ApiClient(options)
