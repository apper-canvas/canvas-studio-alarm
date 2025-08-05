import { useState } from "react"
import { NavLink } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Design Studio", to: "/" },
    { name: "My Projects", to: "/projects" },
    { name: "Templates", to: "/templates" },
    { name: "Assets", to: "/assets" }
  ]

  return (
    <header className="bg-surface border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Palette" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">Canvas Studio</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                    isActive
                      ? "bg-accent text-white"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button size="sm">
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                      isActive
                        ? "bg-accent text-white"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center space-x-3 mt-4 px-4">
              <Button variant="ghost" size="sm" className="flex-1">
                <ApperIcon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <Button size="sm" className="flex-1">
                <ApperIcon name="Save" size={16} className="mr-2" />
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header