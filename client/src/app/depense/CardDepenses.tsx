import React from 'react'

import { useFetchDepensesDataQuery} from '@/state/api'




const CardDepenses = () => {

  const { data : DashboardDepenses , isLoading} = useFetchDepensesDataQuery();
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shado-md rounded-2xl pb-16">
      { isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
        <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
          Liste Depenses Personnels
        </h3>
        <hr />
        <div className="overflow-auto h-full">
          {DashboardDepenses?.Depenses.map((depense) => (
          <div 
           key={depense.utilisateurId}
           className="flex items-center justify-between gap-3 px-8 py-7 border-b">
            <div className="flex items-center gap-3">
            <div>img</div>
            <div className="flex flex-col justify-between gap-1">
              <div className="font-bold text-gray-700">{depense.nom}</div>
              <div className="flex text-sm items-center">
                <span className="font-bold text-blue-500 text-xs">
                  ${depense.montant}
                </span>
                <span className="mx-2">|</span>
                 ${depense.categorie}
              </div>

            </div>
            <span className="mx-2">|</span>
                 ${depense.categorie}

                 <span className="mx-2">|</span>
                 ${depense.date}

                 <span className="mx-2">|</span>
                 ${depense.note}
              
              
              
            </div>
            <div className="text-xs flex items-center">
              
            </div>
           </div>
          ))}
        </div>
        </>
      )}
    </div>
  )
}

export default CardDepenses