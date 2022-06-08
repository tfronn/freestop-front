interface HeaderProps {
  onOpenNewVehicleModal: () => void;
}

export function Header({ onOpenNewVehicleModal }: HeaderProps) {
  return (
    <>
      <header className="flex items-center text-center justify-center py-8 font-bold text-xl xs:text-2xl">
        <a href="/" className="hover:brightness-110 ease-in-out duration-100">
          <p className="text-4xl">
            Free
            <span className="text-green-600 mr-2">
              Spot
            </span>
          </p>
          <p>
            Parking Lot
          </p> 
        </a>
      </header>
      <div className="mt-12 flex align-center justify-center">
        <button 
          className="bg-green-500 border-0 py-4 px-8 rounded-md hover:bg-opacity-80"
          type="button"
          onClick={onOpenNewVehicleModal}
        >
          Adicionar veículo
        </button>
      </div>
    </>
  )
}