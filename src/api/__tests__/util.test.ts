import * as utils from '../util'
import { reset } from '../db/db'
import mock from 'mock-fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'


const testDbString = '../database.json'//GECKO replaced '../database.test.txt' and made JSON for better readability.  The original DB name does not exist
//const workspaceId = createMockUuid()
const uuidWiley='fb374bf1-c76b-44b3-945b-ee03d35d7a3c'//GECKO
const workspaceId =uuidWiley //GECKO: test, taken from DB available IDs

describe('Util tests', () => {
  function createMockUuid() {// Creates random unique ID for a mock object
    return uuidv4()
  }

  beforeEach(() => {
    mock({ [path.resolve(__dirname, testDbString)]: '' })
    reset(testDbString)
  })

  afterEach(() => {
    mock.restore()
  })

  
  describe('PLACEHOLDER', () => {//GECKO
    it('LAUNCHING ALL TESTS', () => {
      //DOING NOTHING HERE
    })
  })
})

//GECKO ************ MUST RESET BEFORE PERFORMING TESTS *************
describe('reset', () => { //GECKO
  it('resets db for test', () => {
    utils.resetWorkspace(testDbString)
  })
})

describe('getWorkspaces', () => {
  it('returns the workspaces from the db', () => {
    const workspaces = utils.getWorkspaces(testDbString)

    expect(workspaces).toBeDefined()
    expect(workspaces).toHaveLength(1)
    expect(workspaces[0].id).toBe(workspaceId)
    expect(workspaces[0].title).toEqual("Wiley's Shipping")
    expect(workspaces[0].buildShipments).toHaveLength(1)
    expect(workspaces[0].buildShipments[0].buildNumber).toEqual('A82D2-108')
    expect(workspaces[0].buildShipments[0].shipments).toHaveLength(1)
    expect(workspaces[0].buildShipments[0].shipments[0].description).toEqual('64 units')
  })
})

describe('getWorkspace', () => {
  it('returns the queried workspace from the db', () => {
    const workspace = utils.getWorkspace(testDbString, workspaceId)

    expect(workspace).toBeDefined()
    expect(workspace.title).toEqual("Wiley's Shipping")
    expect(workspace.buildShipments).toHaveLength(1)
  })
})

describe('createWorkspace', () => {
  it('creates a new workspace', () => {
    const workspace = utils.createWorkspace(testDbString)

    workspace.title=''

    expect(workspace).toBeDefined()
    expect(workspace.title).toEqual('')
    expect(workspace.buildShipments).toHaveLength(1)
    expect(workspace.buildShipments[0].shipments).toHaveLength(1)
    expect(workspace.buildShipments[0].buildNumber).toEqual('')
    expect(workspace.buildShipments[0].shipments[0].description).toEqual('')

  })
})

describe('updateWorkspace', () => {
  it('updates a workspace', () => {
    const wTitle="Arnav's Shipping"
    const workspace = utils.createWorkspace(testDbString)

    workspace.title = wTitle
    utils.updateWorkspace(testDbString, workspace)

    const updatedWorkspace = utils.getWorkspace(testDbString, workspace.id)
    
    expect(updatedWorkspace.title).toEqual(wTitle) 
  })
})