import { FieldError } from 'react-hook-form';

interface FileInputFieldProps {
  id: string;
  label: string;
  error: FieldError | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
}

export const FileInputField = ({
  id,
  label,
  error,
  fileInputRef,
  onChange,
  accept = "image/*",
  required = false
}: FileInputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`text-xs text-foreground-600 ${error ? "!text-[hsl(339,90%,51%)]" : ""}`}
      >
        {label} {required && '*'}
      </label>
      <input
        id={id}
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={onChange}
        className={`w-full p-2 border-2 border-neutral-700 text-zinc-300 text-xs rounded-md mt-1 ${error ? "!border-[hsl(339,90%,51%)]" : ""
          }`}
      />
      {error && (
        <p className="text-[hsl(339,90%,51%)] text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};