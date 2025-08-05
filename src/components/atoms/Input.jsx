import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  type = "text", 
  className, 
  disabled,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 text-sm border rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    default: "border-gray-300 bg-surface text-primary placeholder:text-gray-500",
    error: "border-error bg-surface text-primary placeholder:text-gray-500 focus:ring-error focus:border-error"
  }
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        error ? variants.error : variants.default,
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input