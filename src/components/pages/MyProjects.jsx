import { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import projectService from "@/services/api/projectService"

const MyProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await projectService.getAll()
      setProjects(data)
    } catch (err) {
      setError("Failed to load projects. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProjects} />

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">My Projects</h1>
          <p className="text-gray-600">Manage and organize your design projects</p>
        </div>
        <Button>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="Grid3X3" size={16} />
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <Empty
          icon="FolderOpen"
          title="No projects found"
          description="Create your first design project to get started"
          actionLabel="New Project"
          onAction={() => console.log("Create new project")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.Id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <ApperIcon name="Image" size={32} className="text-blue-300 mx-auto mb-2" />
                    <p className="text-sm text-blue-400">Preview</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="bg-white text-primary">
                    <ApperIcon name="Edit" size={16} className="mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Modified {new Date(project.lastModified).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    Canvas Project
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProjects