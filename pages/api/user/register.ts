import type {NextApiRequest, NextApiResponse} from 'next'

import {IAuthUser} from 'app/types/user'
import {UserResponseType} from 'app/types/response'

type ResponseData = UserResponseType | {error: {message: string}}

const user: IAuthUser = {
  id: 0,
  username: '',
  email: '',
  avatar: '',
  languages: [],
  technologies: [],
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): void {
  try {
    if (req.method === 'POST') {
      // Process a POST request
      res
        .status(201)
        .json({message: 'Successfully registered', status: 201, user})
    } else {
      // Handle any other HTTP method
    }
  } catch (err) {
    res.status(500).json({error: {message: 'Failed to load data'}})
  }
}
