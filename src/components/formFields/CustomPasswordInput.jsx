import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';

import { Iconify } from '../iconify/iconify';

export function CustomPasswordInput({ value, onChange, error, onBlur, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <OutlinedInput
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
            {showPassword ? (
              <Iconify icon="ion:eye-outline" height={20} width={20} />
            ) : (
              <Iconify icon="formkit:eyeclosed" height={20} width={20} />
            )}
          </IconButton>
        </InputAdornment>
      }
      {...props}
    />
  );
}

CustomPasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
};