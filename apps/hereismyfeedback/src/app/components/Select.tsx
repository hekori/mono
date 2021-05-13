interface SelectProps {
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  label?: string;
  error?: string;
  type?: "text" | "email" | "password";
  options: {
    value: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  }[];
}

export const Select: React.FC<SelectProps> = ({
  options,
  name,
  value,
  label,
  error,
}) => {
  return (
    <>
      <select
        name={name}
        value={value}
        onClick={() => {
          console.log("clicked");
        }}
        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.selected}
            disabled={option.disabled}
            hidden={option.hidden}
          >
            {option.label}
          </option>
        ))}
      </select>
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
