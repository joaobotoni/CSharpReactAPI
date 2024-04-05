function Input({ label, placeholder, type, name, handleChange, value }) {
    return (
        <div className='mb-3 input-group'>
            <label className='input-group-text'>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className='form-control'
                name={name}
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}
export default Input