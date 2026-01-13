import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  clearable?: boolean;
  onClear?: () => void;
}

function Input({ className, type, clearable, onClear, value, onChange, ...props }: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const showClear = clearable && value && String(value).length > 0;

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, '');

      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }

    onClear?.();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type={type}
        data-slot="input"
        value={value}
        onChange={onChange}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          clearable && showClear && 'pr-8',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground focus:ring-ring absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-300 p-0.5 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          aria-label="清除"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export { Input };
