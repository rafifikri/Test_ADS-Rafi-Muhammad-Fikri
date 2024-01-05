export function Input(props) {
  const {
    label,
    id,
    type,
    onChange,
    placeholder,
    value,
    defaultValue,
    className,
    name,
  } = props;

  return (
    <div className="w-full flex flex-col">
      <label className="text-black py-3" htmlFor={id}>
        {label}
      </label>
      <input
        className={`border rounded border-gray-300 focus:outline-none py-4 px-3 w-full ${
          className || ""
        }`}
        type={type}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
