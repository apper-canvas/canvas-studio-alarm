import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  required, 
  placeholder,
  className,
  ...props 
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default FormField