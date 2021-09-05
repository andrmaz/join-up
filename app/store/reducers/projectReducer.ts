import type {
  ProjectActionsType,
  ProjectContextType,
  IProjectData,
} from 'app/types/project'
import {Actions} from 'app/types/project'

export function projectReducer(
  state: ProjectContextType,
  action: ProjectActionsType
): ProjectContextType {
  let index: number
  let projectCopy: IProjectData | undefined
  let projectsCopy: IProjectData[]
  let updatedProject: IProjectData
  let filteredProjects: IProjectData[]
  let updatedProjects: IProjectData[]
  switch (action.type) {
    case Actions.add:
      projectsCopy = [...state.projects]
      updatedProjects = [...projectsCopy, action.payload]
      return {
        ...state,
        projects: updatedProjects,
      }
    case Actions.remove:
      index = state.projects.findIndex(
        (project: IProjectData) => project.id === action.payload
      )
      projectsCopy = [...state.projects]
      projectsCopy.splice(index, 1)
      return {
        ...state,
        projects: projectsCopy,
      }
    case Actions.edit:
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
        ...state,
        projects: updatedProjects,
      }
    case Actions.persist:
      //* State will be an empty Array
      projectsCopy = [...state.projects]
      //* create a fresh, new store instance on every request
      updatedProjects = action.payload.concat(
        //* Merging objects arrays without creating duplicate objects
        projectsCopy.filter(
          ({id}) => !action.payload.find(project => project.id === id)
        )
      )
      return {
        ...state,
        projects: updatedProjects,
      }
    case Actions.clear:
      return {
        ...state,
        projects: [],
      }
    default: {
      throw new Error(`Unhandled type at ${action} action`)
    }
  }
}
