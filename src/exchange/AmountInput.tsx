import React, { useState } from "react";
import styled from "styled-components";
interface AmountInputProps {
  value: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (text: string) => void;
  className: string;
  placeholder: string;
}

const Input = styled("input")`
  &:focus {
    outline: none;
  }
`;
Input.displayName = "AmountInput";

export function AmountInput({
  value,
  inputRef,
  onChange,
  className,
  placeholder,
}: AmountInputProps) {
  const measureRef = React.useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  React.useEffect(() => {
    const { current: measureEl } = measureRef;
    if (measureEl) {
      measureEl.textContent = value;
      setInputWidth(measureEl.offsetWidth);
    }
  }, [value, inputRef, setInputWidth]);

  return (
    <Input
      dir="rtl"
      className={className}
      ref={inputRef}
      onChange={handleChange}
      value={value}
      width={inputWidth}
      placeholder={placeholder}
    />
  );
}
