import { X } from "phosphor-react";
import { useVehicles } from "../../hooks/useVehicles";


export function VehiclesTable() {
  const { vehicles, deleteVehicle } = useVehicles();



  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    return `${min}m e ${sec}s`;
  }


  return (
    <div className="mt-16 overflow-scroll scrollbar-none"> 
      <table className="md:w-full border-separate border border-zinc-100 rounded-md drop-shadow-md dark:border-zinc-900">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-800">
            <th className="text-zinc-500 dark:text-zinc-400 py-4 px-8 align-left leading-6">Modelo</th>
            <th className="text-zinc-500 dark:text-zinc-400 py-4 px-8 align-left leading-6">Placa</th>
            <th className="text-zinc-500 dark:text-zinc-400 py-4 px-8 align-left leading-6">Data</th>
            <th className="text-zinc-500 dark:text-zinc-400 py-4 px-8 align-left leading-6">Retirar</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.plateNumber} className="text-center"> 
              <td className="py-4 px-8 border-none dark:bg-zinc-800 bg-white rounded-md">{vehicle.model}</td>
              <td className="py-4 px-8 border-none dark:bg-zinc-800 bg-white rounded-md">{vehicle.plateNumber}</td>
              <td className="py-4 px-8 border-none dark:bg-zinc-800 bg-white rounded-md">
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(vehicle.createdAt)
                )}
              </td>
              <td className="py-4 px-8 border-none dark:bg-zinc-800 bg-white rounded-md">
                <button 
                  className="delete" 
                  data-placa={vehicle.plateNumber}
                  onClick={() => deleteVehicle(vehicle)}
                >
                  <X weight="bold" className="w-4 h-4"/>  
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}