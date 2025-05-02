import { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import FormInput from './FormInput';

const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      {...props}
      icon={
        <button
          type="button"
          className="absolute right-0 top-0 h-full px-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FiEyeOff className="text-gray-400" />
          ) : (
            <FiEye className="text-gray-400" />
          )}
        </button>
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;