import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Slider = forwardRef(({ 
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type="range"
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={cn(
        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-4 slider-thumb:h-4 slider-thumb:bg-accent slider-thumb:rounded-full slider-thumb:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
})

Slider.displayName = "Slider"

export default Slider