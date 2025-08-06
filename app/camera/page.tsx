// Author: Xiaorui Wang (bella918@bu.edu), Emily Yang (eyang4@bu.edu) 
// Description: The page that uses webcamera to gather the student's facial image and then send to backend for facial recognition. 

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { redirect } from 'next/navigation'; 
import { useInformation } from "../../context/InformationContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Fade,
  Chip,
  Stack,
  Avatar,
  // Divider,
  Backdrop
} from '@mui/material';
import {
  PhotoCamera,
  // CloudUpload,
  ArrowBack,
  CheckCircle,
  // Cancel,
  // Visibility,
  Face,
  VerifiedUser,
  ErrorOutline,
  InfoOutlined
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';


const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;


const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-40%',
    right: '-40%',
    width: '80%',
    height: '80%',
    background: 'linear-gradient(135deg, rgba(63, 81, 181, 0.1), rgba(156, 39, 176, 0.1))',
    borderRadius: '50%',
    filter: 'blur(60px)',
    animation: `${float} 20s ease-in-out infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-40%',
    left: '-40%',
    width: '80%',
    height: '80%',
    background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(76, 175, 80, 0.1))',
    borderRadius: '50%',
    filter: 'blur(60px)',
    animation: `${float} 25s ease-in-out infinite reverse`,
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(4),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'visible'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2, 6),
  fontSize: '1.2rem',
  fontWeight: 600,
  textTransform: 'none',
  color: '#ffffff',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    color: '#ffffff',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
  }
}));

const GreenGradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2, 6),
  fontSize: '1.2rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(17, 153, 142, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #0f8679 0%, #30d865 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(17, 153, 142, 0.4)',
  },
  '&:disabled': {
    background: 'linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)',
    color: 'white',
  }
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c)',
    borderRadius: theme.spacing(2.5),
    zIndex: -1,
    opacity: 0.6,
    filter: 'blur(8px)',
  }
}));

const CameraOverlay = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  height: '320px',
  border: '3px solid rgba(255, 255, 255, 0.8)',
  borderRadius: '24px',
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '24px',
    height: '24px',
    border: '4px solid rgba(255, 255, 255, 0.9)',
  },
  '&::before': {
    top: '12px',
    left: '12px',
    borderRight: 'none',
    borderBottom: 'none',
    borderTopLeftRadius: '8px',
  },
  '&::after': {
    top: '12px',
    right: '12px',
    borderLeft: 'none',
    borderBottom: 'none',
    borderTopRightRadius: '8px',
  }
});

const AnimatedBox = styled(Box)({
  animation: `${fadeInUp} 0.6s ease-out`,
});

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { context, setContext } = useInformation(); 

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => setIsVideoLoaded(true);
        }
      })
      .catch((err) => {
        console.error('Camera error:', err);
        setUploadStatus('Camera access denied. Please allow camera permissions.');
      });
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context2d = canvas.getContext('2d');
      if (context2d) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context2d.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);
        setUploadStatus(null);
        setVerificationResult(null);
      }
    }
  };

  const uploadPhoto = async () => {
    if (!photo) {
      setUploadStatus("Please take a photo first.");
      return;
    }
    if (!context.buid) {
      setUploadStatus("No BUID found. Please go back and enter your BU ID.");
      setTimeout(() => {
        redirect(`/`);
      }, 3000);
      // return;
    }

    const blob = await (await fetch(photo)).blob();
    const formData = new FormData();
    formData.append('input_image', blob, 'photo.jpg');
    formData.append('buid', context.buid);

    setIsUploading(true);
    setUploadStatus("Processing face verification...");

    try {
      const res = await fetch('https://face-service-143797183460.us-east1.run.app/compare/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        setVerificationResult(data);
        setUploadStatus(
          data.match 
            ? "Verification completed successfully!\nMatch outcome: ✅ Yes" 
            : "Verification completed successfully!\nMatch outcome: ❌ No Match\nPlease retake the photo or contact with the TA."
        );
        
        if (data.match) { 
          // ===== Created by Emily Yang ===== 
          // store attendance record to MongoDB 
          // Resource: https://community.freshworks.dev/t/post-request-using-fetch-in-next-js/4726/2 
          await fetch('/api/create-attendance-record', {
            method: 'POST',
            body: JSON.stringify({
              firstName: context.firstName,
              lastName: context.lastName,
              buid: context.buid,
              emailAddress: context.emailAddress,
            })
          }); 
          // ===== Created by Emily Yang =====

          setTimeout(() => {
            redirect(`/attendance-recorded-confirmation`);
          }, 3000);
        }
      } else {
        setUploadStatus(data.reason || data.message || 'Face not detected or verification failed.');
      }
    } catch (err) {
      setUploadStatus('Upload failed, please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusSeverity = () => {
    if (!uploadStatus) return 'info';
    const isSuccess = verificationResult?.match;
    const isError = uploadStatus.includes('failed') || uploadStatus.includes('error') || uploadStatus.includes('denied');
    
    if (isSuccess) return 'success';
    if (isError) return 'error';
    return 'info';
  };

  const getStatusIcon = () => {
    const isSuccess = verificationResult?.match;
    const isError = uploadStatus?.includes('failed') || uploadStatus?.includes('error') || uploadStatus?.includes('denied');
    
    if (isSuccess) return <CheckCircle />;
    if (isError) return <ErrorOutline />;
    return <InfoOutlined />;
  };

  return (
    <StyledContainer>
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <StyledCard elevation={0}>
          {/* Header */}
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              px: 6,
              py: 8,
              textAlign: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(1px)'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 3,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Face sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Face Verification
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Position your face clearly within the frame and capture your photo for secure verification
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: 6 }}>
            <Stack spacing={6} alignItems="center">
              {/* Camera Feed */}
              <Box sx={{ width: '100%', maxWidth: 700 }}>
                <VideoContainer>
                  <Backdrop
                    open={!isVideoLoaded}
                    sx={{
                      position: 'absolute',
                      zIndex: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      borderRadius: 2
                    }}
                  >
                    <Stack alignItems="center" spacing={2}>
                      <CircularProgress size={60} sx={{ color: 'white' }} />
                      <Typography variant="h6" color="white">
                        Initializing camera...
                      </Typography>
                    </Stack>
                  </Backdrop>
                  
                  <Box component="video" 
                    ref={videoRef}
                    autoPlay
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      opacity: isVideoLoaded ? 1 : 0,
                      transition: 'opacity 0.5s ease'
                    }}
                  />
                  
                  <CameraOverlay />
                </VideoContainer>
              </Box>
              
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {/* Take Photo Button */}
              <GradientButton
                onClick={takePhoto}
                startIcon={<PhotoCamera sx={{ fontSize: 28 }} />}
                size="large"
                sx={{ px: 8, py: 2 }}
              >
                Capture Photo
              </GradientButton>

              {/* Captured Photo */}
              {photo && (
                <Fade in timeout={600}>
                  <AnimatedBox sx={{ width: '100%', maxWidth: 700 }}>
                    <Stack spacing={4} alignItems="center">
                      <Box textAlign="center">
                        <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                          Photo Captured
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Review your photo before verification
                        </Typography>
                      </Box>
                      
                      <Paper 
                        elevation={8}
                        sx={{ 
                          borderRadius: 3,
                          overflow: 'hidden',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                            borderRadius: 3.5,
                            zIndex: -1,
                            filter: 'blur(8px)',
                            opacity: 0.6,
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={photo}
                          alt="Captured"
                          sx={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Paper>
                      
                      <GreenGradientButton
                        onClick={uploadPhoto}
                        disabled={isUploading}
                        startIcon={
                          isUploading ? 
                            <CircularProgress size={24} color="inherit" /> : 
                            <VerifiedUser sx={{ fontSize: 28 }} />
                        }
                        size="large"
                        fullWidth
                        sx={{ maxWidth: 400, py: 2 }}
                      >
                        {isUploading ? 'Processing Verification...' : 'Verify Identity'}
                      </GreenGradientButton>
                    </Stack>
                  </AnimatedBox>
                </Fade>
              )}

              {/* Verification Results */}
              {verificationResult && (
                <Fade in timeout={600}>
                  <AnimatedBox sx={{ width: '100%', maxWidth: 700 }}>
                    <Paper 
                      elevation={4}
                      sx={{ 
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        p: 4
                      }}
                    >
                      <Stack spacing={4}>
                        <Box textAlign="center">
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              mx: 'auto',
                              mb: 2,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                          >
                            <VerifiedUser sx={{ fontSize: 40 }} />
                          </Avatar>
                          <Typography variant="h4" component="h3" fontWeight="bold">
                            Verification Results
                          </Typography>
                        </Box>

                        <Stack spacing={3}>
                          <Card elevation={2} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
                                  <Typography variant="h6" fontWeight="600">Reference Image</Typography>
                                </Box>
                                <Chip 
                                  label={verificationResult.db_image || "None"}
                                  variant="outlined"
                                  sx={{ fontWeight: 600, borderRadius: 2 }}
                                />
                              </Stack>
                            </CardContent>
                          </Card>

                          <Card elevation={2} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'info.main' }} />
                                  <Typography variant="h6" fontWeight="600">Similarity Score</Typography>
                                </Box>
                                <Chip 
                                  label={verificationResult.similarity?.toFixed(4)}
                                  color="info"
                                  sx={{ fontWeight: 700, borderRadius: 2 }}
                                />
                              </Stack>
                            </CardContent>
                          </Card>

                          <Card elevation={2} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Box 
                                    sx={{ 
                                      width: 12, 
                                      height: 12, 
                                      borderRadius: '50%', 
                                      bgcolor: verificationResult.match ? 'success.main' : 'error.main' 
                                    }} 
                                  />
                                  <Typography variant="h6" fontWeight="600">Verification Status</Typography>
                                </Box>
                                <Chip 
                                  label={verificationResult.match ? "✅ Verified" : "❌ Not Verified"}
                                  color={verificationResult.match ? "success" : "error"}
                                  sx={{ fontWeight: 700, borderRadius: 2, px: 2 }}
                                />
                              </Stack>
                            </CardContent>
                          </Card>
                        </Stack>
                      </Stack>
                    </Paper>
                  </AnimatedBox>
                </Fade>
              )}

              {/* Status Message */}
              {uploadStatus && (
                <Fade in timeout={600}>
                  <AnimatedBox sx={{ width: '100%', maxWidth: 700 }}>
                    <Alert 
                      severity={getStatusSeverity()}
                      icon={getStatusIcon()}
                      sx={{ 
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        p: 3,
                        '& .MuiAlert-message': {
                          fontWeight: 600,
                          whiteSpace: 'pre-line'
                        }
                      }}
                    >
                      {uploadStatus}
                    </Alert>
                  </AnimatedBox>
                </Fade>
              )}

              {/* Back Button */}
              <Box sx={{ pt: 4 }}>
                <Button
                  component={Link}
                  href="/camera-usage-consent-form"
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  size="large"
                  sx={{
                    borderRadius: 3,
                    px: 6,
                    py: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  Return to Previous Page
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </StyledCard>
      </Container>
    </StyledContainer>
  );
}