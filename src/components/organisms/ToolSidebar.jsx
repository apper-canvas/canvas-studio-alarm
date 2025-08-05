import { useState } from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"
import Slider from "@/components/atoms/Slider"
import ToolButton from "@/components/molecules/ToolButton"
import ColorPicker from "@/components/molecules/ColorPicker"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ToolSidebar = ({ selectedTool, onToolSelect, toolOptions, onToolOptionsChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    text: true,
    shapes: true,
    images: true,
    colors: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const tools = {
    text: { icon: "Type", label: "Text" },
    rectangle: { icon: "Square", label: "Rectangle" },
    circle: { icon: "Circle", label: "Circle" },
    image: { icon: "Image", label: "Image" }
  }

  const fontFamilies = [
    "Inter", "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana"
  ]

  const triggerImageUpload = () => {
    document.getElementById("image-upload")?.click()
  }

  return (
    <div className="w-80 bg-surface border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-primary">Tools</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Text Tools */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection("text")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-primary">Text</h3>
            <ApperIcon
              name={expandedSections.text ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="text-gray-500"
            />
          </button>

          {expandedSections.text && (
            <div className="mt-4 space-y-4">
              <ToolButton
                icon={tools.text.icon}
                label={tools.text.label}
                active={selectedTool === "text"}
                onClick={() => onToolSelect("text")}
              />

              <div className="space-y-3">
                <div>
                  <Label>Font Family</Label>
                  <select
                    value={toolOptions.fontFamily || "Inter"}
                    onChange={(e) => onToolOptionsChange("fontFamily", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    {fontFamilies.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Font Size: {toolOptions.fontSize || 20}px</Label>
                  <Slider
                    value={toolOptions.fontSize || 20}
                    onChange={(value) => onToolOptionsChange("fontSize", value)}
                    min={8}
                    max={72}
                    step={1}
                  />
                </div>

                <div>
                  <Label>Text Color</Label>
                  <ColorPicker
                    value={toolOptions.color || "#000000"}
                    onChange={(color) => onToolOptionsChange("color", color)}
                  />
                </div>

                <div>
                  <Label>Text Content</Label>
                  <Input
                    value={toolOptions.text || "Edit text"}
                    onChange={(e) => onToolOptionsChange("text", e.target.value)}
                    placeholder="Enter text..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shape Tools */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection("shapes")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-primary">Shapes</h3>
            <ApperIcon
              name={expandedSections.shapes ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="text-gray-500"
            />
          </button>

          {expandedSections.shapes && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <ToolButton
                  icon={tools.rectangle.icon}
                  label={tools.rectangle.label}
                  active={selectedTool === "rectangle"}
                  onClick={() => onToolSelect("rectangle")}
                />
                <ToolButton
                  icon={tools.circle.icon}
                  label={tools.circle.label}
                  active={selectedTool === "circle"}
                  onClick={() => onToolSelect("circle")}
                />
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Fill Color</Label>
                  <ColorPicker
                    value={toolOptions.fillColor || "#0066ff"}
                    onChange={(color) => onToolOptionsChange("fillColor", color)}
                  />
                </div>

                <div>
                  <Label>Stroke Color</Label>
                  <ColorPicker
                    value={toolOptions.strokeColor || "#000000"}
                    onChange={(color) => onToolOptionsChange("strokeColor", color)}
                  />
                </div>

                <div>
                  <Label>Stroke Width: {toolOptions.strokeWidth || 0}px</Label>
                  <Slider
                    value={toolOptions.strokeWidth || 0}
                    onChange={(value) => onToolOptionsChange("strokeWidth", value)}
                    min={0}
                    max={10}
                    step={1}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image Tools */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection("images")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-primary">Images</h3>
            <ApperIcon
              name={expandedSections.images ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="text-gray-500"
            />
          </button>

          {expandedSections.images && (
            <div className="mt-4 space-y-4">
              <Button
                onClick={triggerImageUpload}
                className="w-full"
                variant="secondary"
              >
                <ApperIcon name="Upload" size={16} className="mr-2" />
                Upload Image
              </Button>

              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-sm text-gray-500">
                Drag and drop images here or click upload above
              </div>
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div className="p-4">
          <button
            onClick={() => toggleSection("colors")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-medium text-primary">Colors</h3>
            <ApperIcon
              name={expandedSections.colors ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="text-gray-500"
            />
          </button>

          {expandedSections.colors && (
            <div className="mt-4">
              <div className="grid grid-cols-6 gap-2">
                {[
                  "#000000", "#ffffff", "#ef4444", "#f59e0b", "#10b981", "#3b82f6",
                  "#8b5cf6", "#ec4899", "#374151", "#6b7280", "#9ca3af", "#d1d5db"
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      if (selectedTool === "text") {
                        onToolOptionsChange("color", color)
                      } else {
                        onToolOptionsChange("fillColor", color)
                      }
                    }}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-accent transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToolSidebar