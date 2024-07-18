import express from 'express'
import cors from 'cors'
import { createWorkspace, getWorkspace, getWorkspaces, updateWorkspace, addWorkspace } from './util'
import { reset } from './db/db'

const app = express()

app.use(cors())
app.use(express.json())

const port = 8080
const dbString = '../database.json' //GECKO better readability

/** Admin endpoint for resetting the database */
app.get('/reset', (req, res) => {
  reset(dbString)
  res.send('Reset database')
})

/** Returns all workspaces in the database */
app.get('/', (req, res) => {
  const allWorkspaces = getWorkspaces(dbString)
  const workspaces = allWorkspaces.map((workspace) => ({
    id: workspace.id,
    title: workspace.title,
  }))
  res.json({ workspaces })
})

/** Returns the workspace with the given ID */
app.get('/:workspaceId', (req, res) => {
  res.json({ workspace: getWorkspace(dbString, req.params.workspaceId) })
})

/** Updates the workspace with the given ID and returns the updated workspace */
app.post('/:workspaceId', (req, res) => {
  const workspace = req.body.workspace
  res.json({ workspace: updateWorkspace(dbString, workspace) })
})

/** Creates a new workspace in the database and returns it */
app.post('/', (req, res) => {
  res.json({ workspace: createWorkspace(dbString) })
})

/*GECKO add table to workspace*/
app.get('/:workspaceId/add', (req, res) => {
  console.log(`Received request to add table to workspace ${req.params.workspaceId} with query parameters:`, req.query);

  const { workspaceId } = req.params
  const build = req.query.build as string
  const order = req.query.order as string
  const cost = req.query.cost as string
  const description = req.query.description as string
  
  try {
    const newWorkspaceTable = addWorkspace(dbString, workspaceId, build, order, cost, description)
    res.json({ workspace: newWorkspaceTable })

  } catch (error) {
    res.status(500).json({ error:'APP[add] Unable to add table to workspace' })

  }
  
})

module.exports = app

app.listen(port, () => {
  console.log(`Dosspace is running on port ${port}.`)
})
