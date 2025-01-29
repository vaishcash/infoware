
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import FormBuilder from "./components/FormBuilder";
import FormPreviewPage from "./components/FormPreviewPage";


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/preview" element={<FormPreviewPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
