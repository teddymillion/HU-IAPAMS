'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const CustomSelect = ({ value, label, onChange, options, error, ...props }) => {
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        {...props}
        sx={{ width: '100%' }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};