/* eslint-disable */
import * as Types from '../../@types'

export type Methods = {
  get: {
    query: {
      fields: string
      access_token: string
    }

    status: 200
    resBody: Types.Any

    resHeaders: {
      'x-next': string
    }
  }
}
