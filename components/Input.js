const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"


// Static Props
export async function getStaticProps({ params }) {
  return {
    props: {
      handleChange: params.handleChange,
      value: params.value,
      labelText: params.labelText,
      labelFor: params.labelFor,
      id: params.id,
      name: params.name,
      type: params.type,
      isRequired: params.isRequired,
      placeholder: params.placeholder,
      customClass: params.customClass,
      hasError: params.hasError,
      error: params.error,
    }
  }
}


// Component
export default function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
    customClass,
    hasError = false,
    error = ''
}){
    return(
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
              {labelText}
            </label>
            <input
              onChange={handleChange}
              value={value}
              id={id}
              name={name}
              type={type}
              required={isRequired}
              className={fixedInputClass+customClass}
              placeholder={placeholder}
        />
        {
          hasError && <p className="text-red-500 text-xs italic">{error}</p>
        }
      </div>
    )
}