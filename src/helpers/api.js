
import { default as ApiClient } from 'api-bro'

const options = {
  pathPrefix: process.env.API_PATH
}

export default new ApiClient(options)
