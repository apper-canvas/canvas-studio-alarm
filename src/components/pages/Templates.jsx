import { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import templateService from "@/services/api/templateService"

const Templates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "business", name: "Business Cards" },
    { id: "social", name: "Social Media" },
    { id: "print", name: "Print Design" },
    { id: "web", name: "Web Graphics" },
    { id: "presentations", name: "Presentations" }
  ]

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await templateService.getAll()
      setTemplates(data)
    } catch (err) {
      setError("Failed to load templates. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTemplates} />

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Design Templates</h1>
          <p className="text-gray-600">Browse professional templates to jumpstart your designs</p>
        </div>
        <Button>
          <ApperIcon name="Upload" size={16} className="mr-2" />
          Upload Template
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-surface border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-accent text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ApperIcon name="SlidersHorizontal" size={16} className="mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <Empty
              icon="Layout"
              title="No templates found"
              description="Try adjusting your search or browse different categories"
              actionLabel="Browse All"
              onAction={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.Id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    {template.thumbnail ? (
                      <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <ApperIcon name="Layout" size={32} className="text-purple-300 mx-auto mb-2" />
                        <p className="text-sm text-purple-400">Template Preview</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-white text-primary">
                          <ApperIcon name="Eye" size={16} className="mr-2" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <ApperIcon name="Plus" size={16} className="mr-2" />
                          Use
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {template.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <ApperIcon name="Download" size={12} className="mr-1" />
                        {template.downloads || 0}
                      </div>
                    </div>
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

export default Templates