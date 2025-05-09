import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Link,
  Divider
} from '@mui/material';
import {
  HowToReg as AppliedIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/authContext';
import { getMyApplications } from '../../services/applicationService';

const MyApplications = () => {
  const { auth } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const applicationsRes = await getMyApplications(auth.tokens.accessToken).catch(err => {
        console.error('Applications fetch error:', err);
        return { success: false, data: [] };
      });

      if (applicationsRes.success) {
        console.log('Applications response:', applicationsRes);
        const apps = Array.isArray(applicationsRes.data.data) ? [...applicationsRes.data.data] : [];
        console.log('Applications to set:', apps);
        setApplications(apps);
      } else {
        console.error('Applications fetch failed:', applicationsRes);
        setApplications([]);
        toast.error('Failed to load applications');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'pending': return { text: 'Applied', color: 'warning' };
      case 'under_review': return { text: 'Under Review', color: 'info' };
      case 'shortlisted': return { text: 'Shortlisted', color: 'success' };
      case 'rejected': return { text: 'Not Selected', color: 'error' };
      default: return { text: 'Applied', color: 'warning' };
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="green">
          My Applications
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View the status and details of your submitted applications
        </Typography>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && applications.length === 0 && (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't applied to any positions yet.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Explore available positions to submit your application.
          </Typography>
        </Paper>
      )}

      {/* Applications List */}
      {!isLoading && applications.length > 0 && (
        <Grid container spacing={3}>
          {applications.map((application) => {
            const status = getStatusChip(application.status);
            return (
              <Grid item xs={12} key={application._id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {application.position.title}
                      </Typography>
                      <Chip
                        icon={<AppliedIcon fontSize="small" />}
                        label={status.text}
                        size="small"
                        color={status.color}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Department:</strong> {application.position.department}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Applicant:</strong> {application.applicant.username} ({application.applicant.email})
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Documents:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {application.documents.cv ? (
                            <Box component="li" sx={{ mb: 1 }}>
                              <Link
                                href={application.documents.cv}
                                target="_blank"
                                rel="noopener"
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                                View CV
                              </Link>
                            </Box>
                          ) : (
                            <Box component="li" sx={{ mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                No CV uploaded
                              </Typography>
                            </Box>
                          )}
                          {application.documents.coverLetter ? (
                            <Box component="li" sx={{ mb: 1 }}>
                              <Link
                                href={application.documents.coverLetter}
                                target="_blank"
                                rel="noopener"
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                                View Cover Letter
                              </Link>
                            </Box>
                          ) : (
                            <Box component="li" sx={{ mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                No cover letter uploaded
                              </Typography>
                            </Box>
                          )}
                          {application.documents.certificates && application.documents.certificates.length > 0 ? (
                            application.documents.certificates.map((cert, i) => (
                              <Box component="li" key={i} sx={{ mb: 1 }}>
                                <Link
                                  href={cert}
                                  target="_blank"
                                  rel="noopener"
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                                  View Certificate {i + 1}
                                </Link>
                              </Box>
                            ))
                          ) : (
                            <Box component="li" sx={{ mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                No certificates uploaded
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Application ID: {application._id}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default MyApplications;