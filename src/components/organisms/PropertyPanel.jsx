import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"
import Slider from "@/components/atoms/Slider"
import ColorPicker from "@/components/molecules/ColorPicker"

const PropertyPanel = ({ selectedObject, onPropertyChange }) => {
const [properties, setProperties] = useState({})

  useEffect(() => {
    if (selectedObject) {
      const newProperties = {
        left: Math.round(selectedObject.left || 0),
        top: Math.round(selectedObject.top || 0),
        width: Math.round((selectedObject.width || selectedObject.radius * 2 || 100) * (selectedObject.scaleX || 1)),
        height: Math.round((selectedObject.height || selectedObject.radius * 2 || 100) * (selectedObject.scaleY || 1)),
        angle: Math.round(selectedObject.angle || 0),
        opacity: Math.round((selectedObject.opacity || 1) * 100),
        fill: selectedObject.fill || "#000000",
        stroke: selectedObject.stroke || "#000000",
        strokeWidth: selectedObject.strokeWidth || 0
      }
      
      // Add text-specific properties
      if (selectedObject.type === 'i-text') {
        newProperties.fontSize = selectedObject.fontSize || 20
        newProperties.fontFamily = selectedObject.fontFamily || 'Inter'
      }
      
      setProperties(newProperties)
    } else {
      setProperties({})
    }
  }, [selectedObject])

const handlePropertyChange = (property, value) => {
    if (!selectedObject) return
    
    setProperties(prev => ({ ...prev, [property]: value }))
    
    if (property === "opacity") {
      onPropertyChange?.(property, value / 100)
    } else if (property === "width") {
      const originalWidth = selectedObject.width || selectedObject.radius * 2 || 100
      onPropertyChange?.("scaleX", value / originalWidth)
    } else if (property === "height") {
      const originalHeight = selectedObject.height || selectedObject.radius * 2 || 100
      onPropertyChange?.("scaleY", value / originalHeight)
    } else {
      onPropertyChange?.(property, value)
    }
  }

  if (!selectedObject) return null

  return (
<div className="bg-surface border-t border-gray-200 p-4 max-h-96 overflow-y-auto">
      <h3 className="text-sm font-medium text-primary mb-4">
        Properties - {selectedObject?.type || 'Unknown'} Element
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Position */}
          <div>
            <Label>X Position</Label>
            <Input
              type="number"
              value={properties.left || 0}
              onChange={(e) => handlePropertyChange("left", Number(e.target.value))}
              className="text-sm"
            />
          </div>
          
          <div>
            <Label>Y Position</Label>
            <Input
              type="number"
              value={properties.top || 0}
              onChange={(e) => handlePropertyChange("top", Number(e.target.value))}
              className="text-sm"
            />
          </div>

          {/* Size */}
          <div>
            <Label>Width</Label>
            <Input
              type="number"
              value={properties.width || 100}
              onChange={(e) => handlePropertyChange("width", Number(e.target.value))}
              className="text-sm"
              min="1"
            />
          </div>
          
          <div>
            <Label>Height</Label>
            <Input
              type="number"
              value={properties.height || 100}
              onChange={(e) => handlePropertyChange("height", Number(e.target.value))}
              className="text-sm"
              min="1"
            />
          </div>
        </div>

        {/* Rotation */}
        <div>
          <Label>Rotation: {properties.angle || 0}°</Label>
          <Slider
            value={properties.angle || 0}
            onChange={(value) => handlePropertyChange("angle", value)}
            min={-180}
            max={180}
            step={1}
          />
        </div>

        {/* Opacity */}
        <div>
          <Label>Opacity: {properties.opacity || 100}%</Label>
          <Slider
            value={properties.opacity || 100}
            onChange={(value) => handlePropertyChange("opacity", value)}
            min={0}
            max={100}
            step={1}
          />
        </div>

        {/* Text Properties */}
        {selectedObject?.type === "i-text" && (
          <>
            <div>
              <Label>Font Size: {properties.fontSize || 20}px</Label>
              <Slider
                value={properties.fontSize || 20}
                onChange={(value) => handlePropertyChange("fontSize", value)}
                min={8}
                max={72}
                step={1}
              />
            </div>
            
            <div>
              <Label>Font Family</Label>
              <select
                value={properties.fontFamily || "Inter"}
                onChange={(e) => handlePropertyChange("fontFamily", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              >
                {["Inter", "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana"].map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Fill Color</Label>
            <ColorPicker
              value={properties.fill || "#000000"}
              onChange={(color) => handlePropertyChange("fill", color)}
            />
          </div>

          {selectedObject?.type !== "i-text" && (
            <div>
              <Label>Stroke Color</Label>
              <ColorPicker
                value={properties.stroke || "#000000"}
                onChange={(color) => handlePropertyChange("stroke", color)}
              />
            </div>
          )}
        </div>

        {selectedObject?.type !== "i-text" && (
          <div>
            <Label>Stroke Width: {properties.strokeWidth || 0}px</Label>
            <Slider
              value={properties.strokeWidth || 0}
              onChange={(value) => handlePropertyChange("strokeWidth", value)}
              min={0}
              max={20}
              step={1}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyPanel