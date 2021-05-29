/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from './to985/_siteCd@string/contact'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://to985.api.timeofflab.com/api/v1' : baseURL).replace(/\/$/, '')
  const PATH0 = '/to985'
  const PATH1 = '/contact'
  const GET = 'GET'
  const POST = 'POST'

  return {
    to985: {
      _siteCd: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          contact: {
            get: (option?: { headers?: Methods0['get']['reqHeaders'], config?: T }) =>
              fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, `${prefix1}${PATH1}`, GET, option).json(),
            $get: (option?: { headers?: Methods0['get']['reqHeaders'], config?: T }) =>
              fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, `${prefix1}${PATH1}`, GET, option).json().then(r => r.body),
            post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
              fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, `${prefix1}${PATH1}`, POST, option).json(),
            $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
              fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, `${prefix1}${PATH1}`, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH1}`
          }
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
