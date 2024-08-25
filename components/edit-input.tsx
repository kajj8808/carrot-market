interface EditInputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  text: string;
  errors?: string[];
}
export default function EditInput({
  type,
  placeholder,
  id,
  name,
  text,
  errors,
}: EditInputProps) {
  return (
    <div className="flex flex-col gap-px">
      <label htmlFor={id}>{text}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="rounded-md border p-2.5 outline-none"
      />
      {errors && <span className="red-500 text-sm">{errors.join(" ")}</span>}
    </div>
  );
}
