
import { Trash2, Plus } from "lucide-react";
import type { FormField } from "../types/form";
import { useTheme } from "../context/ThemeContext";

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Text Area" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
];

interface FormEditorProps {
  fields: FormField[];
  onAddField: (field: FormField) => void;
  onUpdateField: (id: string, field: Partial<FormField>) => void;
  onDeleteField: (id: string) => void;
}

export default function FormEditor({
  fields,
  onAddField,
  onUpdateField,
  onDeleteField,
}: FormEditorProps) {
  const { theme } = useTheme();

  const handleAddField = () => {
    onAddField({
      id: "",
      type: "text",
      label: "New Field",
      placeholder: "",
      required: false,
    });
  };

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div
          key={field.id}
          className="border rounded-md p-4"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 space-y-4">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.text }}
              >  

              Add a new field
              </h2>
                
              <input
                type="text"
                value={field.label}
                onChange={(e) =>
                  onUpdateField(field.id, { label: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                placeholder="Field Label"
              />

              <select
                value={field.type}
                onChange={(e) =>
                  onUpdateField(field.id, {
                    type: e.target.value as FormField["type"],
                  })
                }
                className="px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
              >
                {fieldTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={field.placeholder || ""}
                onChange={(e) =>
                  onUpdateField(field.id, { placeholder: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                placeholder="Placeholder text"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    onUpdateField(field.id, { required: e.target.checked })
                  }
                />
                Required
              </label>
            </div>

            <button
              onClick={() => onDeleteField(field.id)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddField}
        className="w-full py-3 flex items-center justify-center gap-2 rounded-md"
        style={{
          backgroundColor: theme.colors.primary,
          color: "white",
        }}
      >
        <Plus size={20} />
        Add Field
      </button>
    </div>
  );
}
