import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { useVehicles } from '../../hooks/useVehicles'
import { X } from 'phosphor-react'

interface NewVehicleModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewVehicleModal({ isOpen, onRequestClose }: NewVehicleModalProps) {
  const { createVehicle } = useVehicles()
  const [model, setModel] = useState('')
  const [plateNumber, setPlateNumber] = useState('')

  async function handleCreateNewVehicle(event: FormEvent) {
    event.preventDefault()

    await createVehicle({ model, plateNumber })

    setModel('')
    setPlateNumber('')
  }
  
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content w-full max-w-screen-md bg-white dark:bg-zinc-800 p-12 relative rounded-md"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close absolute right-12 top-14 border-0 bg-transparent hover:opacity-80"
      > 
        <X weight='bold' className="w-4 h-4"/>
      </button>
      <form onSubmit={handleCreateNewVehicle}>
        <h2 className="Text-zinc-800 dark:text-zinc-100 text-xl">
          Cadastrar Veículo
        </h2>
        <input
          placeholder='Modelo'
          value={model}
          onChange={event => setModel(event.target.value)}
          className="placeholder:text-zinc-800 dark:placeholder:text-zinc-100 mt-4 w-full py-4 px-6 rounded-md border border-zinc-500 bg-zinc-100 dark:bg-zinc-600"
        />
        <input
          placeholder='Placa'
          value={plateNumber}
          onChange={event => setPlateNumber(event.target.value)}
          className="placeholder:text-zinc-800 dark:placeholder:text-zinc-100 mt-4 w-full py-4 px-6 rounded-md border border-zinc-500 bg-zinc-100 dark:bg-zinc-600"
        />
        <button 
          type="submit" 
          className="w-full py-0 px-6 h-16 bg-emerald-600 text-zinc-800 dark:text-zinc-100 rounded-md border-0 text-xl mt-6 hover:bg-emerald-500 font-semibold"
        >
          Cadastrar
        </button>
      </form>
    </Modal>
  )
}