import type {NextApiRequest, NextApiResponse} from 'next'

import {IApplicationData} from 'app/types/application'
import {IPositionData} from 'app/types/position'
import {IProjectData} from 'app/types/project'

type ResponseData =
  | {
      projects: IProjectData[]
      position: IPositionData[]
      applications: IApplicationData[]
    }
  | {error: string}

const data = {projects: [], position: [], applications: []}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): void {
  try {
    if (req.method === 'GET') {
      // Process a GET request
      res.status(200).json(data)
    } else {
      // Handle any other HTTP method
    }
  } catch (err) {
    res.status(500).json({error: 'failed to load data'})
  }
}
