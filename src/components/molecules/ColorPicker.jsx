import { useState } from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const ColorPicker = ({ value = "#0066ff", onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(value)

  const presetColors = [
    "#000000", "#ffffff", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899",
    "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#fca5a5", "#fde68a", "#a7f3d0", "#93c5fd"
  ]

  const handleColorSelect = (color) => {
    onChange(color)
    setCustomColor(color)
    setIsOpen(false)
  }

  const handleCustomColorChange = (e) => {
    const color = e.target.value
    setCustomColor(color)
    onChange(color)
  }

return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-md border-2 border-gray-300 hover:border-accent transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        style={{ backgroundColor: value }}
        title={`Current color: ${value}`}
      />
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Color picker panel */}
          <div className="absolute top-10 left-0 z-50 p-4 bg-surface border border-gray-200 rounded-lg shadow-xl w-64">
            <div className="grid grid-cols-8 gap-2 mb-4">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={cn(
                    "w-6 h-6 rounded border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                    value === color 
                      ? "border-accent scale-110 shadow-md" 
                      : "border-gray-300 hover:border-accent hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Pick Custom Color
                </label>
                <Input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-full h-10 p-1 cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Hex Value
                </label>
                <Input
                  type="text"
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e)}
                  placeholder="#000000"
                  className="text-sm font-mono"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => setIsOpen(false)} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ColorPicker