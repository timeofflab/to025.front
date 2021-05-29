/* eslint-disable */
import * as Types from '../../../@types'

export type Methods = {
  get: {
    reqHeaders?: {
      'X-To985-Secret'?: string
      'X-To985-Token'?: string
    }

    status: 200
    resBody: Types.Any
  }

  post: {
    status: 201
    resBody: Types.Any
    reqBody: Types.Any
  }
}
