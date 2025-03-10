import React from "react";

interface Option {
  id: string | number;
  name: string;
}

interface FormFieldProps {
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  options?: Option[];
}

export default function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  options,
}: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="edit-label">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="edit-input"
          required
        >
          {options?.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="edit-input min-h-[100px]"
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="edit-input"
          required
        />
      )}
    </div>
  );
}
