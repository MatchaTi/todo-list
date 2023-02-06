export default function Button({ children, type = "button", className = "bg-sky-400", ...props }) {
  return (
    <button type={type} {...props} className={`${className} p-2 text-white rounded-md shadow-md`}>
      {children}
    </button>
  );
}
