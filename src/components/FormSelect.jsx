export default function FormSelect({
  label,
  name,
  list,
  value,
  onChange,
  size,
}) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize"> {label}</span>
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`select select-bordered ${size}`}
      >
        <option value={""}>Todas</option>
        {list.map((item) => {
          return (
            <option className="capitalize" key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
