import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}
export default function CalorieTracker({ activities } : CalorieTrackerProps) {

  const caloriesConsumend = useMemo(() => {
    return activities.reduce(
      (total, activity) => activity.category === 1 ? 
        total + +activity.calories : total, 0)
    }, [activities])

  const caloriesBurned = useMemo(() => {
    return activities.reduce(
      (total, activity) => activity.category === 2 ? 
        total + +activity.calories : total, 0)
    }, [activities])

  const netCalories = useMemo(() => caloriesConsumend - caloriesBurned, [activities])
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          activity={1}
          calories={caloriesConsumend}
          text="Consumidas"
        />
        <CalorieDisplay
          activity={2}
          calories={caloriesBurned}
          text="Ejercicio"
        />
        <CalorieDisplay
          activity={0}
          calories={netCalories}
          text="Diferencia"
        />
      </div>
    </>
  )
}
