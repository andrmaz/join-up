import {ProjectActions, ProjectState, IProjectData} from 'app/types/project'

export function projectReducer(
  state: ProjectState,
  action: ProjectActions
): ProjectState {
  let index: number
  let projectCopy: IProjectData
  let projectsCopy: IProjectData[]
  let updatedProject: IProjectData
  let filteredProjects: IProjectData[]
  let updatedProjects: IProjectData[]
  switch (action.type) {
    case 'add':
      projectsCopy = [...state.projects]
      updatedProjects = [...projectsCopy, action.payload]
      return {
        ...state,
        projects: updatedProjects,
      }
    case 'remove':
      index = state.projects.findIndex(
        (project: IProjectData) => project.id === action.payload
      )
      projectsCopy = [...state.projects]
      projectsCopy.splice(index, 1)
      return {
        ...state,
        projects: projectsCopy,
      }
    case 'edit':
      projectCopy = state.projects.find(
        (project: IProjectData) => project.id === action.payload.id
      )
      updatedProject = Object.assign({...projectCopy}, action.payload)
      projectsCopy = [...state.projects]
      filteredProjects = projectsCopy.filter(
        (project: IProjectData) => project.id !== updatedProject.id
      )
      updatedProjects = [...filteredProjects, updatedProject]
      return {
        projects: updatedProjects,
      }
    case 'persist':
      //* State will be an empty Array
      projectsCopy = [...state.projects]
      //* create a fresh, new store instance on every request
      updatedProjects = [...projectsCopy, ...action.payload]
      return {
        ...state,
        projects: updatedProjects,
      }
    case 'clear':
      return {
        ...state,
        projects: [],
      }
    default: {
      throw new Error(`Unhandled type at ${action} action`)
    }
  }
}
