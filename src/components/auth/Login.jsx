import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/authContext';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link as MuiLink,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green color
    },
  },
});

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'evaluator', label: 'Evaluator' },
    { value: 'staff', label: 'Academic Staff' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (credentials.username && credentials.password && selectedRole) {
      try {
        const user = await login(credentials.username, credentials.password);
        toast.success('Login successful!, navigating...');
        navigate(`/${user.role}/dashboard`);
      } catch (error) {
        toast.error(error.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please fill in all fields');
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
            <Typography component="h1" variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
              HU-IAPMS
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-label">Select Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={selectedRole}
                  label="Select Role"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select a role</em>
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <MuiLink component={Link} to="/forgot-password" variant="body2" color="primary">
                    Forgot password?
                  </MuiLink>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;