import { useEffect, useRef } from "react"

type Func = (...args: any[]) => void
type Timer = ReturnType<typeof setTimeout> | undefined

export function useDebounce<T extends Func>(callback: Func, wait: number) {
  const timer = useRef<Timer>()

  const debounce = function (...args: Parameters<T>) {
    const currentTimer = setTimeout(() => {
      callback(...args)
    }, wait)
    clearTimeout(timer.current)
    timer.current = currentTimer
  }

  useEffect(() => {
    return () => {
      if (!timer.current) return
      clearTimeout(timer.current)
    }
  }, [])

  return { debounce }
}
