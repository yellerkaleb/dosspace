import { all, findOne, insert, update,reset,addTable } from './db/db'
import { Workspace } from './types'
import { v4 as uuidv4 } from 'uuid'

/** Returns a list of all workspaces in the database */
export function getWorkspaces(dbString: string): Workspace[] {
  return all(dbString, 'workspaces')
}

/** Returns a single workspace from the database */
export function getWorkspace(dbString: string, id: string): Workspace {
  return findOne(dbString, 'workspaces', id)
}

/** Create a workspace in the database */
export function createWorkspace(dbString: string): Workspace {
  const workspace: Workspace = {
    id: uuidv4(),
    title: '',
    buildShipments: [
      {
        id: uuidv4(),
        buildNumber: '',
        // Initialize the workspace with a single empty build shipment
        shipments: [{ id: uuidv4(), description: '', orderNumber: '', cost: 0 }],
      },
    ],
  }
  insert(dbString, 'workspaces', workspace)
  return workspace
  //return getWorkspace(dbString,workspace.id)
}

/** Update a workspace in the database */
export function updateWorkspace(dbString: string, workspace: Workspace): Workspace {
  update(dbString, 'workspaces', workspace.id, workspace)
  return findOne(dbString, 'workspaces', workspace.id)
}

/** GECKO reset database */
export function resetWorkspace(dbString: string) {
  reset(dbString)
}

/** GECKO add table to workspace */
export function addWorkspace(dbString:string,workspaceId: string, build: string, order: string, cost: string, description: string):Workspace {
  addTable(dbString, workspaceId, build, order, parseInt(cost), description)
  return findOne(dbString, 'workspaces', workspaceId)
}