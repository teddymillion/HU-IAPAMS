import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, Badge, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { FiUser, FiEdit2, FiKey, FiLogOut, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Header = ({
  title,
  user,
  profilePhoto,
  onLogout,
  onEditProfile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='w-full'
    >
      <AppBar position="fixed" sx={{ backgroundColor: 'green', color: '#fff' }} elevation={4}>
        <Toolbar  sx={{ width: '100%', px: 2 }}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Typography
              variant="h6"
              sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  color: 'green',
                  borderRadius: '50%',
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                }}
              >
                <FiUser />
              </Box>
              {title}
            </Typography>
          </Box>

          {user?.notifications && (
            <IconButton
              color="inherit"
              component={Link}
              to="/notifications"
              sx={{ mr: 1 }}
            >
              <Badge
                color="error"
                variant="dot"
                overlap="circular"
                invisible={!user.notifications.length}
              >
                <FiBell size={20} />
              </Badge>
            </IconButton>
          )}

          <IconButton onClick={handleMenu} color="inherit">
            <Avatar
              src={user?.profilePhoto}
              alt="Profile"
              sx={{ width: 36, height: 36, bgcolor: 'green.500' }}
            >
              {!profilePhoto && <FiUser />}
            </Avatar>
            <Typography sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
              {user.username || user.fullName}
            </Typography>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ mt: 1 }}
          >
            <Box px={2} py={1.5}>
              <Box display="flex" alignItems="center">
                <Avatar
                  src={user?.profilePhoto}
                  alt="Profile"
                  sx={{ width: 48, height: 48, mr: 1 }}
                >
                  {!profilePhoto && <FiUser />}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {user.fullName || user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.role || 'User'}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />

            <MenuItem
              onClick={() => {
                onEditProfile();
                handleClose();
              }}
            >
              <FiEdit2 style={{ marginRight: 8 }} /> Edit Profile
            </MenuItem>

            <MenuItem
              component={Link}
              to="/change-password"
              onClick={handleClose}
            >
              <FiKey style={{ marginRight: 8 }} /> Change Password
            </MenuItem>

            <MenuItem
              onClick={() => {
                onLogout();
                handleClose();
              }}
            >
              <FiLogOut style={{ marginRight: 8 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};
