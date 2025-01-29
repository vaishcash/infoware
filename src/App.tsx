import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import FormBuilder from "./components/FormBuilder";
import FormPreviewPage from "./pages/FormPreviewPage";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/preview" element={<FormPreviewPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
