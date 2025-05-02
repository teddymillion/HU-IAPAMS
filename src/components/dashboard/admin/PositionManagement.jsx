import React, { useState } from 'react';
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  CircularProgress,
  Divider,
  Avatar,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/authContext';
import { api } from '../../../utils/api';
import toast from 'react-hot-toast';
import { createPosition , getPositions,getPositionById} from '../../../services/positionService';


// Mock data for positions (replace with actual API calls)
const mockPositions = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'engineering',
    positionType: 'senior',
    status: 'open',
    deadline: '2023-12-31',
    applicants: 15,
    createdAt: '2023-10-15',
    description: 'We are looking for an experienced software engineer to join our team and help build innovative solutions.',
    requirements: ['5+ years of experience', 'Proficiency in JavaScript/TypeScript', 'Experience with React and Node.js'],
    evaluationCriteria: ['Technical Skills', 'Problem Solving', 'Communication']
  },
  {
    id: '2',
    title: 'HR Manager',
    department: 'hr',
    positionType: 'head',
    status: 'open',
    deadline: '2023-11-30',
    applicants: 8,
    createdAt: '2023-10-10',
    description: 'Lead our HR team and develop strategies to attract and retain top talent.',
    requirements: ['7+ years HR experience', 'Leadership skills', 'Knowledge of labor laws'],
    evaluationCriteria: ['Leadership', 'HR Knowledge', 'Interpersonal Skills']
  },
  {
    id: '3',
    title: 'Finance Analyst',
    department: 'finance',
    positionType: 'junior',
    status: 'draft',
    deadline: '2024-01-15',
    applicants: 0,
    createdAt: '2023-10-05',
    description: 'Entry-level position for finance graduates to analyze financial data and prepare reports.',
    requirements: ['Bachelor\'s in Finance', 'Excel proficiency', 'Attention to detail'],
    evaluationCriteria: ['Analytical Skills', 'Excel Proficiency', 'Attention to Detail']
  }
];

const PositionManagement = () => {
  const { auth } = useAuth();
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const user = auth?.user;
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'engineering',
    positionType: 'senior',
    requirements: [],
    deadline: '',
    status: 'draft'
  });
  const [evaluationCriteria, setEvaluationCriteria] = useState(['Technical Skills']);
  const [newCriteria, setNewCriteria] = useState('');

  const departments = [
    'engineering', 'hr', 'finance', 'it', 'legal', 
    'research', 'product', 'quality', 'supply', 'procurement'
  ];

  const positionTypes = ['dean', 'head', 'senior', 'junior'];

  // Filter positions based on search and filters
  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || position.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || position.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddCriteria = () => {
    if (newCriteria.trim()) {
      setEvaluationCriteria([...evaluationCriteria, newCriteria]);
      setNewCriteria('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (status) => {
    setIsLoading(true);
    
    try {
      const positionPayload = {
        title: formData.title,
        description: formData.description,
        department: formData.department,
        positionType: formData.positionType,
        requirements: formData.requirements,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        status: status === 'published' ? 'open' : 'draft',
        evaluationCriteria: evaluationCriteria,
        createdBy: user._id
      };

      // Mock response handling
      const newPosition = {
        ...positionPayload,
        id: `${positions.length + 1}`,
        applicants: 0,
        createdAt: new Date().toISOString()
      };
      res = await createPosition(positionPayload, auth.tokens.accessToken);
        if (!res.success) {
            throw new Error(res.error.message || 'Failed to create position');
        }
        toast.success('Position created successfully!');


      setPositions([...positions, newPosition]);

      toast.success(`Position ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      setOpenModal(false);
      resetForm();
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create position');
      console.error('Error creating position:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      department: 'engineering',
      positionType: 'senior',
      requirements: [],
      deadline: '',
      status: 'draft'
    });
    setEvaluationCriteria(['Technical Skills']);
    setNewCriteria('');
  };

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
    setOpenDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'success';
      case 'draft': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getDepartmentLabel = (dept) => {
    return dept.charAt(0).toUpperCase() + dept.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const getDepartmentColor = (dept) => {
    // Generate a consistent color based on department name
    const colors = [
      '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
      '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ac'
    ];
    const index = departments.indexOf(dept) % colors.length;
    return colors[index];
  };


//    get positions
    const fetchPositions = async () => {
        try {
        const res = await getPositions(auth.tokens.accessToken);
        if (!res.success) {
            throw new Error(res.error.message || 'Failed to fetch positions');
        }
        setPositions(res.data);
        } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch positions');
        console.error('Error fetching positions:', error);
        }
    };

    React.useEffect(() => {
        fetchPositions();
    }, []);
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
          Position Management
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ 
              mr: 2,
              bgcolor: 'green',
              opacity:'0.8',
              '&:hover': { bgcolor: 'primary.dark' }

            }}
          >
            Post New Job
          </Button>
          <Button 
            variant="outlined" 
            startIcon={viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            sx={{
              borderColor: 'primary.main',
              color: 'green',
              opacity:'0.8',
              '&:hover': { borderColor: 'primary.dark' }
            }}
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 2,
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)'
      }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
          Filters
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                sx: { borderRadius: 2 }
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select 
                label="Department"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Departments</MenuItem>
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{getDepartmentLabel(dept)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select 
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('all');
                setStatusFilter('all');
              }}
              sx={{ height: '56px', borderRadius: 2 }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Positions Count */}
      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
        Showing {filteredPositions.length} {filteredPositions.length === 1 ? 'position' : 'positions'}
      </Typography>

      {/* Positions Grid View */}
      {viewMode === 'grid' && (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
               <Grid container spacing={3}>
          {filteredPositions.map((position) => (
            <Grid item key={position.id} xs={12} sm={6} md={4} lg={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
                onClick={() => handlePositionClick(position)}
                elevation={3}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip 
                      label={position.positionType} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ fontWeight: 'medium' }}
                    />
                    <Chip 
                      label={position.status} 
                      size="small" 
                      color={getStatusColor(position.status)}
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Box>
                  <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {position.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: getDepartmentColor(position.department), 
                        width: 24, 
                        height: 24,
                        mr: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {position.department.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {getDepartmentLabel(position.department)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Deadline: {new Date(position.deadline).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ 
                  justifyContent: 'space-between', 
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Badge 
                    badgeContent={position.applicants} 
                    color="primary"
                    sx={{ 
                      '& .MuiBadge-badge': { 
                        right: -5, 
                        top: 5,
                        fontWeight: 'bold'
                      } 
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      Applicants
                    </Typography>
                  </Badge>
                  <Button 
                    size="small" 
                    startIcon={<VisibilityIcon />}
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 'medium'
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>
     
      )}

      {/* Positions List View */}
      {viewMode === 'list' && (
        <Paper sx={{ 
          p: 2,
          borderRadius: 2,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)'
        }}>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1
            }}
          >
            <Grid item xs={4}>Position</Grid>
            <Grid item xs={2}>Department</Grid>
            <Grid item xs={2}>Type</Grid>
            <Grid item xs={2}>Status</Grid>
            <Grid item xs={2}>Actions</Grid>
          </Grid>
          {filteredPositions.map((position) => (
            <Paper 
              key={position.id} 
              sx={{ 
                p: 2, 
                mb: 2, 
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover'
                },
                borderRadius: 2
              }}
              onClick={() => handlePositionClick(position)}
              elevation={0}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <Typography fontWeight="medium" sx={{ mb: 0.5 }}>
                    {position.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                      {new Date(position.deadline).toLocaleDateString()}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: getDepartmentColor(position.department), 
                        width: 24, 
                        height: 24,
                        mr: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {position.department.charAt(0).toUpperCase()}
                    </Avatar>
                    {getDepartmentLabel(position.department)}
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Chip 
                    label={position.positionType} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Chip 
                    label={position.status} 
                    size="small" 
                    color={getStatusColor(position.status)}
                    sx={{ fontWeight: 'medium' }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button 
                    size="small" 
                    startIcon={<VisibilityIcon />}
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 'medium'
                    }}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Paper>
      )}

      {/* Position Details Dialog */}
      <Dialog 
        open={openDetails} 
        onClose={() => setOpenDetails(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {selectedPosition?.title}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDetails(false)}
            sx={{ color: 'primary.contrastText' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedPosition && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Department:</Box>
                  {getDepartmentLabel(selectedPosition.department)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Position Type:</Box>
                  {selectedPosition.positionType}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Status:</Box>
                  <Chip 
                    label={selectedPosition.status} 
                    size="small" 
                    color={getStatusColor(selectedPosition.status)}
                    sx={{ ml: 1, fontWeight: 'medium' }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Deadline:</Box>
                  {new Date(selectedPosition.deadline).toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Applicants:</Box>
                  <Badge 
                    badgeContent={selectedPosition.applicants} 
                    color="primary"
                    sx={{ 
                      '& .MuiBadge-badge': { 
                        right: -5, 
                        top: 5,
                        fontWeight: 'bold'
                      } 
                    }}
                  />
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Posted on:</Box>
                  {new Date(selectedPosition.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Description
                </Typography>
                <Typography paragraph sx={{ color: 'text.secondary' }}>
                  {selectedPosition.description || 'No description provided.'}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Requirements
                </Typography>
                {selectedPosition.requirements?.length > 0 ? (
                  <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                    {selectedPosition.requirements.map((req, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography variant="body1">{req}</Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography paragraph sx={{ color: 'text.secondary' }}>
                    No requirements specified.
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Evaluation Criteria
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedPosition.evaluationCriteria?.map((criteria, index) => (
                    <Chip 
                      key={index} 
                      label={criteria} 
                      sx={{ 
                        bgcolor: 'primary.light', 
                        color: 'primary.contrastText',
                        fontWeight: 'medium'
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenDetails(false)}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            View Applicants
          </Button>
        </DialogActions>
      </Dialog>

      {/* Post New Job Modal */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          Post New Position
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpenModal(false);
              resetForm();
            }}
            sx={{ color: 'primary.contrastText' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Position Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                1. Position Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Position Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Position Type</InputLabel>
                    <Select
                      name="positionType"
                      value={formData.positionType}
                      label="Position Type"
                      onChange={handleInputChange}
                      sx={{ borderRadius: 2 }}
                    >
                      {positionTypes.map(type => (
                        <MenuItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Position Description */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                2. Position Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                3. Department
              </Typography>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  label="Department"
                  onChange={handleInputChange}
                  sx={{ borderRadius: 2 }}
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>
                      {getDepartmentLabel(dept)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Requirements */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                4. Requirements
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Requirements (one per line)"
                name="requirements"
                value={formData.requirements.join('\n')}
                onChange={(e) => setFormData({...formData, requirements: e.target.value.split('\n')})}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* Evaluation Criteria */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                5. Evaluation Criteria
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {evaluationCriteria.map((criteria, index) => (
                  <Chip
                    key={index}
                    label={criteria}
                    onDelete={() => setEvaluationCriteria(evaluationCriteria.filter((_, i) => i !== index))}
                    sx={{ 
                      bgcolor: 'primary.light', 
                      color: 'primary.contrastText',
                      '& .MuiChip-deleteIcon': {
                        color: 'primary.contrastText'
                      }
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  label="Add new criteria"
                  value={newCriteria}
                  onChange={(e) => setNewCriteria(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddCriteria}
                  sx={{ 
                    ml: 1,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                    borderRadius: 2
                  }}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
            </Grid>

            {/* Application Timeline */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                6. Application Deadline
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <CalendarTodayIcon sx={{ color: 'action.active', mr: 1 }} />,
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setOpenModal(false);
              resetForm();
            }}
            sx={{ 
              mr: 1,
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit('draft')}
            disabled={isLoading}
            variant="outlined"
            sx={{ 
              mr: 1,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { borderColor: 'primary.dark' }
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Save as Draft'}
          </Button>
          <Button
            onClick={() => handleSubmit('published')}
            disabled={isLoading}
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Publish Position'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PositionManagement;