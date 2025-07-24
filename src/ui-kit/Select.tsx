import {
  Select as Root,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/shadcn/components/Select.tsx';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
}

export function Select({ value, onChange, placeholder = 'Choose...', options }: SelectProps) {
  return (
    <Root value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Root>
  );
}
