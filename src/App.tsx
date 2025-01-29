import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import FormBuilder from "./components/FormBuilder";
import FormPreviewPage from "./pages/FormPreviewPage";
import Login from "./pages/Login";
import { useEffect } from "react";

function RouteComponent()
{   const navigate = useNavigate();
  useEffect(() => {
    
    navigate("/login");
  }, [navigate]);
  return (
    <>

    </>)
}
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<RouteComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/preview" element={<FormPreviewPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
