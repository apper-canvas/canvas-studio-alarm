import { useState } from "react"
import ToolSidebar from "@/components/organisms/ToolSidebar"
import CanvasWorkspace from "@/components/organisms/CanvasWorkspace"

const DesignStudio = () => {
  const [selectedTool, setSelectedTool] = useState(null)
  const [selectedElement, setSelectedElement] = useState(null)
  const [toolOptions, setToolOptions] = useState({
    text: "Edit text",
    fontSize: 20,
    fontFamily: "Inter",
    color: "#000000",
    fillColor: "#0066ff",
    strokeColor: "#000000",
    strokeWidth: 0
  })

  const handleToolOptionsChange = (option, value) => {
    setToolOptions(prev => ({
      ...prev,
      [option]: value
    }))
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ToolSidebar
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
        toolOptions={toolOptions}
        onToolOptionsChange={handleToolOptionsChange}
      />
      <CanvasWorkspace
        selectedTool={selectedTool}
        toolOptions={toolOptions}
        onElementSelect={setSelectedElement}
      />
    </div>
  )
}

export default DesignStudio