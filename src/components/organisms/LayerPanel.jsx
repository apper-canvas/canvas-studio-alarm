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
        {objects.slice().reverse().map((obj, index) => (
          <div
            key={obj.id}
            className={cn(
              "flex items-center p-2 rounded-lg border cursor-pointer transition-colors duration-150",
              selectedObject === obj.object
                ? "bg-accent text-white border-accent"
                : "bg-surface border-gray-200 hover:bg-gray-50"
            )}
            onClick={() => onObjectSelect(obj.object)}
          >
            <div className="flex items-center flex-1 min-w-0">
              <ApperIcon
                name={obj.type === "i-text" ? "Type" : obj.type === "rect" ? "Square" : obj.type === "circle" ? "Circle" : "Image"}
                size={16}
                className="mr-2 flex-shrink-0"
              />
              <span className="text-sm font-medium truncate">
                {obj.name}
              </span>
            </div>

            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onObjectToggle(obj.object)
                }}
                className="p-1 rounded hover:bg-black/10 transition-colors"
              >
                <ApperIcon
                  name={obj.visible ? "Eye" : "EyeOff"}
                  size={14}
                  className={obj.visible ? "" : "opacity-50"}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onObjectDelete(obj.object)
                }}
                className="p-1 rounded hover:bg-red-100 text-error transition-colors"
              >
                <ApperIcon name="Trash2" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LayerPanel