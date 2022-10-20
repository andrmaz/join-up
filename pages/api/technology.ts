import type {NextApiRequest, NextApiResponse} from 'next'

import {SelectOptionsType} from 'app/types/form'
import {TechnologiesResponseType} from 'app/types/response'

type ResponseData = TechnologiesResponseType | {error: string}

const technologies: SelectOptionsType[] = [
  {id: 1, label: 'JavaScript'},
  {id: 2, label: 'TypeScript'},
  {id: 3, label: 'Rust'},
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): void {
  try {
    if (req.method === 'GET') {
      // Process a GET request
      res.status(200).json({
        message: 'Successfully load technologies',
        status: 200,
        technologies,
      })
    } else {
      // Handle any other HTTP method
    }
  } catch (err) {
    res.status(500).json({error: 'failed to load data'})
  }
}
