import React, { useRef, useState } from 'react';
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import { Iconify } from '../iconify/iconify';

export const DeleteConfirmationPasswordPopover = ({ title, onDelete, passwordInput, disabled }) => {
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
  
    const handleConfirm = () => {
      if (passwordInput && !password) return;
      onDelete(passwordInput ? password : null);
      setPassword('');
      setOpen(false);
    };
  
    return (
      <>
        <IconButton 
          ref={anchorRef}
          onClick={() => setOpen(true)}
          title="Delete"
          disabled={disabled}
          color="error"
        >
          <Iconify icon="ic:outline-delete" width={24} height={24} color="error" />
        </IconButton>
  
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              {title}
            </Typography>
            
            {passwordInput && (
              <TextField
                fullWidth
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
  
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button 
                variant="text" 
                onClick={() => setOpen(false)}
                size='small'
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={handleConfirm}
                disabled={passwordInput && !password}
                size='small'
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Popover>
      </>
    );
  };