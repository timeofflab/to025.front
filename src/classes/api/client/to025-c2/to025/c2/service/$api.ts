/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './auth'
// prettier-ignore
import { Methods as Methods1 } from './auth/_token@string'
// prettier-ignore
import { Methods as Methods2 } from './hello'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.plain.timeoff.today/api/v1' : baseURL).replace(/\/$/, '')
  const PATH0 = '/to025/c2/service/auth'
  const PATH1 = '/to025/c2/service/hello'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    auth: {
      _token: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          /**
           * @returns A array of auth
           */
          get: (option?: { headers?: Methods1['get']['reqHeaders'], config?: T }) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns A array of auth
           */
          $get: (option?: { headers?: Methods1['get']['reqHeaders'], config?: T }) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * @returns A array of auth
           */
          put: (option?: { headers?: Methods1['put']['reqHeaders'], config?: T }) =>
            fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns A array of auth
           */
          $put: (option?: { headers?: Methods1['put']['reqHeaders'], config?: T }) =>
            fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns A array of auth
       */
      get: (option?: { headers?: Methods0['get']['reqHeaders'], config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * @returns A array of auth
       */
      $get: (option?: { headers?: Methods0['get']['reqHeaders'], config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      /**
       * @returns A array of auth
       */
      post: (option: { body: Methods0['post']['reqBody'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * @returns A array of auth
       */
      $post: (option: { body: Methods0['post']['reqBody'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    hello: {
      /**
       * @returns A array of auth
       */
      get: (option?: { headers?: Methods2['get']['reqHeaders'], config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH1, GET, option).json(),
      /**
       * @returns A array of auth
       */
      $get: (option?: { headers?: Methods2['get']['reqHeaders'], config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
