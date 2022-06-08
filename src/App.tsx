import { Header } from "./components/Header"
import Modal from 'react-modal'
import { useState } from "react"
import { VehiclesProvider } from "./hooks/useVehicles";
import { Dashboard } from "./components/Dashboard";
import { NewVehicleModal } from "./components/NewVehicleModal";

Modal.setAppElement('#root')

export function App() {
  const [isNewVehicleModalOpen, setIsNewVehicleModalOpen] = useState(false);

  function handleOpenNewVehicleModal() {
    setIsNewVehicleModalOpen(true)
  }

  function handleCloseNewVehicleModal() {
    setIsNewVehicleModalOpen(false)
  }
  return (
    <>
      <VehiclesProvider>
      <Header onOpenNewVehicleModal={handleOpenNewVehicleModal}/>
      <Dashboard />
      <NewVehicleModal 
        isOpen={isNewVehicleModalOpen}
        onRequestClose={handleCloseNewVehicleModal} />
      </VehiclesProvider>
    </>
  )
}

