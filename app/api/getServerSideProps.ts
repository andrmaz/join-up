import axios from 'axios'
import {GetServerSidePropsContext} from 'next'
import {Params} from 'next/dist/next-server/server/router'

import {parseCookies} from '@utils/parseCookies'
import {ParsedUrlQuery} from 'querystring'

import type {
  ProjectResponseType,
  PositionsResponseType,
} from 'app/types/response'

import type {TokenPropsType, ProjectPropsType} from 'app/types/props'

export async function getSessionTokenProps(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<TokenPropsType> {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

  //* If no user, redirect to login
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  //* return user token
  return {
    props: {
      token,
    },
  }
}

export async function getProjectProps(
  context: GetServerSidePropsContext
): Promise<ProjectPropsType> {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

  //* project id parameter will be sent as a query parameter (slug) to the page
  const {slug} = context.params as Params

  //* If no user, redirect to login
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  //* If there is a user,
  const {
    data: {project},
  } = await axios.get<ProjectResponseType>(`/project/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    data: {positions},
  } = await axios.get<PositionsResponseType>(`/position/project/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return project data
  return {
    props: {
      project,
      positions,
    },
  }
}
