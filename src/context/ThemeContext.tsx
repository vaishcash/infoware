import  { createContext, useContext, useState } from "react";
import type { FormTheme } from "../types/form";

const defaultTheme: FormTheme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1f2937",
    border: "#e5e7eb",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: {
      small: "0.875rem",
      base: "1rem",
      large: "1.25rem",
    },
  },
  spacing: {
    padding: "1rem",
    margin: "1rem",
    borderRadius: "0.375rem",
  },
};

const ThemeContext = createContext<{
  theme: FormTheme;
  updateTheme: (newTheme: Partial<FormTheme>) => void;
}>({
  theme: defaultTheme,
  updateTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<FormTheme>(defaultTheme);

  const updateTheme = (newTheme: Partial<FormTheme>) => {
    setTheme((prev) => ({
      ...prev,
      ...newTheme,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
