import { Dispatch, useMemo } from "react"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}
export default function ActivityList({ activities, dispatch }: ActivityListProps) {

  const categoryName = useMemo(() => 
    {return (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '')}
  , [activities])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      
      {isEmptyActivities ?
        <p className="text-center my-5">No hay actividades aún...</p> :
        activities.map( activity => (
          <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow-md rounded-xl">
            <div className="space-y-2 relative">
              <p className={`absolute -top-8 -left-8 px-10 py-2 border font-bold text-white uppercase font-bold rounded-lg hover:bg-white  duration-300
              ${activity.category === 1 ? "bg-lime-500 hover:border-lime-500 hover:text-lime-500" : "bg-orange-500 hover:border-orange-500 hover:text-orange-500" }`}>
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">
                {activity.name}
              </p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories}{''}
                <span>Calorias</span>
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <button
                className="flex gap-5 items-center"
                onClick={() => dispatch({type:'set-activeId', payload: {id: activity.id}})}
              >
                <PencilSquareIcon
                  className="h-8 w-8 text-gray-800 hover:scale-[1.15] hover:text-blue-800 duration-[175ms]"
                />
              </button>
              <button
                className="flex gap-5 items-center"
                onClick={() => dispatch({type:'delete-activity', payload: {id: activity.id}})}
              >
                <XCircleIcon
                  className="h-8 w-8 text-gray-800 hover:scale-[1.15] hover:text-red-500 duration-[175ms]"
                />
              </button>
            </div>
          </div>
      ))}
    </>
  )
}
