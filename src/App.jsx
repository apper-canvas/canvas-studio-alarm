import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import DesignStudio from "@/components/pages/DesignStudio"
import MyProjects from "@/components/pages/MyProjects"
import Templates from "@/components/pages/Templates"
import Assets from "@/components/pages/Assets"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DesignStudio />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="templates" element={<Templates />} />
            <Route path="assets" element={<Assets />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App