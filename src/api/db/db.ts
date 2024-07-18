import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Workspace } from '../types'
import path from 'path'

export const useAsync=false//GECKO

export function getFilePath(dbFile: string): string {
  return path.resolve(__dirname, dbFile)
}

/** Insert a new object into the database */
export function insert(dbFile: string, key: string, obj: Workspace) {//GECKO 
  const filePath = getFilePath(dbFile) //GECKO
  const data = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(data)

  json[key] ||= []
  json[key].push(obj)

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log('Write operation completed successfully');
}

/** Update an existing object in the database */
export function update(dbFile: string, key: 'workspaces', id: string, obj: Workspace) {//GECKO 
  const filePath = getFilePath(dbFile) //GECKO
  const data = fs.readFileSync(filePath, 'utf8')
  const json: { workspaces: Workspace[] } = JSON.parse(data)
  const updatingIndex = json[key].findIndex((item) => item.id === id)

  if (updatingIndex === -1) {
    throw new Error('Could not find object with id "' + id + '"')
  }

  json[key].splice(updatingIndex, 1, obj)
  fs.writeFileSync(filePath, JSON.stringify(json))
}

/** Return a single object from the database */
export function findOne(dbFile: string, key: 'workspaces', id: string) {
  const filePath = getFilePath(dbFile)
  const data = fs.readFileSync(filePath, 'utf8')
  const json: { workspaces: Workspace[] } = JSON.parse(data)
  const result = json[key].find((item) => item.id === id)

  if (!result) {
    throw new Error('[findOne] Could not find item with id "' + id +'"') // + '\n ' + JSON.stringify(json))
  }

  return result
}

/** Delete an existing object from the database */
export function deleteObj(dbFile: string, key: 'workspaces', id: string) {
  const filePath = getFilePath(dbFile) //GECKO
  const data = fs.readFileSync(filePath, 'utf8')
  const json: { workspaces: Workspace[] } = JSON.parse(data)
  const removingIndex = json[key].findIndex((item) => item.id === id)

  if (removingIndex === -1) {
    throw new Error('Could not find object with id "' + id + '"')
  }

  json[key].splice(removingIndex, 1)
  fs.writeFileSync(filePath, JSON.stringify(json))
}

/** Return all objects from the database */
export function all(dbFile: string, key: string) {
  const filePath = getFilePath(dbFile) //GECKO
  const data = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(data)

  return json[key]
}

/** Reset the database to a single workspace and invoice */
export function reset(dbFile: string, uuid?: string) {
  const filePath = getFilePath(dbFile) //GECKO
  const uuidWiley='fb374bf1-c76b-44b3-945b-ee03d35d7a3c'//GECKO
  const workspaces: Workspace[] = [
    {
      //id: uuid ?? uuidv4(),
      id: uuidWiley,//GECKO TEST
      title: "Wiley's Shipping",
      buildShipments: [
        {
          id: uuidv4(),
          buildNumber: 'A82D2-108',
          // Initialize the workspace with a single empty build shipment
          shipments: [
            {
              id: uuidv4(),
              description: '64 units',
              orderNumber: '121-5821131-5985042',
              cost: 107_643,
            },
          ],
        },
      ],
    },
  ]

  fs.writeFileSync(filePath, JSON.stringify({ workspaces }))
}


/** GECKO Add table to workspace */
export function addTable(dbFile: string, id: string, newTable: Workspace) {
  const filePath = getFilePath(dbFile) //GECKO
  const data = fs.readFileSync(filePath, 'utf8')
  return
  console.log('DB[AT]')
  //find existing workspace id, retrieve it, insert child, update

  /*const json: { workspaces: Workspace[] } = JSON.parse(data)
  const updatingIndex = json[key].findIndex((item) => item.id === id)

  if (updatingIndex === -1) {
    throw new Error('Could not find object with id "' + id + '"')
  }

  json[key].splice(updatingIndex, 1, obj)
  fs.writeFileSync(filePath, JSON.stringify(json))
    */

  const curWorkspace=findOne(filePath, 'workspaces', id)

  const workspace: Workspace = {
    id: id,
    title: curWorkspace?.title,
    buildShipments: [
      {
        id: uuidv4(),
        buildNumber: '',
        shipments: [{ id: uuidv4(), description: '', orderNumber: '', cost: 0 }],
      },
    ],
  }

}
