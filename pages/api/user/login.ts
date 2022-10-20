import type {NextApiRequest, NextApiResponse} from 'next'

import {IAuthUser} from 'app/types/user'
import {UserResponseType} from 'app/types/response'

type ResponseData = UserResponseType | {error: string}

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
        .status(200)
        .json({message: 'Successfully signed in', status: 200, user})
    } else {
      // Handle any other HTTP method
    }
  } catch (err) {
    res.status(500).json({error: 'failed to load data'})
  }
}
