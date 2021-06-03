/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './_user@string/_project@string'
// prettier-ignore
import { Methods as Methods1 } from './_user@string/_project@string/_token@string'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.plain.timeoff.today/api/v1' : baseURL).replace(/\/$/, '')
  const PATH0 = '/to025/c2/view/project'
  const GET = 'GET'
  const POST = 'POST'

  return {
    _user: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        _project: (val1: string) => {
          const prefix1 = `${prefix0}/${val1}`

          return {
            _token: (val2: string) => {
              const prefix2 = `${prefix1}/${val2}`

              return {
                /**
                 * @returns A array of auth
                 */
                get: (option?: { config?: T }) =>
                  fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json(),
                /**
                 * @returns A array of auth
                 */
                $get: (option?: { config?: T }) =>
                  fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix2}`
              }
            },
            /**
             * @returns A array of auth
             */
            get: (option?: { config?: T }) =>
              fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix1, GET, option).json(),
            /**
             * @returns A array of auth
             */
            $get: (option?: { config?: T }) =>
              fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
            /**
             * @returns A array of auth
             */
            post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
              fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, prefix1, POST, option).json(),
            /**
             * @returns A array of auth
             */
            $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
              fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, prefix1, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}`
          }
        }
      }
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
