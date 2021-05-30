/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    reqHeaders?: {
      /** Auth Token */
      'X-To025-Auth-Token'?: string
    }

    status: 200
    /** A array of auth */
    resBody: Types.Any
  }
}
