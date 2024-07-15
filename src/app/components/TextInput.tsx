import { FC, useMemo, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  value: string;
  onChangeText(str: string): void;
};

const init = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%) scale(1)',
};
const end = {
  top: '0',
  left: '0',
  transform: 'translate(2px,2px) scale(0.75)',
};

const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const isTopLeft = useMemo(() => {
    return focus || value;
  }, [focus, value]);
  const [spring, api] = useSpring(() => {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%) scale(1)',
    };
  });

  return (
    <div
      className="px-[8px] py-[5px] h-[50px] rounded-[8px] relative border-[1px]"
      ref={containerRef}>
      <input
        ref={inputRef}
        onFocus={(e) => {
          api.start(end);
          onFocus?.(e);
          setFocus(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setFocus(false);
        }}
        value={value}
        className="bg-[transparent] text-center text-[14px] text-[#181717] w-full h-[30px] leading-[30px]  focus:border-none focus:outline-none"
        onChange={(e) => onChangeText(e.target.value)}
        {...props}
      />
      {label && (
        <animated.div
          style={{
            ...spring,
          }}
          onClick={() => {
            inputRef.current?.blur();
            setTimeout(() => {
              inputRef.current?.focus();
            }, 200);
          }}
          className={`text-[12px] text-[#a5a3a3]  z-[2] absolute cursor-pointer`}>
          {label}
        </animated.div>
      )}
    </div>
  );
};
export default TextInput;
