type CalorieDisplayProps = {
  activity: number,
  calories: number,
  text: string
}

export default function CalorieDisplay({activity = 0, calories, text} : CalorieDisplayProps) {
  const color = activity === 1 ? "text-lime-500" : activity === 2 ? "text-orange-500" : calories < 0 ? "text-red-600" : "text-cyan-500" 
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className={`font-black text-6xl ${color}`}>{calories}</span>
      {text}
    </p>
  )
}
