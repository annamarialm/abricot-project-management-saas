import './InputField.css';

export default function InputField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  autoComplete,
}) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
