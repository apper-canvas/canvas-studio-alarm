import { useEffect, useRef, useState } from "react"
import { fabric } from "fabric"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Slider from "@/components/atoms/Slider"
import ApperIcon from "@/components/ApperIcon"
import LayerPanel from "@/components/organisms/LayerPanel"
import PropertyPanel from "@/components/organisms/PropertyPanel"
import { cn } from "@/utils/cn"

const CanvasWorkspace = ({ selectedTool, toolOptions, onElementSelect }) => {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(false)
  const [showRulers, setShowRulers] = useState(false)
  const [selectedObject, setSelectedObject] = useState(null)
  const [canvasObjects, setCanvasObjects] = useState([])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true
      })

      // Canvas event handlers
      fabricCanvas.on("selection:created", (e) => {
        setSelectedObject(e.target)
        onElementSelect(e.target)
      })

      fabricCanvas.on("selection:updated", (e) => {
        setSelectedObject(e.target)
        onElementSelect(e.target)
      })

      fabricCanvas.on("selection:cleared", () => {
        setSelectedObject(null)
        onElementSelect(null)
      })

      fabricCanvas.on("object:added", () => {
        updateCanvasObjects(fabricCanvas)
        saveState(fabricCanvas)
      })

      fabricCanvas.on("object:removed", () => {
        updateCanvasObjects(fabricCanvas)
        saveState(fabricCanvas)
      })

      fabricCanvas.on("object:modified", () => {
        saveState(fabricCanvas)
      })

      setCanvas(fabricCanvas)

      return () => {
        fabricCanvas.dispose()
      }
    }
  }, [onElementSelect])

  // Update canvas objects list
  const updateCanvasObjects = (fabricCanvas) => {
    const objects = fabricCanvas.getObjects().map((obj, index) => ({
      id: obj.id || `object-${index}`,
      type: obj.type,
      name: obj.name || `${obj.type} ${index + 1}`,
      visible: obj.visible !== false,
      object: obj
    }))
    setCanvasObjects(objects)
  }

  // Save canvas state for undo/redo
  const saveState = (fabricCanvas) => {
    const state = JSON.stringify(fabricCanvas.toJSON())
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(state)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Handle tool actions
  useEffect(() => {
    if (!canvas || !selectedTool) return

    const handleCanvasClick = (e) => {
      if (selectedTool === "text") {
        addTextElement(e.pointer)
      } else if (selectedTool === "rectangle") {
        addRectangle(e.pointer)
      } else if (selectedTool === "circle") {
        addCircle(e.pointer)
      }
    }

    canvas.on("mouse:down", handleCanvasClick)

    return () => {
      canvas.off("mouse:down", handleCanvasClick)
    }
  }, [canvas, selectedTool, toolOptions])

  // Add text element
  const addTextElement = (pointer) => {
    if (!canvas) return

    const text = new fabric.IText(toolOptions.text || "Edit text", {
      left: pointer.x,
      top: pointer.y,
      fontSize: toolOptions.fontSize || 20,
      fill: toolOptions.color || "#000000",
      fontFamily: toolOptions.fontFamily || "Inter",
      name: `Text ${canvasObjects.length + 1}`
    })

    text.id = `text-${Date.now()}`
    canvas.add(text)
    canvas.setActiveObject(text)
    toast.success("Text element added")
  }

  // Add rectangle
  const addRectangle = (pointer) => {
    if (!canvas) return

    const rect = new fabric.Rect({
      left: pointer.x,
      top: pointer.y,
      width: 100,
      height: 60,
      fill: toolOptions.fillColor || "#0066ff",
      stroke: toolOptions.strokeColor || "#000000",
      strokeWidth: toolOptions.strokeWidth || 0,
      name: `Rectangle ${canvasObjects.length + 1}`
    })

    rect.id = `rect-${Date.now()}`
    canvas.add(rect)
    canvas.setActiveObject(rect)
    toast.success("Rectangle added")
  }

  // Add circle
  const addCircle = (pointer) => {
    if (!canvas) return

    const circle = new fabric.Circle({
      left: pointer.x,
      top: pointer.y,
      radius: 40,
      fill: toolOptions.fillColor || "#0066ff",
      stroke: toolOptions.strokeColor || "#000000",
      strokeWidth: toolOptions.strokeWidth || 0,
      name: `Circle ${canvasObjects.length + 1}`
    })

    circle.id = `circle-${Date.now()}`
    canvas.add(circle)
    canvas.setActiveObject(circle)
    toast.success("Circle added")
  }

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!canvas) return

    const reader = new FileReader()
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        img.scale(0.5)
        img.set({
          left: 100,
          top: 100,
          name: `Image ${canvasObjects.length + 1}`
        })
        img.id = `img-${Date.now()}`
        canvas.add(img)
        canvas.setActiveObject(img)
        toast.success("Image added")
      })
    }
    reader.readAsDataURL(file)
  }

  // Zoom controls
  const handleZoomChange = (newZoom) => {
    if (!canvas) return
    
    setZoom(newZoom)
    const zoomValue = newZoom / 100
    canvas.setZoom(zoomValue)
    canvas.renderAll()
  }

  // Undo/Redo
  const handleUndo = () => {
    if (historyIndex > 0 && canvas) {
      const prevState = history[historyIndex - 1]
      canvas.loadFromJSON(prevState, () => {
        canvas.renderAll()
        setHistoryIndex(historyIndex - 1)
        updateCanvasObjects(canvas)
      })
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && canvas) {
      const nextState = history[historyIndex + 1]
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll()
        setHistoryIndex(historyIndex + 1)
        updateCanvasObjects(canvas)
      })
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      } else if ((e.ctrlKey && e.key === "y") || (e.ctrlKey && e.shiftKey && e.key === "Z")) {
        e.preventDefault()
        handleRedo()
      } else if (e.key === "Delete" && selectedObject) {
        canvas.remove(selectedObject)
        toast.success("Element deleted")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [historyIndex, history, selectedObject, canvas])

  // Delete selected object
  const deleteSelected = () => {
    if (selectedObject && canvas) {
      canvas.remove(selectedObject)
      toast.success("Element deleted")
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between p-4 bg-surface border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <ApperIcon name="Undo" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <ApperIcon name="Redo" size={16} />
            </Button>
          </div>

          <div className="w-px h-6 bg-gray-300" />

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Zoom:</span>
            <div className="flex items-center space-x-2 w-32">
              <Slider
                value={zoom}
                onChange={handleZoomChange}
                min={25}
                max={200}
                step={25}
              />
            </div>
            <span className="text-sm font-medium w-12">{zoom}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={showGrid ? "primary" : "ghost"}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
          >
            <ApperIcon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={showRulers ? "primary" : "ghost"}
            size="sm"
            onClick={() => setShowRulers(!showRulers)}
          >
            <ApperIcon name="Ruler" size={16} />
          </Button>
          {selectedObject && (
            <Button
              variant="danger"
              size="sm"
              onClick={deleteSelected}
            >
              <ApperIcon name="Trash2" size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex relative">
        <div className="flex-1 p-8 flex items-center justify-center canvas-container">
          <div className="relative">
            {showRulers && (
              <>
                {/* Horizontal Ruler */}
                <div className="absolute -top-6 left-0 right-0 h-6 bg-gray-100 border-b border-gray-300 flex items-end">
                  {Array.from({ length: 81 }, (_, i) => (
                    <div
                      key={i}
                      className="w-[10px] border-r border-gray-300 text-xs text-gray-500"
                      style={{ height: i % 10 === 0 ? "16px" : "8px" }}
                    >
                      {i % 10 === 0 && i > 0 && (
                        <span className="absolute -top-4 text-xs">{i * 10}</span>
                      )}
                    </div>
                  ))}
                </div>
                {/* Vertical Ruler */}
                <div className="absolute -left-6 top-0 bottom-0 w-6 bg-gray-100 border-r border-gray-300 flex flex-col items-end">
                  {Array.from({ length: 61 }, (_, i) => (
                    <div
                      key={i}
                      className="h-[10px] border-b border-gray-300 text-xs text-gray-500"
                      style={{ width: i % 10 === 0 ? "16px" : "8px" }}
                    >
                      {i % 10 === 0 && i > 0 && (
                        <span className="absolute -left-4 transform -rotate-90 text-xs">
                          {i * 10}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            <canvas
              ref={canvasRef}
              className={cn(
                "fabric-canvas shadow-lg",
                showGrid && "bg-grid-pattern"
              )}
            />
          </div>
        </div>

        {/* Layer Panel */}
        <LayerPanel
          objects={canvasObjects}
          selectedObject={selectedObject}
          onObjectSelect={(obj) => {
            if (canvas) {
              canvas.setActiveObject(obj)
              canvas.renderAll()
            }
          }}
          onObjectToggle={(obj) => {
            obj.visible = !obj.visible
            if (canvas) {
              canvas.renderAll()
              updateCanvasObjects(canvas)
            }
          }}
          onObjectDelete={(obj) => {
            if (canvas) {
              canvas.remove(obj)
              toast.success("Element deleted")
            }
          }}
        />
      </div>

      {/* Property Panel */}
      {selectedObject && (
        <PropertyPanel
          selectedObject={selectedObject}
          onPropertyChange={(property, value) => {
            if (selectedObject && canvas) {
              selectedObject.set(property, value)
              canvas.renderAll()
            }
          }}
        />
      )}

      {/* Hidden file input for image upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleImageUpload(e.target.files[0])
          }
        }}
        style={{ display: "none" }}
        id="image-upload"
      />
    </div>
  )
}

export default CanvasWorkspace