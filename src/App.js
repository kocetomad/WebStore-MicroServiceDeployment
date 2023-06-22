import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Store_Layouts/Login";
import Register from "./components/pages/Store_Layouts/Register";
import Reset from "./components/pages/Store_Layouts/Reset";
import Dashboard from "./components/pages/Store_Layouts/Dashboard";
import CMS from "./components/pages/CMS_Layouts/CMS";
import AllProducts from "./components/pages/Store_Layouts/AllProducts";

function App() {
  
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} /> 
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/CMS" element={<CMS/>} />
          <Route exact path="/allProducts" element={<AllProducts/>} />
          <Route exact path="/CMS/NewListing" element={<CMS/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;