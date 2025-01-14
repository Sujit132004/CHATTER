import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useAuthContext } from "./context/AuthContext"
function App() {
  const {authUser} =useAuthContext();

  return (
    <div className="bg-[url('/wallpaper.jpeg')] bg-cover bg-center h-screen">
      <div className="p-4 h-screen flex items-center justify-center ">
        <Routes>
          <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
          <Route path="/login" element={ authUser ? <Navigate to="/" />: <Login/>}/>
          <Route path="/signup" element={authUser ? <Navigate to="/" />: <Signup/>}/>
        </Routes>
    </div>
    </div>
    
  )
}

export default App
