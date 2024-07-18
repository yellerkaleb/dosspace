import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import DosspaceApi from '../api'
import { DetailWorkspace } from './WorkspaceDetails'

/* GECKO test: http://localhost:3000/fb374bf1-c76b-44b3-945b-ee03d35d7a3c/add?order=1234&build=5678&cost=9012&description=23456 */

type WorkspaceDetailsParams = {
  workspaceId: string
}

export default function AddWorkspaceTable() {
  const { workspaceId } = useParams() as WorkspaceDetailsParams
  const location = useLocation()
  const [workspace, setWorkspace] = useState<DetailWorkspace | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const build = searchParams.get('build') || ''
    const order = searchParams.get('order') || ''
    const cost = searchParams.get('cost') || ''
    const description = searchParams.get('description') || ''

    //console.log('WAT[AWT]',workspaceId,build,order,cost,description)

    const handleAddTable = async () => {
      try {
        const workspace = await DosspaceApi.addWorkspaceTable(workspaceId, build, order, cost, description)
        setWorkspace(workspace)
      } catch (err) {
        //console.log('WAT[AWT] Unable to add table to workspace', err);
        setError('WAT[AWT] Unable to add table to workspace')
      }
    }

    handleAddTable()
  }, [workspaceId, location.search])

  return (
    <div>
      <h2>Add Table to Workspace</h2>
      {error && <p>{error}</p>}
      {workspace && (
        <div>
          <h3>Updated Workspace Details</h3>
          <table>
            <thead>
              <tr>
                <th>Workspace ID</th>
                <th>Title</th>
                <th>Build Number</th>
                <th>Shipment Description</th>
                <th>Order Number</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {workspace.buildShipments.map((buildShipment) =>
                buildShipment.shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{workspace.id}</td>
                    <td>{workspace.title}</td>
                    <td>{buildShipment.buildNumber}</td>
                    <td>{shipment.description}</td>
                    <td>{shipment.orderNumber}</td>
                    <td>${shipment.cost}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
