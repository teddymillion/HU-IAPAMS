import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
  Rating,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
  Stack
} from '@mui/material';
import {
  Download as DownloadIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Refresh,
  RefreshOutlined
} from '@mui/icons-material';
import { useAuth } from '../../context/authContext';
import { getUserProfile, submitEvaluation, getEvaluations } from '../../services/applicationService';
import toast from 'react-hot-toast';



const EvaluationPage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scores, setScores] = useState({
    experience: 0,
    education: 0,
    skills: 0
  });
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'details', 'evaluate', 'summary'

  const { auth } = useAuth();

  useEffect(() => {
    const token = auth?.tokens?.accessToken;

    const fetchData = async () => {
      try {
        setLoading(true);

        const profileRes = await getUserProfile(token);
        if (profileRes.success) {
          setUserProfile(profileRes.data);
        }

        // Get applications to evaluate
        const evalRes = await getEvaluations(token);
        if (evalRes.success) {
          setApplications(evalRes.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load applications');
        toast.error(err.response?.data?.message || 'Failed to load applications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  const getEvaluationStatus = (app) => {
    if (!app.averageScore && app.averageScore !== 0) {
      return 'not-evaluated';
    }

    if (app.averageScore >= 7) {
      return 'accepted';
    } else if (app.averageScore >= 4) {
      return 'pending';
    } else {
      return 'rejected';
    }
  };

  const handleOpenDialog = (type, app = null) => {
    if (app) {
      setSelectedApp(app);
      const existingEval = app.evaluations?.find(
        e => e.evaluator._id === userProfile?._id
      );
      if (existingEval) {
        setScores(existingEval.scores);
        setComments(existingEval.comments);
      } else {
        // Reset form when no existing evaluation
        setScores({
          experience: 0,
          education: 0,
          skills: 0
        });
        setComments('');
      }
    }
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleScoreChange = (criteria, value) => {
    setScores(prev => ({
      ...prev,
      [criteria]: value
    }));
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedApp) return;

    setIsSubmitting(true);

    try {
      const res = await submitEvaluation(
        selectedApp._id,
        { scores, comments },
        auth?.tokens?.accessToken
      );

      if (res.success) {
        // Update UI with new evaluation
        const updatedApps = applications.map(app =>
          app._id === selectedApp._id ? res.data : app
        );
        setApplications(updatedApps);
        setSelectedApp(res.data);
        toast.success('Evaluation submitted successfully!');
        handleCloseDialog();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit evaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasEvaluated = (app) => {
    return app.averageScore && app.averageScore !== 0;

  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (applications.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          No applications assigned for evaluation
        </Typography>
        <Typography color="text.secondary">
          You currently don't have any applications to evaluate.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Evaluator Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Application List */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Applications to Evaluate
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {applications?.map(app => (
                <Grid item xs={12} sm={6} md={4} key={app._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {app.position.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Applicant: {app.applicant.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Department: {app.position.department}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        gap: 1,
                        alignItems: 'center'
                      }}>
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenDialog('details', app)}
                        >
                          Details
                        </Button>

                        {hasEvaluated(app) ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label="Evaluated"
                              color="success"
                              size="small"
                              icon={<CheckIcon fontSize="small" />}
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleOpenDialog('evaluate', app)}
                            />
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => handleOpenDialog('evaluate', app)}
                              aria-label="re-evaluate"
                            >
                              <RefreshOutlined fontSize="small" /> Evaluate
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => handleOpenDialog('evaluate', app)}
                          >
                            Evaluate
                          </Button>
                        )}

                        <Button
                          size="small"
                          onClick={() => handleOpenDialog('summary', app)}
                        >
                          Summary
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Application Details Dialog */}
      <Dialog open={openDialog && dialogType === 'details'} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Application Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Applicant Information
              </Typography>
              <Typography>
                <strong>Name:</strong> {selectedApp.applicant.username}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedApp.applicant.email}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Position Information
              </Typography>
              <Typography>
                <strong>Title:</strong> {selectedApp.position.title}
              </Typography>
              <Typography>
                <strong>Department:</strong> {selectedApp.position.department}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Application Documents
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  href={selectedApp.documents.cv}
                  target="_blank"
                >
                  Download CV
                </Button>
                {selectedApp.documents.coverLetter && (
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    href={selectedApp.documents.coverLetter}
                    target="_blank"
                  >
                    Download Cover Letter
                  </Button>
                )}
                {selectedApp.documents.certificates?.map((cert, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    href={cert}
                    target="_blank"
                  >
                    Certificate {index + 1}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Evaluation Form Dialog */}
      <Dialog open={openDialog && dialogType === 'evaluate'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Evaluation Form
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Evaluating: {selectedApp.position.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Applicant: {selectedApp.applicant.username}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography component="legend">Experience</Typography>
                <Rating
                  name="experience"
                  value={scores.experience}
                  onChange={(e, newValue) => handleScoreChange('experience', newValue)}
                  max={10}
                  precision={0.5}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography component="legend">Education</Typography>
                <Rating
                  name="education"
                  value={scores.education}
                  onChange={(e, newValue) => handleScoreChange('education', newValue)}
                  max={10}
                  precision={0.5}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography component="legend">Skills</Typography>
                <Rating
                  name="skills"
                  value={scores.skills}
                  onChange={(e, newValue) => handleScoreChange('skills', newValue)}
                  max={10}
                  precision={0.5}
                />
              </Box>

              <TextField
                label="Comments"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                sx={{ mt: 3 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitEvaluation}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckIcon />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Evaluation Summary Dialog */}
      <Dialog open={openDialog && dialogType === 'summary'} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Evaluation Summary
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedApp.position.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Applicant: {selectedApp.applicant.username}
              </Typography>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                my: 2,
                p: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 1
              }}>
                <Typography variant="h5">
                  {selectedApp.averageScore?.toFixed(1) || 'N/A'}
                </Typography>
                <Box>
                  <Typography variant="body2">Average Score</Typography>
                  <Typography variant="body2">
                    Status:
                    <Chip
                      label={selectedApp.status}
                      size="small"
                      color={
                        selectedApp.status === 'accepted' ? 'success' :
                          selectedApp.status === 'rejected' ? 'error' : 'warning'
                      }
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Evaluator Feedback
              </Typography>

              {selectedApp.evaluations?.length > 0 ? (
                <List>
                  {selectedApp.evaluations.map((evalItem, index) => (
                    <ListItem key={index} divider>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 1
                        }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {evalItem.evaluator.username.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography fontWeight="bold">
                            {evalItem.evaluator.username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(evalItem.submittedAt).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Box sx={{
                          display: 'flex',
                          gap: 3,
                          my: 1
                        }}>
                          <Typography variant="body2">
                            <strong>Experience:</strong> {evalItem.scores.experience}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Education:</strong> {evalItem.scores.education}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Skills:</strong> {evalItem.scores.skills}
                          </Typography>
                        </Box>

                        {evalItem.comments && (
                          <Box sx={{
                            mt: 1,
                            p: 2,
                            backgroundColor: '#f9f9f9',
                            borderRadius: 1
                          }}>
                            <Typography variant="body2">
                              <strong>Comments:</strong> {evalItem.comments}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No evaluations submitted yet.
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EvaluationPage;