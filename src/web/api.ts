import axios from 'axios'
import { DetailWorkspace } from './components/WorkspaceDetails'



const BASE_URL = 'http://localhost:8080'

/** The API for the app, for querying, creating and updating workspaces */
class DosspaceApi {
  /** Returns the ID and title of every existing workspace */
  static async getWorkspaces() {
    try {
      const req = await axios.get(BASE_URL)
      const { workspaces } = req.data
      return workspaces

    } catch (err) {
      throw new Error('Unable to fetch workspaces')

    }
  }

  /** Returns the details about the given workspace ID */
  static async getWorkspace(workspaceId: string): Promise<DetailWorkspace> {
    try {
      const req = await axios.get(`${BASE_URL}/${workspaceId}`)
      const { workspace } = req.data
      return workspace

    } catch (err) {
      throw new Error('Unable to fetch workspace')

    }
  }

  /**GECKO add workspace table to existing record */
  static async addWorkspaceTable(workspaceId: string, build: string, order: string, cost: string, description: string): Promise<DetailWorkspace> { 
    try {
      const req = await axios.get(`${BASE_URL}/${workspaceId}/add?build=${build}&order=${order}&cost=${cost}&description=${description}`);
      const { workspace } = req.data      
      return workspace

    } catch (err) {
      throw new Error('[AWT]Unable to add table to workspace')

    }
  }

}

export default DosspaceApi

