/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './to025/c2/file'
// prettier-ignore
import { Methods as Methods1 } from './to025/c2/file/_id@string'
// prettier-ignore
import { Methods as Methods2 } from './to025/c2/file/_id@string/attach'
// prettier-ignore
import { Methods as Methods3 } from './to025/c2/presentation/project'
// prettier-ignore
import { Methods as Methods4 } from './to025/c2/presentation/project/_id@string'
// prettier-ignore
import { Methods as Methods5 } from './to025/c2/service/auth'
// prettier-ignore
import { Methods as Methods6 } from './to025/c2/service/auth/_token@string'
// prettier-ignore
import { Methods as Methods7 } from './to025/c2/service/hello'
// prettier-ignore
import { Methods as Methods8 } from './to025/c2/show/project/_user@string/_project@string'
// prettier-ignore
import { Methods as Methods9 } from './to025/c2/show/project/_user@string/_project@string/_token@string'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.plain.timeoff.today/api/v1' : baseURL).replace(/\/$/, '')
  const PATH0 = '/to025/c2/file'
  const PATH1 = '/attach'
  const PATH2 = '/to025/c2/presentation/project'
  const PATH3 = '/to025/c2/service/auth'
  const PATH4 = '/to025/c2/service/hello'
  const PATH5 = '/to025/c2/show/project'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    to025: {
      c2: {
        file: {
          _id: (val3: string) => {
            const prefix3 = `${PATH0}/${val3}`

            return {
              attach: {
                /**
                 * @returns A array of auth
                 */
                post: (option: { body: Methods2['post']['reqBody'], headers?: Methods2['post']['reqHeaders'], config?: T }) =>
                  fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix3}${PATH1}`, POST, option, 'FormData').json(),
                /**
                 * @returns A array of auth
                 */
                $post: (option: { body: Methods2['post']['reqBody'], headers?: Methods2['post']['reqHeaders'], config?: T }) =>
                  fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix3}${PATH1}`, POST, option, 'FormData').json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH1}`
              },
              /**
               * @returns A array of auth
               */
              get: (option?: { headers?: Methods1['get']['reqHeaders'], config?: T }) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns A array of auth
               */
              $get: (option?: { headers?: Methods1['get']['reqHeaders'], config?: T }) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              /**
               * @returns A array of auth
               */
              put: (option: { body: Methods1['put']['reqBody'], headers?: Methods1['put']['reqHeaders'], config?: T }) =>
                fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns A array of auth
               */
              $put: (option: { body: Methods1['put']['reqBody'], headers?: Methods1['put']['reqHeaders'], config?: T }) =>
                fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              /**
               * @returns A array of auth
               */
              delete: (option?: { headers?: Methods1['delete']['reqHeaders'], config?: T }) =>
                fetch<Methods1['delete']['resBody'], BasicHeaders, Methods1['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns A array of auth
               */
              $delete: (option?: { headers?: Methods1['delete']['reqHeaders'], config?: T }) =>
                fetch<Methods1['delete']['resBody'], BasicHeaders, Methods1['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
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
        presentation: {
          project: {
            _id: (val4: string) => {
              const prefix4 = `${PATH2}/${val4}`

              return {
                /**
                 * @returns A array of auth
                 */
                get: (option?: { headers?: Methods4['get']['reqHeaders'], config?: T }) =>
                  fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns A array of auth
                 */
                $get: (option?: { headers?: Methods4['get']['reqHeaders'], config?: T }) =>
                  fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                /**
                 * @returns A array of auth
                 */
                put: (option: { body: Methods4['put']['reqBody'], headers?: Methods4['put']['reqHeaders'], config?: T }) =>
                  fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, prefix4, PUT, option).json(),
                /**
                 * @returns A array of auth
                 */
                $put: (option: { body: Methods4['put']['reqBody'], headers?: Methods4['put']['reqHeaders'], config?: T }) =>
                  fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, prefix4, PUT, option).json().then(r => r.body),
                /**
                 * @returns A array of auth
                 */
                delete: (option?: { headers?: Methods4['delete']['reqHeaders'], config?: T }) =>
                  fetch<Methods4['delete']['resBody'], BasicHeaders, Methods4['delete']['status']>(prefix, prefix4, DELETE, option).json(),
                /**
                 * @returns A array of auth
                 */
                $delete: (option?: { headers?: Methods4['delete']['reqHeaders'], config?: T }) =>
                  fetch<Methods4['delete']['resBody'], BasicHeaders, Methods4['delete']['status']>(prefix, prefix4, DELETE, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`
              }
            },
            /**
             * @returns A array of auth
             */
            get: (option?: { headers?: Methods3['get']['reqHeaders'], config?: T }) =>
              fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json(),
            /**
             * @returns A array of auth
             */
            $get: (option?: { headers?: Methods3['get']['reqHeaders'], config?: T }) =>
              fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
            /**
             * @returns A array of auth
             */
            post: (option: { body: Methods3['post']['reqBody'], headers?: Methods3['post']['reqHeaders'], config?: T }) =>
              fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option).json(),
            /**
             * @returns A array of auth
             */
            $post: (option: { body: Methods3['post']['reqBody'], headers?: Methods3['post']['reqHeaders'], config?: T }) =>
              fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH2}`
          }
        },
        service: {
          auth: {
            _token: (val4: string) => {
              const prefix4 = `${PATH3}/${val4}`

              return {
                /**
                 * @returns A array of auth
                 */
                get: (option?: { headers?: Methods6['get']['reqHeaders'], config?: T }) =>
                  fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns A array of auth
                 */
                $get: (option?: { headers?: Methods6['get']['reqHeaders'], config?: T }) =>
                  fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                /**
                 * @returns A array of auth
                 */
                put: (option?: { headers?: Methods6['put']['reqHeaders'], config?: T }) =>
                  fetch<Methods6['put']['resBody'], BasicHeaders, Methods6['put']['status']>(prefix, prefix4, PUT, option).json(),
                /**
                 * @returns A array of auth
                 */
                $put: (option?: { headers?: Methods6['put']['reqHeaders'], config?: T }) =>
                  fetch<Methods6['put']['resBody'], BasicHeaders, Methods6['put']['status']>(prefix, prefix4, PUT, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`
              }
            },
            /**
             * @returns A array of auth
             */
            get: (option?: { headers?: Methods5['get']['reqHeaders'], config?: T }) =>
              fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH3, GET, option).json(),
            /**
             * @returns A array of auth
             */
            $get: (option?: { headers?: Methods5['get']['reqHeaders'], config?: T }) =>
              fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
            /**
             * @returns A array of auth
             */
            post: (option: { body: Methods5['post']['reqBody'], headers?: Methods5['post']['reqHeaders'], config?: T }) =>
              fetch<Methods5['post']['resBody'], BasicHeaders, Methods5['post']['status']>(prefix, PATH3, POST, option).json(),
            /**
             * @returns A array of auth
             */
            $post: (option: { body: Methods5['post']['reqBody'], headers?: Methods5['post']['reqHeaders'], config?: T }) =>
              fetch<Methods5['post']['resBody'], BasicHeaders, Methods5['post']['status']>(prefix, PATH3, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH3}`
          },
          hello: {
            /**
             * @returns A array of auth
             */
            get: (option?: { headers?: Methods7['get']['reqHeaders'], config?: T }) =>
              fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, PATH4, GET, option).json(),
            /**
             * @returns A array of auth
             */
            $get: (option?: { headers?: Methods7['get']['reqHeaders'], config?: T }) =>
              fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH4}`
          }
        },
        show: {
          project: {
            _user: (val4: string) => {
              const prefix4 = `${PATH5}/${val4}`

              return {
                _project: (val5: string) => {
                  const prefix5 = `${prefix4}/${val5}`

                  return {
                    _token: (val6: string) => {
                      const prefix6 = `${prefix5}/${val6}`

                      return {
                        /**
                         * @returns A array of auth
                         */
                        get: (option?: { config?: T }) =>
                          fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, prefix6, GET, option).json(),
                        /**
                         * @returns A array of auth
                         */
                        $get: (option?: { config?: T }) =>
                          fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, prefix6, GET, option).json().then(r => r.body),
                        $path: () => `${prefix}${prefix6}`
                      }
                    },
                    /**
                     * @returns A array of auth
                     */
                    get: (option?: { config?: T }) =>
                      fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns A array of auth
                     */
                    $get: (option?: { config?: T }) =>
                      fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    /**
                     * @returns A array of auth
                     */
                    post: (option: { body: Methods8['post']['reqBody'], config?: T }) =>
                      fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(prefix, prefix5, POST, option).json(),
                    /**
                     * @returns A array of auth
                     */
                    $post: (option: { body: Methods8['post']['reqBody'], config?: T }) =>
                      fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(prefix, prefix5, POST, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`
                  }
                }
              }
            }
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
