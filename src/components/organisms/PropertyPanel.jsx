import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"
import Slider from "@/components/atoms/Slider"
import ColorPicker from "@/components/molecules/ColorPicker"

const PropertyPanel = ({ selectedObject, onPropertyChange }) => {
  const [properties, setProperties] = useState({})

  useEffect(() => {
    if (selectedObject) {
      setProperties({
        left: Math.round(selectedObject.left || 0),
        top: Math.round(selectedObject.top || 0),
        width: Math.round(selectedObject.width * (selectedObject.scaleX || 1)),
        height: Math.round(selectedObject.height * (selectedObject.scaleY || 1)),
        angle: Math.round(selectedObject.angle || 0),
        opacity: (selectedObject.opacity || 1) * 100,
        fill: selectedObject.fill || "#000000",
        stroke: selectedObject.stroke || "#000000",
        strokeWidth: selectedObject.strokeWidth || 0
      })
    }
  }, [selectedObject])

  const handlePropertyChange = (property, value) => {
    setProperties(prev => ({ ...prev, [property]: value }))
    
    if (property === "opacity") {
      onPropertyChange(property, value / 100)
    } else if (property === "width") {
      onPropertyChange("scaleX", value / selectedObject.width)
    } else if (property === "height") {
      onPropertyChange("scaleY", value / selectedObject.height)
    } else {
      onPropertyChange(property, value)
    }
  }

  if (!selectedObject) return null

  return (
    <div className="bg-surface border-t border-gray-200 p-4">
      <h3 className="text-sm font-medium text-primary mb-4">Properties</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Position */}
        <div>
          <Label>X Position</Label>
          <Input
            type="number"
            value={properties.left}
            onChange={(e) => handlePropertyChange("left", Number(e.target.value))}
          />
        </div>
        
        <div>
          <Label>Y Position</Label>
          <Input
            type="number"
            value={properties.top}
            onChange={(e) => handlePropertyChange("top", Number(e.target.value))}
          />
        </div>

        {/* Size */}
        <div>
          <Label>Width</Label>
          <Input
            type="number"
            value={properties.width}
            onChange={(e) => handlePropertyChange("width", Number(e.target.value))}
          />
        </div>
        
        <div>
          <Label>Height</Label>
          <Input
            type="number"
            value={properties.height}
            onChange={(e) => handlePropertyChange("height", Number(e.target.value))}
          />
        </div>

        {/* Rotation */}
        <div>
          <Label>Rotation: {properties.angle}°</Label>
          <Slider
            value={properties.angle}
            onChange={(value) => handlePropertyChange("angle", value)}
            min={-180}
            max={180}
            step={1}
          />
        </div>

        {/* Opacity */}
        <div>
          <Label>Opacity: {properties.opacity}%</Label>
          <Slider
            value={properties.opacity}
            onChange={(value) => handlePropertyChange("opacity", value)}
            min={0}
            max={100}
            step={1}
          />
        </div>

        {/* Colors */}
        <div>
          <Label>Fill Color</Label>
          <ColorPicker
            value={properties.fill}
            onChange={(color) => handlePropertyChange("fill", color)}
          />
        </div>

        {selectedObject.type !== "i-text" && (
          <div>
            <Label>Stroke Color</Label>
            <ColorPicker
              value={properties.stroke}
              onChange={(color) => handlePropertyChange("stroke", color)}
            />
          </div>
        )}
      </div>

      {selectedObject.type !== "i-text" && (
        <div className="mt-4">
          <Label>Stroke Width: {properties.strokeWidth}px</Label>
          <Slider
            value={properties.strokeWidth}
            onChange={(value) => handlePropertyChange("strokeWidth", value)}
            min={0}
            max={10}
            step={1}
          />
        </div>
      )}
    </div>
  )
}

export default PropertyPanel