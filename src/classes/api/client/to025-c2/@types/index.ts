/* eslint-disable */
import type { ReadStream } from 'fs'

export type Any = {
  any: string | null
}

export type CsrfToken = {
  token: string
  captcha: number
  action: string
  usedAt: string
  limitedAT: string
  createdAt: string
  updatedAt: string
}

export type ErrorMessageBag = {
  name: string
  messages: string[]
}

export type ErrorMessage = {
  code: string
  message: string
  errors: ErrorMessageBag[]
}

export type ListInfo = {
  page: number
  pageMax: number
  start: number
  end: number
  allCount: number | null
  filterCount: number | null
  limit: number | null
}

export type UploadFile = {
  token: string
  file: File | ReadStream
}
