// src/components/ui/textarea.tsx
import React from "react";

interface TextareaProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border rounded-md p-2" // Ты можешь изменить стили
    />
  );
};

export default Textarea;
