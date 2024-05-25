const FormInput = ({ label, name, type, value, onChange, size, required }) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`input input-bordered rounded-xl ${size}`}
        required={required}
      />
    </div>
  );
};

export default FormInput;
