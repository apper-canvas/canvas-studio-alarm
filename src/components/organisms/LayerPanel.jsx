import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const LayerPanel = ({ 
  objects, 
  selectedObject, 
  onObjectSelect, 
  onObjectToggle, 
  onObjectDelete 
}) => {
  if (objects.length === 0) {
    return (
      <div className="w-64 bg-surface border-l border-gray-200 p-4">
        <h3 className="text-sm font-medium text-primary mb-4">Layers</h3>
        <div className="text-center text-sm text-gray-500">
          <ApperIcon name="Layers" size={32} className="mx-auto mb-2 text-gray-300" />
          No elements on canvas
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-surface border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-primary">Layers</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
{objects.slice().reverse().map((obj, index) => {
          const isSelected = selectedObject === obj.object
          const iconName = obj.type === "i-text" ? "Type" : 
                          obj.type === "rect" ? "Square" : 
                          obj.type === "circle" ? "Circle" : 
                          obj.type === "image" ? "Image" : "Square"
          
          return (
            <div
              key={obj.id || `layer-${index}`}
              className={cn(
                "flex items-center p-2 rounded-lg border cursor-pointer transition-all duration-150",
                isSelected
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-surface border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              )}
              onClick={() => onObjectSelect?.(obj.object)}
            >
              <div className="flex items-center flex-1 min-w-0">
                <ApperIcon
                  name={iconName}
                  size={16}
                  className={cn(
                    "mr-2 flex-shrink-0",
                    isSelected ? "text-white" : "text-gray-600"
                  )}
                />
                <span className={cn(
                  "text-sm font-medium truncate",
                  isSelected ? "text-white" : "text-gray-900",
                  !obj.visible && "opacity-50"
                )}>
                  {obj.name || `${obj.type} ${index + 1}`}
                </span>
              </div>

              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onObjectToggle?.(obj.object)
                  }}
                  className={cn(
                    "p-1 rounded transition-colors",
                    isSelected 
                      ? "hover:bg-white/20" 
                      : "hover:bg-gray-100"
                  )}
                  title={obj.visible ? "Hide layer" : "Show layer"}
                >
                  <ApperIcon
                    name={obj.visible ? "Eye" : "EyeOff"}
                    size={14}
                    className={cn(
                      isSelected ? "text-white" : "text-gray-600",
                      !obj.visible && "opacity-50"
                    )}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Delete this layer?')) {
                      onObjectDelete?.(obj.object)
                    }
                  }}
                  className={cn(
                    "p-1 rounded transition-colors",
                    isSelected 
                      ? "hover:bg-red-500/20 text-red-200" 
                      : "hover:bg-red-100 text-red-600"
                  )}
                  title="Delete layer"
                >
                  <ApperIcon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LayerPanel