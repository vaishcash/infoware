
import { useTheme } from "../context/ThemeContext";

export default function ThemeCustomizer() {
  const { theme, updateTheme } = useTheme();

  const handleColorChange = (key: keyof typeof theme.colors, value: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [key]: value,
      },
    });

    localStorage.setItem("formBuilderTheme", JSON.stringify(theme));
  };

  const handleFontFamilyChange = (value: string) => {
    updateTheme({
      typography: {
        ...theme.typography,
        fontFamily: value,
      },
    });
  };

  const handleFontSizeChange = (
    key: keyof typeof theme.typography.fontSize,
    value: string
  ) => {
    updateTheme({
      typography: {
        ...theme.typography,
        fontSize: {
          ...theme.typography.fontSize,
          [key]: value,
        },
      },
    });
  };

  return (
    <div
      className="mb-6 p-4 rounded-lg shadow-md "
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
      }}
    >
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: theme.colors.text }}
      >
        Theme Customization
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        <div className="space-y-2 ">
          <h3 className="font-medium">Colors</h3>
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center gap-2">
              <label className="text-sm capitalize">{key}:</label>
              <input
                type="color"
                value={value}
                onChange={(e) =>
                  handleColorChange(
                    key as keyof typeof theme.colors,
                    e.target.value
                  )
                }
                className="w-8 h-8 rounded"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Typography</h3>
          <div className="space-y-2">
            <label className="text-sm">Font Family:</label>
            <select
              value={theme.typography.fontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            >
              <option value="Inter, system-ui, sans-serif">Inter</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
            </select>
          </div>

          {Object.entries(theme.typography.fontSize).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="text-sm capitalize">{key} Font Size:</label>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  handleFontSizeChange(
                    key as keyof typeof theme.typography.fontSize,
                    e.target.value
                  )
                }
                className="w-full px-2 py-1 border rounded"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
