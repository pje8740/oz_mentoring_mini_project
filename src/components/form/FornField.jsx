import { cn } from "@utils";

function FormField({
  autoComplete,
  error,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className={cn(
          "rounded-lg border px-4 py-2.5 transition-colors",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus:ring-2 focus:outline-none",
          error
            ? "border-red-500 focus:ring-red-500/20 dark:border-red-400"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:focus:border-blue-400",
        )}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default FormField;
