import { Loader2 } from "lucide-react"

interface LoaderProps {
  text?: string
  show?: boolean
}

export function Loader({ text = "Loading...", show = false }: LoaderProps) {
  if (!show) return null

  return (
    <div className="fixed z-[999] bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  )
}
