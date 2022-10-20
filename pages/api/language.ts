import type {NextApiRequest, NextApiResponse} from 'next'

import {LanguagesResponseType} from 'app/types/response'
import {SelectOptionsType} from 'app/types/form'

type ResponseData = LanguagesResponseType | {error: string}

const languages: SelectOptionsType[] = [
  {id: 1, label: 'Italian'},
  {id: 2, label: 'English'},
  {id: 3, label: 'Spanish'},
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): void {
  try {
    if (req.method === 'GET') {
      // Process a GET request
      res.status(200).json({
        message: 'Successfully load languages',
        status: 200,
        languages,
      })
    } else {
      // Handle any other HTTP method
    }
  } catch (err) {
    res.status(500).json({error: 'failed to load data'})
  }
}
