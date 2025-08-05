import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="text-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <ApperIcon 
            name="Palette" 
            size={20} 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent"
          />
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading