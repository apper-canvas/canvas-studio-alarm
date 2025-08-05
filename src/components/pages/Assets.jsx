import { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import assetService from "@/services/api/assetService"

const Assets = () => {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const assetTypes = [
    { id: "all", name: "All Assets", icon: "Folder" },
    { id: "images", name: "Images", icon: "Image" },
    { id: "icons", name: "Icons", icon: "Star" },
    { id: "fonts", name: "Fonts", icon: "Type" },
    { id: "graphics", name: "Graphics", icon: "Shapes" }
  ]

  const loadAssets = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await assetService.getAll()
      setAssets(data)
    } catch (err) {
      setError("Failed to load assets. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAssets()
  }, [])

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || asset.type === selectedType
    return matchesSearch && matchesType
  })

  const renderAssetPreview = (asset) => {
    const bgColors = {
      images: "from-green-50 to-emerald-100 text-green-300",
      icons: "from-yellow-50 to-amber-100 text-yellow-300",
      fonts: "from-blue-50 to-indigo-100 text-blue-300",
      graphics: "from-purple-50 to-violet-100 text-purple-300"
    }

    const iconMap = {
      images: "Image",
      icons: "Star",
      fonts: "Type",
      graphics: "Shapes"
    }

    return (
      <div className={`aspect-square bg-gradient-to-br ${bgColors[asset.type] || bgColors.images} rounded-lg flex items-center justify-center relative overflow-hidden`}>
        {asset.preview ? (
          <img src={asset.preview} alt={asset.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <ApperIcon name={iconMap[asset.type] || "File"} size={32} className="mx-auto mb-2" />
            <p className="text-sm capitalize">{asset.type}</p>
          </div>
        )}
      </div>
    )
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadAssets} />

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Design Assets</h1>
          <p className="text-gray-600">Browse and manage your design resources</p>
        </div>
        <Button>
          <ApperIcon name="Upload" size={16} className="mr-2" />
          Upload Assets
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-surface border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-4">Asset Types</h3>
            <div className="space-y-2">
              {assetTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center ${
                    selectedType === type.id
                      ? "bg-accent text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ApperIcon name={type.icon} size={16} className="mr-2" />
                  {type.name}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-primary mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <ApperIcon name="FolderPlus" size={16} className="mr-2" />
                  New Folder
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <ApperIcon name="Trash2" size={16} className="mr-2" />
                  Trash
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ApperIcon name="Filter" size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="ghost" size="sm">
                <ApperIcon name="Grid3X3" size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <ApperIcon name="List" size={16} />
              </Button>
            </div>
          </div>

          {filteredAssets.length === 0 ? (
            <Empty
              icon="Package"
              title="No assets found"
              description="Upload your first assets or try adjusting your search"
              actionLabel="Upload Assets"
              onAction={() => console.log("Upload assets")}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredAssets.map((asset) => (
                <Card key={asset.Id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] p-3">
                  {renderAssetPreview(asset)}
                  
                  <div className="mt-3 space-y-1">
                    <h3 className="font-medium text-sm text-primary group-hover:text-accent transition-colors truncate">
                      {asset.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {asset.type}
                      </span>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                        <ApperIcon name="Download" size={12} />
                      </Button>
                    </div>
                    {asset.size && (
                      <p className="text-xs text-gray-500">
                        {asset.size}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Assets