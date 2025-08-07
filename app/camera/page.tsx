// Author: Xiaorui Wang (bella918@bu.edu), Emily Yang (eyang4@bu.edu) 
// Description: The page that uses webcamera to gather the student's facial image and then send to backend for facial recognition. 

'use client';

// React and Next.js imports for component functionality and navigation
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { redirect } from 'next/navigation'; 
import { useInformation } from "../../context/InformationContext";

// Material-UI component imports for UI elements
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

// Material-UI icon imports for visual elements
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

// Material-UI styling utilities
import { styled, keyframes } from '@mui/material/styles';

// ========== ANIMATION KEYFRAMES ==========

// Animation for floating background elements - creates a gentle up/down movement with rotation
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

// Animation for elements appearing from bottom with fade effect
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

// ========== STYLED COMPONENTS ==========

// Main container with gradient background and floating animated elements
const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  position: 'relative',
  overflow: 'hidden',
  // Top-right floating background element
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
  // Bottom-left floating background element
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

// Main card component with glassmorphism effect
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(4),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'visible'
}));

// Gradient button for primary actions (Take Photo)
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

// Green gradient button for verification actions
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

// Container for the video element with glowing border effect
const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  // Glowing border effect
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

// Camera frame overlay to guide user positioning
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
  // Corner brackets for camera viewfinder effect
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '24px',
    height: '24px',
    border: '4px solid rgba(255, 255, 255, 0.9)',
  },
  // Top-left corner bracket
  '&::before': {
    top: '12px',
    left: '12px',
    borderRight: 'none',
    borderBottom: 'none',
    borderTopLeftRadius: '8px',
  },
  // Top-right corner bracket
  '&::after': {
    top: '12px',
    right: '12px',
    borderLeft: 'none',
    borderBottom: 'none',
    borderTopRightRadius: '8px',
  }
});

// Box with fade-in-up animation for smooth element appearance
const AnimatedBox = styled(Box)({
  animation: `${fadeInUp} 0.6s ease-out`,
});

// ========== MAIN COMPONENT ==========
export default function CameraPage() {
  // ========== REFS ==========
  // Reference to the video element for camera stream
  const videoRef = useRef<HTMLVideoElement>(null);
  // Reference to canvas element for photo capture
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // ========== STATE VARIABLES ==========
  // Stores the captured photo as base64 data URL
  const [photo, setPhoto] = useState<string | null>(null);
  // Status message for user feedback during upload/verification process
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  // Loading state for upload process
  const [isUploading, setIsUploading] = useState(false);
  // Stores the verification result from the backend API
  const [verificationResult, setVerificationResult] = useState<any>(null);
  // Tracks if video stream has loaded successfully
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Context for sharing user information across components
  const { context, setContext } = useInformation(); 

  // ========== CAMERA INITIALIZATION ==========
  // Effect to initialize camera stream when component mounts
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          // Attach camera stream to video element
          videoRef.current.srcObject = stream;
          // Set video loaded state when metadata is available
          videoRef.current.onloadedmetadata = () => setIsVideoLoaded(true);
        }
      })
      .catch((err) => {
        console.error('Camera error:', err);
        setUploadStatus('Camera access denied. Please allow camera permissions.');
      });
  }, []);

  // ========== PHOTO CAPTURE FUNCTION ==========
  // Captures a photo from the video stream and converts to base64
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context2d = canvas.getContext('2d');
      if (context2d) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Draw current video frame to canvas
        context2d.drawImage(video, 0, 0);
        // Convert canvas content to base64 image data
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);
        // Reset status and verification result
        setUploadStatus(null);
        setVerificationResult(null);
      }
    }
  };

  // ========== PHOTO UPLOAD AND VERIFICATION FUNCTION ==========
  // Uploads captured photo to backend for facial recognition verification
  const uploadPhoto = async () => {
    // Validate that a photo has been captured
    if (!photo) {
      setUploadStatus("Please take a photo first.");
      return;
    }
    // Validate that user has a BU ID in context
    if (!context.buid) {
      setUploadStatus("No BUID found. Please go back and enter your BU ID.");
      setTimeout(() => {
        redirect(`/`);
      }, 3000);
      // return;
    }

    // Convert base64 image to blob for form data
    const blob = await (await fetch(photo)).blob();
    const formData = new FormData();
    formData.append('input_image', blob, 'photo.jpg');
    formData.append('buid', context.buid);

    // Set loading state and status message
    setIsUploading(true);
    setUploadStatus("Processing face verification...");

    try {
      // Send photo and BU ID to facial recognition API
      const res = await fetch('https://face-service-143797183460.us-east1.run.app/compare/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        // Store verification result
        setVerificationResult(data);
        // Update status based on verification result
        setUploadStatus(
          data.match 
            ? "Verification completed successfully!\nMatch outcome: ✅ Yes" 
            : "Verification completed successfully!\nMatch outcome: ❌ No Match\nPlease retake the photo or contact with the TA."
        );
        
        // If verification successful, record attendance
        if (data.match) { 
          // ===== Created by Emily Yang ===== 
          // Store attendance record to MongoDB database
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

          // Redirect to confirmation page after 15 seconds
          setTimeout(() => {
            redirect(`/attendance-recorded-confirmation`);
          }, 15000);
        }
      } else {
        // Handle API error response
        setUploadStatus(data.reason || data.message || 'Face not detected or verification failed.');
      }
    } catch (err) {
      // Handle network or other errors
      setUploadStatus('Upload failed, please try again.');
      console.error('Upload error:', err);
    } finally {
      // Reset loading state
      setIsUploading(false);
    }
  };

  // ========== HELPER FUNCTIONS ==========
  // Determines the severity level for status alert based on verification result
  const getStatusSeverity = () => {
    if (!uploadStatus) return 'info';
    const isSuccess = verificationResult?.match;
    const isError = uploadStatus.includes('failed') || uploadStatus.includes('error') || uploadStatus.includes('denied');
    
    if (isSuccess) return 'success';
    if (isError) return 'error';
    return 'info';
  };

  // Returns appropriate icon for status alert based on verification result
  const getStatusIcon = () => {
    const isSuccess = verificationResult?.match;
    const isError = uploadStatus?.includes('failed') || uploadStatus?.includes('error') || uploadStatus?.includes('denied');
    
    if (isSuccess) return <CheckCircle />;
    if (isError) return <ErrorOutline />;
    return <InfoOutlined />;
  };

  // ========== COMPONENT RENDER ==========
  return (
    <StyledContainer>
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <StyledCard elevation={0}>
          {/* ========== HEADER SECTION ========== */}
          {/* Gradient header with title and description */}
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
              {/* Face icon avatar */}
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
              {/* Page title */}
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Face Verification
              </Typography>
              {/* Page description */}
              <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Position your face clearly within the frame and capture your photo for secure verification
              </Typography>
            </Box>
          </Box>

          {/* ========== MAIN CONTENT SECTION ========== */}
          <CardContent sx={{ p: 6 }}>
            <Stack spacing={6} alignItems="center">
              {/* ========== CAMERA FEED SECTION ========== */}
              {/* Video stream container with overlay and loading state */}
              <Box sx={{ width: '100%', maxWidth: 700 }}>
                <VideoContainer>
                  {/* Loading backdrop shown while camera initializes */}
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
                  
                  {/* Video element for camera stream */}
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
                  
                  {/* Camera frame overlay for user guidance */}
                  <CameraOverlay />
                </VideoContainer>
              </Box>
              
              {/* Hidden canvas element for photo capture */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {/* ========== CAPTURE BUTTON ========== */}
              {/* Button to capture photo from video stream */}
              <GradientButton
                onClick={takePhoto}
                startIcon={<PhotoCamera sx={{ fontSize: 28 }} />}
                size="large"
                sx={{ px: 8, py: 2 }}
              >
                Capture Photo
              </GradientButton>

              {/* ========== CAPTURED PHOTO SECTION ========== */}
              {/* Shows captured photo and verification button */}
              {photo && (
                <Fade in timeout={600}>
                  <AnimatedBox sx={{ width: '100%', maxWidth: 700 }}>
                    <Stack spacing={4} alignItems="center">
                      {/* Section header */}
                      <Box textAlign="center">
                        <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                          Photo Captured
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Review your photo before verification
                        </Typography>
                      </Box>
                      
                      {/* Captured photo display with glowing border */}
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
                      
                      {/* Verification button */}
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

              {/* ========== VERIFICATION RESULTS SECTION ========== */}
              {/* Displays detailed verification results after API response */}
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
                        {/* Results header */}
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

                        {/* Results details cards */}
                        <Stack spacing={3}>
                          {/* Reference image information */}
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

                          {/* Similarity score information */}
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

                          {/* Verification status information */}
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

              {/* ========== STATUS MESSAGE SECTION ========== */}
              {/* Alert component showing current status or error messages */}
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

              {/* ========== NAVIGATION SECTION ========== */}
              {/* Back button to return to previous page */}
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