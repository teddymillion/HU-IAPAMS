import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  Divider,
  Avatar,
  Badge,
  Alert,
  Tabs,
  Tab,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  Close as CloseIcon,
  Description as DescriptionIcon,
  HowToReg as AppliedIcon,
  EventBusy as ClosedIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { getPositions } from '../../services/positionService';
import { useAuth } from '../../context/authContext';
import { getMyApplications ,applyToPosition} from '../../services/applicationService';




const AvailablePositions = () => {
  const { auth } = useAuth();
  const [positions, setPositions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [tabValue, setTabValue] = useState('all');
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: []
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [positionsRes, applicationsRes] = await Promise.all([
        getPositions({ status: 'open' }, auth.tokens.accessToken),
        getMyApplications(auth.tokens.accessToken)
      ]);

      if (positionsRes.success) setPositions(positionsRes.data);
      if (applicationsRes.success) {
        setApplications(Array.isArray(applicationsRes.data) ? applicationsRes.data : []);
      }
      
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load data');
      setIsLoading(false);
    }
  };

  // Filter positions based on search, filters and tab
  useEffect(() => {
    let result = positions;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by department
    if (departmentFilter !== 'all') {
      result = result.filter(p => p.department === departmentFilter);
    }
    
    // Filter by tab
    if (tabValue === 'applied') {
      const appliedPositionIds = applications?.map(a => a.position._id);
      result = result.filter(p => appliedPositionIds.includes(p._id));
    } else if (tabValue === 'eligible') {
      const appliedPositionIds = applications?.map(a => a.position._id);
      result = result.filter(p => !appliedPositionIds.includes(p._id));
    }
    
    setFilteredPositions(result);
  }, [positions, applications, searchTerm, departmentFilter, tabValue]);

  const handleApply = async (positionId) => {
    if (!files.cv) {
      toast.error('CV is required');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('position', positionId);
      formData.append('documents.cv', files.cv);
      if (files.coverLetter) formData.append('documents.coverLetter', files.coverLetter);
      files.certificates.forEach(cert => {
        formData.append('documents.certificates', cert);
      });

      console.log('Form Data:', formData); // Debugging line
      const res = await applyToPosition(formData, auth.tokens.accessToken);
      if (res.success) {
        toast.success('Application submitted successfully!');
        setOpenDialog(false);
        fetchData(); // Refresh data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  const getApplicationStatus = (positionId) => {
    if (!Array.isArray(applications)) return null;
    
    const application = applications.find(a => a.position?._id === positionId);
    if (!application) return null;
    
    switch (application.status) {
      case 'pending': return { text: 'Applied', color: 'warning' };
      case 'under_review': return { text: 'Under Review', color: 'info' };
      case 'shortlisted': return { text: 'Shortlisted', color: 'success' };
      case 'rejected': return { text: 'Not Selected', color: 'error' };
      default: return { text: 'Applied', color: 'warning' };
    }
  };

  const departments = [
    'all',
    'engineering', 
    'hr', 
    'finance', 
    'it', 
    'research', 
    'quality'
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="green">
          Available Positions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Apply for open positions at Haramaya University
        </Typography>
      </Box>

      {/* Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search positions..."
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'background.paper'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Department"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'background.paper'
                }
              }}
            >
              {departments.map(dept => (
                <MenuItem key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept.charAt(0).toUpperCase() + dept.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('all');
              }}
              sx={{ height: '56px', borderRadius: 3 }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Positions" value="all" />
          <Tab label="Eligible to Apply" value="eligible" />
          <Tab label="My Applications" value="applied" />
        </Tabs>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* No Results */}
      {!isLoading && filteredPositions.length === 0 && (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {tabValue === 'applied' 
              ? "You haven't applied to any positions yet"
              : "No available positions match your criteria"}
          </Typography>
        </Paper>
      )}

      {/* Positions Grid */}
      <Grid container spacing={3}>
        {filteredPositions && filteredPositions.map((position) => {
          const applicationStatus = getApplicationStatus(position._id);
          const deadlinePassed = new Date(position.deadline) < new Date();

          return (
            <Grid item key={position._id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip 
                      label={position.department} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Box>
                      {deadlinePassed && (
                        <Chip
                          icon={<ClosedIcon fontSize="small" />}
                          label="Closed"
                          size="small"
                          color="error"
                          sx={{ ml: 1 }}
                        />
                      )}
                      {applicationStatus && (
                        <Chip
                          icon={<AppliedIcon fontSize="small" />}
                          label={applicationStatus.text}
                          size="small"
                          color={applicationStatus.color}
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {position.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {position.description.length > 150 
                      ? `${position.description.substring(0, 150)}...` 
                      : position.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <CalendarTodayIcon color="action" sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography variant="caption">
                      Deadline: {new Date(position.deadline).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  <Button
                    size="small"
                    startIcon={<DescriptionIcon />}
                    onClick={() => {
                      setSelectedPosition(position);
                      setOpenDialog(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Details
                  </Button>

                  {!applicationStatus && !deadlinePassed && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setSelectedPosition(position);
                        setOpenDialog(true);
                      }}
                      sx={{ ml: 'auto',
                        bgcolor:'green',
                        opacity: 0.9,
                        '&:hover': { bgcolor: 'green', opacity: 1 },
                       }}
                    >
                      Apply Now
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Position Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {selectedPosition?.title}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedPosition && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Department: {selectedPosition.department}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Position Type: {selectedPosition.positionType}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Deadline: {new Date(selectedPosition.deadline).toLocaleDateString()}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Description
                </Typography>
                <Typography paragraph>
                  {selectedPosition.description}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Requirements
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {selectedPosition.requirements?.map((req, i) => (
                    <Box component="li" key={i} sx={{ mb: 1 }}>
                      <Typography>{req}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              
              {getApplicationStatus(selectedPosition._id) && (
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    You've already applied to this position. Status: {getApplicationStatus(selectedPosition._id).text}
                  </Alert>
                </Grid>
              )}

              {!getApplicationStatus(selectedPosition._id) && new Date(selectedPosition.deadline) >= new Date() && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                    Apply for this Position
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Required Documents
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <input
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        id="cv-upload"
                        type="file"
                        onChange={(e) => setFiles({...files, cv: e.target.files[0]})}
                      />
                      <label htmlFor="cv-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<DescriptionIcon />}
                          sx={{ mr: 2 }}
                        >
                          Upload CV *
                        </Button>
                      </label>
                      {files.cv && (
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {files.cv.name}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <input
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        id="cover-letter-upload"
                        type="file"
                        onChange={(e) => setFiles({...files, coverLetter: e.target.files[0]})}
                      />
                      <label htmlFor="cover-letter-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<DescriptionIcon />}
                          sx={{ mr: 2 }}
                        >
                          Upload Cover Letter
                        </Button>
                      </label>
                      {files.coverLetter && (
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {files.coverLetter.name}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <input
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        id="certificates-upload"
                        type="file"
                        multiple
                        onChange={(e) => setFiles({...files, certificates: [...e.target.files]})}
                      />
                      <label htmlFor="certificates-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<DescriptionIcon />}
                          sx={{ mr: 2 }}
                        >
                          Upload Certificates
                        </Button>
                      </label>
                      {files.certificates.length > 0 && (
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {files.certificates.length} file(s) selected
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            Close
          </Button>
          
          {!getApplicationStatus(selectedPosition?._id) && 
            new Date(selectedPosition?.deadline) >= new Date() && (
            <Button 
              variant="contained"
              onClick={() => handleApply(selectedPosition._id)}
              disabled={!files.cv || isLoading}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                '&:disabled': { bgcolor: 'action.disabled' }
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : `Submit Application`}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AvailablePositions;