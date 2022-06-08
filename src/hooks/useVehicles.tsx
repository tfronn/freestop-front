import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

interface Vehicle {
  model: string;
  plateNumber: string;
  createdAt: Date
}

type VehicleInput = Omit<Vehicle, 'createdAt'>

interface VehicleProviderProps {
  children: ReactNode
}

interface VehiclesContextData {
  vehicles: Vehicle[];
  deleteVehicle: (vehicle: Vehicle) => Promise<void>
  createVehicle: (vehicle: VehicleInput) => Promise<void>
}
export const VehiclesContext = createContext<VehiclesContextData>({} as VehiclesContextData)

export function VehiclesProvider({ children }: VehicleProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  
  useEffect(() => {
    api
      .get('/vehicles')
      .then(response => setVehicles(response.data))
      .catch((err) => {
        console.log('ops, ocorreu um erro' + err)
      })
  }, [])

  async function createVehicle(vehicleInput: VehicleInput) {
    const { model, plateNumber } = vehicleInput
    if(!model || !plateNumber) { 
      alert('Modelo e Placa são obrigatórios. Digite os dados corretamente para seguir')
    } else {
      const response = await api.post('/vehicles', {
      ...vehicleInput,
      createdAt: new Date()
      })
      const vehicles = response.data
      setVehicles(vehicles) }
  }

  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    return `${min}m e ${sec}s`;
  }

  async function deleteVehicle({ model, plateNumber, createdAt }: Vehicle) {
    const time = calcTempo(new Date().getTime() - new Date(createdAt).getTime());
    if(!confirm(`o veiculo ${model} permaneceu por ${time}. Deseja encerrar?`)) return;
    const response = await api.delete("/vehicles/plateNumber",{ data: { plateNumber }} )
    const { vehicles } = response.data
    setVehicles(vehicles)
    return    
  } 

  return (
    <VehiclesContext.Provider value={{ vehicles, createVehicle, deleteVehicle }}>
      {children}
    </VehiclesContext.Provider>
  )
}

export function useVehicles() {
  const context = useContext(VehiclesContext)
  return context
}