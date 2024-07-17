import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DosspaceApi from '../api'

//console.log("WD")


interface Shipment {
  id: string
  description: string
  orderNumber: string
  cost: number
}

interface ShipmentTable {
  id: string
  buildNumber: string
  shipments: Shipment[]
}

export interface DetailWorkspace {
  id: string
  title: string
  buildShipments: ShipmentTable[]
}

type WorkspaceDetailsParams = {
  workspaceId: string
}

/** Detail view of individual workspace */
export default function WorkspaceDetails() {
  const { workspaceId } = useParams() as WorkspaceDetailsParams
  const [workspace, setWorkspace] = useState<DetailWorkspace | null>(null)

  // Fetch all workspaces from the API
  useEffect(() => {
    async function fetchWorkspace() {
      const workspace = await DosspaceApi.getWorkspace(workspaceId)
      setWorkspace(workspace)
    }

    fetchWorkspace()
  }, [workspaceId])

    if (!workspace?.id) return <>RESET or No record</>//GECKO

    //GECKO
    return <>
      <div>
        <h2>Workspace Details</h2>
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
  </>
    /*return <>
      <li>{workspace?.title}</li>
      <li>ID #{workspace?.id}</li>
      <li>Build #{workspace?.buildShipments?.[0]?.buildNumber}</li>
      <li>Order #{workspace?.buildShipments[0]?.shipments[0]?.orderNumber}</li>  
      <li>Cost ${workspace?.buildShipments[0]?.shipments[0]?.cost}</li>  
      <li>Qty: {workspace?.buildShipments[0]?.shipments[0]?.description}</li>
    </>
  */
}
