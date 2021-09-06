export interface IApplicantData {
  id: number
  avatar: string
  username: string
  githubURL?: string
  gitlabURL?: string
  bitbucketURL?: string
  linkedinURL?: string
  bio?: string
}

export interface IApplicationData {
  id: number
  user: IApplicantData
  position: {id: number; title: string; projectId: number}
}
