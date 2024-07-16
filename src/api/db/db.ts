import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Workspace } from '../types'
import path from 'path'


export function getFilePath(dbFile: string): string {
  return path.resolve(__dirname, dbFile)
}

export function insert(dbFile: string, key: string, obj: Workspace) {//*GECKO */
  const filePath = getFilePath(dbFile);

  // Check write permissions using fs.access
  fs.access(filePath, fs.constants.W_OK, (err) => {
    if (err) {
      console.error(`Cannot write to ${filePath}: ${err}`)
      throw err

    } else {
      //fs.accessSync(filePath, fs.constants.W_OK); //FAILING

      // File can be written to, proceed with reading and writing
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(data);
        
        json[key] = json[key] || [];
        json[key].push(obj);

        //console.log('PRE WRITE: ' + JSON.stringify(json)); //*GECKO */ For debugging
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8')
        //console.log('Write operation completed successfully');//*GECKO

      } catch (readWriteError) {//*GECKO
        console.error('Error during file read/write:', readWriteError)
        throw readWriteError

      }

    }  
  })
}

/** Insert a new object into the database */
export function insertOld(dbFile: string, key: string, obj: Workspace) {
  const data = fs.readFileSync(getFilePath(dbFile), 'utf8')
  const json = JSON.parse(data)
  json[key] ||= []
  json[key].push(obj)

  fs.writeFileSync(getFilePath(dbFile), JSON.stringify(json, null, 2), 'utf8');
  console.log('Write operation completed successfully');

}


export function update(dbFile: string, key: 'workspaces', id: string, obj: Workspace) {//*GECKO */
  const filePath = getFilePath(dbFile);

  // Check write permissions using fs.access
  fs.access(filePath, fs.constants.W_OK, (err) => {
    if (err) {
      console.error(`Cannot write to ${filePath}: ${err}`)
      throw err

    } else {
      // File can be written to, proceed with reading and writing
      try {
        //fs.accessSync(filePath, fs.constants.W_OK); //FAILING
        const data = fs.readFileSync(filePath, 'utf8');
        const json: { workspaces: Workspace[] } = JSON.parse(data)
        
        const updatingIndex = json[key].findIndex((item) => item.id === id)
        if (updatingIndex === -1) {
          throw new Error('[update] Could not find object with id "' + id + '"')//+'\n'+ json)
        }
        json[key].splice(updatingIndex, 1, obj)
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');

      
      } catch (readWriteError) {//*GECKO
        console.error('Error during file read/write:', readWriteError);
        throw readWriteError; 

      }

    }
  })
}

/** Update an existing object in the database */
export function updateOld(dbFile: string, key: 'workspaces', id: string, obj: Workspace) {
  //console.log("U1:",id,obj)//*GECKO
  const data = fs.readFileSync(getFilePath(dbFile), 'utf8')
  const json: { workspaces: Workspace[] } = JSON.parse(data)
  console.log("U2: ",json)//*GECKO
  const updatingIndex = json[key].findIndex((item) => item.id === id)
  if (updatingIndex === -1) {
    throw new Error('Could not find object with id "' + id + '"')
  }
  json[key].splice(updatingIndex, 1, obj)
  fs.writeFileSync(getFilePath(dbFile), JSON.stringify(json))
}

/** Return a single object from the database */
export function findOne(dbFile: string, key: 'workspaces', id: string) {
  const filePath = getFilePath(dbFile);
  
  /*fs.access(filePath, fs.constants.W_OK, (err) => {
    if (err) {
      console.error(`Cannot write to ${filePath}: ${err}`)
      throw err

    } else {
      //fs.accessSync(filePath, fs.constants.W_OK);
      try {*/
        const data = fs.readFileSync(filePath, 'utf8')
        const json: { workspaces: Workspace[] } = JSON.parse(data)
        const result = json[key].find((item) => item.id === id)
        if (!result) {
          throw new Error('[findOne] Could not find item with id "' + id +'"') // + '\n ' + JSON.stringify(json))
        }
        return result

      /*} catch (findError) {//*GECKO
        console.error('Error during finding:', findError);
        throw findError; 

      }

    }
  })*/
  
}

/** Delete an existing object from the database */
export function deleteObj(dbFile: string, key: 'workspaces', id: string) {
  const data = fs.readFileSync(getFilePath(dbFile), 'utf8')
  const json: { workspaces: Workspace[] } = JSON.parse(data)
  const removingIndex = json[key].findIndex((item) => item.id === id)
  if (removingIndex === -1) {
    throw new Error('Could not find object with id "' + id + '"')
  }
  json[key].splice(removingIndex, 1)
  fs.writeFileSync(getFilePath(dbFile), JSON.stringify(json))
}

/** Return all objects from the database */
export function all(dbFile: string, key: string) {
  const data = fs.readFileSync(getFilePath(dbFile), 'utf8')
  const json = JSON.parse(data)
  return json[key]
}

/** Reset the database to a single workspace and invoice */
export function reset(dbFile: string, uuid?: string) {
  const workspaces: Workspace[] = [
    {
      //id: uuid ?? uuidv4(),
      id: 'fb374bf1-c76b-44b3-945b-ee03d35d7a3c',//* GECKO TEST
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
  fs.writeFileSync(getFilePath(dbFile), JSON.stringify({ workspaces }))
}
