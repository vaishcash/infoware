import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { FormField } from "../types/form";
import { useTheme } from "../context/ThemeContext";
import ThemeCustomizer from "./ThemeCustomizer";
import FormEditor from "./FormEditor";
import { Eye, LogOut, Settings } from "lucide-react";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";

export default function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const addField = (field: FormField) => {
    setFields((prev) => [...prev, { ...field, id: crypto.randomUUID() }]);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handlePreview = () => {
    navigate("/preview", { state: { fields } });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      style={{ fontFamily: theme.typography.fontFamily }}
    >
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Logout</span>
        </button>

        <div className="text-center mb-8 max-md:mt-30">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            Form Builder
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Create beautiful, customizable forms in minutes
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowThemeCustomizer(!showThemeCustomizer)}
              className="flex items-center gap-2 px-6 py-3 rounded-md transition-all hover:scale-105"
              style={{
                backgroundColor: theme.colors.secondary,
                color: "white",
              }}
            >
              <span className="max-md:hidden">Customize Theme</span>
              <Settings size={20} />
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-6 py-3 rounded-md transition-all hover:scale-105"
              style={{
                backgroundColor: theme.colors.primary,
                color: "white",
              }}
            >
              <Eye size={20} />
              Preview Form
            </button>
          </div>
        </div>

        {showThemeCustomizer && <ThemeCustomizer />}

        <div className="bg-white rounded-xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
          <FormEditor
            fields={fields}
            onAddField={addField}
            onUpdateField={updateField}
            onDeleteField={deleteField}
          />
        </div>
      </div>
    </div>
  );
}
