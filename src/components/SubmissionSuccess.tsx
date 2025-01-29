
import { CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface SubmissionSuccessProps {
  formData: Record<string | number | symbol, string>;
}

export default function SubmissionSuccess({
  formData,
}: SubmissionSuccessProps) {
  const { theme } = useTheme();

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="mb-6">
        <CheckCircle size={64} className="text-green-500" />
      </div>
      <h2
        className="text-3xl font-bold mb-4"
        style={{ color: theme.colors.text }}
      >
        Thank You!
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Your form has been submitted successfully.
      </p>

      <div
        className="w-full max-w-md p-6 rounded-lg"
        style={{ backgroundColor: theme.colors.background }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: theme.colors.text }}
        >
          Submission Details
        </h3>
        <div className="space-y-2">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
