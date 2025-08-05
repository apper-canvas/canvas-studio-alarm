import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const ToolButton = ({ 
  icon, 
  label, 
  active = false, 
  onClick, 
  className,
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-150 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        active 
          ? "bg-accent text-white shadow-md" 
          : "bg-surface text-primary border border-gray-200 hover:bg-gray-50 hover:shadow-sm",
        className
      )}
    >
      <ApperIcon name={icon} size={20} className="mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export default ToolButton