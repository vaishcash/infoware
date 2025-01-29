
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import FormPreview from "../components/FormPreview";


export default function FormPreviewPage() {
  const location = useLocation();
  const { theme } = useTheme();
  const fields = location.state?.fields || [];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <div className="max-w-4xl mx-auto p-6">
        <Link
          to="/form-builder"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Editor
        </Link>

        <div
          className="bg-white rounded-xl shadow-xl p-8"
          style={{
            backgroundColor: theme.colors.background,
            color: "white",
            fontSize: theme.typography.fontSize.base,
          }}
        >
          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: theme.colors.text }}
          >
            Form Preview
          </h1>
          <FormPreview fields={fields} />
        </div>
      </div>
    </div>
  );
}
