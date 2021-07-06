import axios from 'axios'
import {GetServerSidePropsContext} from 'next'
import {Params} from 'next/dist/next-server/server/router'

import {fetchTechnologiesWithToken} from '@api/fetchWithToken'
import {parseCookies} from '@utils/parseCookies'
import {ParsedUrlQuery} from 'querystring'

import type {
  TechnologiesResponseType,
  LanguagesResponseType,
  ProjectResponseType,
  PositionsResponseType,
} from 'app/types/response'

import type {
  SessionType,
  TechnologiesAndLanguagesPropsType,
  SessionTokenPropsType,
  ProjectAndPositionsPropsType,
  TokenAndOptionsPropsType,
  TokenAndTechnologiesPropsType,
} from 'app/types/props'

export async function getTechnologiesAndLanguages(): Promise<
  SessionType<TechnologiesAndLanguagesPropsType>
> {
  const {
    data: {technologies},
  } = await axios.get<TechnologiesResponseType>('/technology')
  const {
    data: {languages},
  } = await axios.get<LanguagesResponseType>('/language')

  return {
    props: {
      technologies,
      languages,
    },
  }
}

export async function getSessionTokenProps(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<SessionType<SessionTokenPropsType>> {
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

export async function getProjectAndPositions(
  context: GetServerSidePropsContext
): Promise<SessionType<ProjectAndPositionsPropsType>> {
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

export async function getTokenAndOptions(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<SessionType<TokenAndOptionsPropsType>> {
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

  //* If there is a user,
  const {technologies: options} = await fetchTechnologiesWithToken(token)

  //* return token and technologies
  return {
    props: {
      token,
      options,
    },
  }
}

export async function getTokenAndTechnologies(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<SessionType<TokenAndTechnologiesPropsType>> {
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

  //* If there is a user,
  const {technologies} = await fetchTechnologiesWithToken(token)

  //* return technologies and user token
  return {
    props: {
      token,
      technologies,
    },
  }
}
