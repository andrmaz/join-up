import axios, {AxiosInstance} from 'axios'
import {GetServerSidePropsContext} from 'next'

const publicFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const privateFetch = (context: GetServerSidePropsContext): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:
      context &&
      context.req &&
      context.req.headers &&
      context.req.headers.cookie
        ? {cookie: context.req.headers.cookie}
        : undefined,
  })

export {publicFetch, privateFetch}
