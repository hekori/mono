interface InputProps {
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number";
}
export const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  required = false,
  label,
  error,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      />
      {label && (
        <label
          htmlFor={name}
          className="duration-300 -z-1 origin-0 text-gray-500 text-sm"
        >
          {label}
        </label>
      )}
      {error && (
        <span className="text-sm text-red-600 hidden" id="error">
          {error}
        </span>
      )}
    </>
  );
};
