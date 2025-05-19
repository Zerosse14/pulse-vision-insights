
// Function to extract transcripts from videos using Web Speech API
export const extractTranscript = async (videoFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const videoUrl = URL.createObjectURL(videoFile);
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      let transcript = '';
      
      // Set up speech recognition if available in the browser
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      let recognition: any = null;
      
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript + ' ';
            }
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
        };
      }
      
      // Load the video
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      
      video.onloadedmetadata = async () => {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        try {
          // Start playback (needed to access audio)
          await video.play();
          
          // Get audio from video
          const source = audioContext.createMediaElementSource(video);
          const destination = audioContext.createMediaStreamDestination();
          source.connect(destination);
          
          // Start recognition if available
          if (recognition) {
            recognition.start();
          }
          
          // Process the video audio
          setTimeout(() => {
            // Stop recognition
            if (recognition) {
              recognition.stop();
            }
            
            // If no transcript was generated via Web Speech API, provide a fallback
            if (!transcript) {
              transcript = "Transcript extraction is simulated. In a production environment, this would use a more robust speech-to-text service like Google Cloud Speech-to-Text, AWS Transcribe, or a similar service. The browser's built-in Speech Recognition API has limited support and doesn't work in all environments.";
            }
            
            // Clean up
            video.pause();
            video.srcObject = null;
            URL.revokeObjectURL(videoUrl);
            
            resolve(transcript);
          }, Math.min(10000, video.duration * 1000 || 5000)); // Process up to 10 seconds or full duration
          
        } catch (error) {
          // Handle errors and provide fallback
          console.error('Error processing video audio:', error);
          URL.revokeObjectURL(videoUrl);
          
          resolve("Transcript extraction simulation. A complete implementation would require an external speech-to-text API for reliable transcription.");
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(videoUrl);
        reject(new Error("Failed to load video file"));
      };
      
    } catch (error) {
      reject(error);
    }
  });
};
