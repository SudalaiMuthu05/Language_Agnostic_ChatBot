// import React, { useState, useRef, useEffect } from "react";

// const ChatBot = ({ onClose }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I am your AI Assistant. How can I help you today?",
//       sender: "bot",
//       language: "en"
//     },
//   ]);

//   const [inputMessage, setInputMessage] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const [isListening, setIsListening] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [detectedLanguage, setDetectedLanguage] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [speechSupported, setSpeechSupported] = useState(true);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [showAutoDetectBadge, setShowAutoDetectBadge] = useState(false);
//   const [originalSelectedLang, setOriginalSelectedLang] = useState("en");
  
//   const messagesEndRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   // Available languages with speech recognition codes
//   const languages = [
//     { code: "en", name: "English", native: "English", speechCode: "en-IN" },
//     { code: "hi", name: "Hindi", native: "हिन्दी", speechCode: "hi-IN" },
//     { code: "ta", name: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
//     { code: "te", name: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
//     { code: "gu", name: "Gujarati", native: "ગુજરાતી", speechCode: "gu-IN" },
//     { code: "mr", name: "Marathi", native: "मराठी", speechCode: "mr-IN" }
//   ];

//   // Helper function to format bot messages with line breaks
//   const formatMessageText = (text, isBot = false) => {
//     if (!isBot) return text;
    
//     // Clean up markdown ** and ensure proper newlines
//     let cleanedText = text
//       .replace(/\\(.?)\\*/g, '$1') // Remove ** markdown
//       .replace(/\\n/g, '\n'); // Convert \n to actual newlines
    
//     return cleanedText;
//   };

//   // Auto-scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize speech recognition
//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
//       if (!SpeechRecognition) {
//         console.warn('Speech recognition not supported in this browser');
//         setSpeechSupported(false);
//         return;
//       }

//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = true;
      
//       const currentLang = languages.find(lang => lang.code === selectedLanguage);
//       recognitionRef.current.lang = currentLang ? currentLang.speechCode : 'en-IN';

//       recognitionRef.current.onstart = () => {
//         console.log('Speech recognition started');
//         setIsListening(true);
//       };

//       recognitionRef.current.onresult = (event) => {
//         let finalTranscript = '';
//         let interimTranscript = '';

//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             finalTranscript += transcript;
//           } else {
//             interimTranscript += transcript;
//           }
//         }

//         if (interimTranscript) {
//           setInputMessage(interimTranscript);
//         }

//         if (finalTranscript) {
//           setInputMessage(finalTranscript);
//           // Auto-detect language for voice input
//           detectLanguage(finalTranscript);
//         }
//       };

//       recognitionRef.current.onend = () => {
//         console.log('Speech recognition ended');
//         setIsListening(false);
        
//         if (inputMessage.trim().length > 0) {
//           setTimeout(() => {
//             handleAutoSend();
//           }, 500);
//         }
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setIsListening(false);
        
//         if (event.error === 'not-allowed') {
//           alert('Please allow microphone access to use voice commands');
//         }
//       };
//     };

//     initSpeechRecognition();

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, []);

//   // Initialize audio recording
//   const initAudioRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         setAudioBlob(audioBlob);
//         setIsRecording(false);
        
//         // Auto-send audio to backend
//         handleSendAudioMessage(audioBlob);
//       };

//     } catch (error) {
//       console.error('Error initializing audio recording:', error);
//       alert('Microphone access denied. Please allow microphone permissions.');
//     }
//   };

//   // Start audio recording
//   const startAudioRecording = async () => {
//     if (!mediaRecorderRef.current) {
//       await initAudioRecording();
//     }

//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'recording') {
//       audioChunksRef.current = [];
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     }
//   };

//   // Stop audio recording
//   const stopAudioRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//       mediaRecorderRef.current.stop();
      
//       // Stop all tracks
//       mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
//     }
//   };

//   // Send audio message to n8n workflow
//   const handleSendAudioMessage = async (audioBlob) => {
//     if (!audioBlob) return;

//     setIsProcessing(true);

//     try {
//       // Create FormData to send audio file
//       const formData = new FormData();
//       formData.append('audio', audioBlob, 'voice-message.wav');
//       formData.append('language', selectedLanguage);
//       formData.append('detectedLanguage', detectedLanguage || selectedLanguage);
//       formData.append('hasAudio', 'true');
//       formData.append('audioType', 'wav');

//       // Add user message to chat
//       const newMessage = {
//         id: Date.now(),
//         text: "🎤 Voice message...",
//         sender: "user",
//         language: selectedLanguage,
//         isVoice: true,
//         isAudio: true
//       };

//       setMessages((prev) => [...prev, newMessage]);

//       // Send audio to n8n workflow
//       const response = await fetch('https://solutionseekers2.app.n8n.cloud/webhook-test/test', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process audio');
//       }

//       const data = await response.json();
      
//       // Parse n8n response
//       let replyText = parseN8nResponse(data);
      
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: replyText,
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);

//     } catch (error) {
//       console.error('Error sending audio message:', error);
      
//       // Fallback: Send as text message to n8n
//       const textResponse = await sendMessageToN8N("Voice message received", selectedLanguage);
      
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: textResponse,
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } finally {
//       setIsProcessing(false);
//       setAudioBlob(null);
//     }
//   };

//   // Parse n8n response to extract text and clean it
//   const parseN8nResponse = (data) => {
//     if (!data) return "I received your message but couldn't process the response.";
    
//     let responseText = "";
    
//     // Handle array response (common in n8n)
//     if (Array.isArray(data) && data.length > 0) {
//       const firstItem = data[0];
//       if (firstItem.json && firstItem.json.output) {
//         responseText = firstItem.json.output;
//       } else if (firstItem.output) {
//         responseText = firstItem.output;
//       } else if (firstItem.text) {
//         responseText = firstItem.text;
//       } else if (typeof firstItem === 'string') {
//         responseText = firstItem;
//       }
//     } else if (typeof data === 'object') {
//       // Handle object response
//       if (data.output) responseText = data.output;
//       else if (data.reply) responseText = data.reply;
//       else if (data.text) responseText = data.text;
//       else if (data.message) responseText = data.message;
//     } else if (typeof data === 'string') {
//       // Handle string response
//       responseText = data;
//     }
    
//     // Clean up the response text
//     if (responseText) {
//       // Remove markdown-style ** and replace with proper formatting
//       responseText = responseText.replace(/\\(.?)\\*/g, '$1');
      
//       // Ensure proper newlines
//       responseText = responseText.replace(/\\n/g, '\n');
      
//       // Clean up any other markdown artifacts
//       responseText = responseText.replace(/\* /g, '• '); // Convert * bullets to • 
//       responseText = responseText.replace(/#{1,6}\s*/g, ''); // Remove markdown headers
      
//       return responseText;
//     }
    
//     // Fallback
//     return "I processed your request successfully.";
//   };

//   // Update speech recognition language when selected language changes
//   useEffect(() => {
//     if (recognitionRef.current) {
//       const currentLang = languages.find(lang => lang.code === selectedLanguage);
//       recognitionRef.current.lang = currentLang ? currentLang.speechCode : 'en-IN';
//     }
//   }, [selectedLanguage]);

//   // Auto-send message after voice input
//   const handleAutoSend = async () => {
//     if (!inputMessage.trim()) return;
    
//     setIsProcessing(true);
    
//     const newMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: "user",
//       language: selectedLanguage,
//       isVoice: true
//     };

//     setMessages((prev) => [...prev, newMessage]);
    
//     const messageToSend = inputMessage;
//     setInputMessage("");

//     try {
//       const botReply = await sendMessageToN8N(messageToSend, selectedLanguage);

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: botReply,
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Detect language from text using OpenAI API with better prompting
//   const detectLanguage = async (text) => {
//     if (text.trim().length < 3) return;
    
//     // Store original language before detection
//     setOriginalSelectedLang(selectedLanguage);
    
//     try {
//       // Use OpenAI API for language detection with BETTER PROMPT
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer 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` // REPLACE WITH YOUR KEY
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "user",
//               content: `Analyze this text and determine its primary language: "${text}"
              
//               Available language codes: en (English), hi (Hindi), ta (Tamil), te (Telugu), gu (Gujarati), mr (Marathi)
              
//               Rules:
//               1. If text contains Hindi words like "aap", "kaise", "hain", "hai", "namaste", "dhanyavad", etc., return "hi"
//               2. If text contains Tamil words like "vanakkam", "nandri", "epdi", etc., return "ta"
//               3. If text contains Telugu words like "namaskaram", "dhanyavadalu", "ela", etc., return "te"
//               4. If text contains Gujarati words like "kem cho", "aavjo", etc., return "gu"
//               5. If text contains Marathi words like "kasa aahat", "namaskar", etc., return "mr"
//               6. If text is mostly English, return "en"
//               7. Return ONLY the language code, no explanations.
              
//               Text to analyze: "${text}"`
//             }
//           ],
//           temperature: 0.1,
//           max_tokens: 10
//         })
//       });

//       if (!response.ok) {
//         console.error("OpenAI API error:", await response.text());
//         throw new Error(`OpenAI API error: ${response.status}`);
//       }

//       const data = await response.json();
//       const detectedLang = data.choices[0].message.content.trim().toLowerCase();
      
//       console.log("Text analyzed:", text);
//       console.log("OpenAI detected language:", detectedLang);
      
//       // Validate that detected language is in our supported languages
//       const validLang = languages.find(lang => lang.code === detectedLang) ? detectedLang : "en";
      
//       // Set detected language
//       setDetectedLanguage(validLang);
      
//       // Show auto-detect badge if different from original selection
//       if (validLang !== originalSelectedLang && validLang !== "en") {
//         setShowAutoDetectBadge(true);
//         console.log("Showing badge for:", validLang);
//       } else {
//         setShowAutoDetectBadge(false);
//       }
      
//       // Auto-switch to detected language if user hasn't manually selected one or is on English
//       // But only if detected language is NOT English
//       if ((selectedLanguage === "en" || originalSelectedLang === "en") && validLang !== "en") {
//         setSelectedLanguage(validLang);
//         // Keep badge showing to indicate auto-switch happened
//         setShowAutoDetectBadge(true);
//       }
      
//       return validLang;
//     } catch (error) {
//       console.error("OpenAI language detection failed:", error);
      
//       // FALLBACK: Use enhanced local detection
//       const enhancedLang = enhancedLanguageDetection(text);
//       setDetectedLanguage(enhancedLang);
      
//       // Show badge if different and not English
//       if (enhancedLang !== originalSelectedLang && enhancedLang !== "en") {
//         setShowAutoDetectBadge(true);
//         console.log("Fallback detection showing badge for:", enhancedLang);
//       }
      
//       if ((selectedLanguage === "en" || originalSelectedLang === "en") && enhancedLang !== "en") {
//         setSelectedLanguage(enhancedLang);
//         setShowAutoDetectBadge(true);
//       }
      
//       return enhancedLang;
//     }
//   };

//   // Enhanced language detection (fallback)
//   const enhancedLanguageDetection = (text) => {
//     const textLower = text.toLowerCase().trim();
    
//     // Hindi detection patterns (Romanized and Devanagari)
//     const hindiPatterns = [
//       /\b(aap|tum|kaise|kya|kaun|kahan|kyon|hain|hai|ho|nahi|ji|shukriya|dhanyavad|namaste|accha|thik|theek|sahi|galti|samajh|dekh|sun|bol|likh|padh)\b/i,
//       /[\u0900-\u097F]/, // Devanagari script
//       /\b(mera|meri|hamara|tumhara|uska|unki|unka|kaise)\b/i,
//       /\b(karna|hona|jana|lena|dena|ana)\b/i,
//       /\b(bahut|zyada|kam|accha|bura|sundar)\b/i
//     ];
    
//     // Tamil detection
//     const tamilPatterns = [
//       /\b(vanakkam|nandri|epdi|eppadi|enga|yaaru|enna|edhukku|porumai|nalama|romba|konjam)\b/i,
//       /[\u0B80-\u0BFF]/, // Tamil script
//       /\b(nan|naan|ungal|ungalukku|ungaloda)\b/i
//     ];
    
//     // Telugu detection
//     const teluguPatterns = [
//       /\b(namaskaram|dhanyavadalu|ela|emi|evaru|ekkada|enduku|chala|baga|manchi)\b/i,
//       /[\u0C00-\u0C7F]/, // Telugu script
//       /\b(nenu|meeru|thamudu|chelli|amma|nanna)\b/i
//     ];
    
//     // Gujarati detection
//     const gujaratiPatterns = [
//       /\b(kem|cho|chho|shu|kai|kyare|kahan|kemcho|avjo|jojo|shubh|ratri|divas)\b/i,
//       /[\u0A80-\u0AFF]/, // Gujarati script
//       /\b(hu|tame|aman|maro|taro|chhe)\b/i
//     ];
    
//     // Marathi detection
//     const marathiPatterns = [
//       /\b(kasa|kaay|kaahi|kuthhe|kashala|mala|tula|amhala|tumhala|pan|tar|ani|kichit)\b/i,
//       /[\u0900-\u097F]/, // Devanagari script (shared with Hindi)
//       /\b(ho|kaay|kiti|jasta|kami|changla|vait)\b/i,
//       /\b(ahe|ahet|hot|hoti|hoto)\b/i // Marathi verb endings
//     ];
    
//     // Count matches for each language
//     const scores = {
//       hi: hindiPatterns.filter(pattern => pattern.test(textLower)).length,
//       ta: tamilPatterns.filter(pattern => pattern.test(textLower)).length,
//       te: teluguPatterns.filter(pattern => pattern.test(textLower)).length,
//       gu: gujaratiPatterns.filter(pattern => pattern.test(textLower)).length,
//       mr: marathiPatterns.filter(pattern => pattern.test(textLower)).length,
//       en: 0 // English is default
//     };
    
//     console.log("Language detection scores for:", textLower, scores);
    
//     // Find language with highest score
//     let maxScore = 0;
//     let detectedLang = "en";
    
//     Object.entries(scores).forEach(([lang, score]) => {
//       if (score > maxScore) {
//         maxScore = score;
//         detectedLang = lang;
//       }
//     });
    
//     // Special case: If text has Devanagari script, need to distinguish Hindi vs Marathi
//     if (scores.hi > 0 && scores.mr > 0) {
//       // Check for specific Marathi markers
//       const marathiMarkers = ['ahe', 'ahet', 'hot', 'hoti', 'kasa', 'kaay', 'mala', 'tula'];
//       const marathiCount = marathiMarkers.filter(marker => textLower.includes(marker)).length;
      
//       const hindiMarkers = ['hai', 'hain', 'ho', 'kaise', 'kya', 'mera', 'meri'];
//       const hindiCount = hindiMarkers.filter(marker => textLower.includes(marker)).length;
      
//       detectedLang = marathiCount > hindiCount ? "mr" : "hi";
//     }
    
//     // If we have a non-English detection with at least 2 patterns matched
//     if (detectedLang !== "en" && maxScore >= 2) {
//       return detectedLang;
//     }
    
//     // If text is very short or ambiguous, check for greeting patterns
//     if (textLower.length < 15) {
//       const greetings = {
//         hi: ['namaste', 'namaskar', 'pranam', 'aadaab'],
//         ta: ['vanakkam', 'vaazhga'],
//         te: ['namaskaram', 'dhanyavadalu'],
//         gu: ['kem cho', 'jai shree krishna'],
//         mr: ['namaskar', 'jai maharashtra']
//       };
      
//       for (const [lang, greets] of Object.entries(greetings)) {
//         if (greets.some(greet => textLower.includes(greet.toLowerCase()))) {
//           return lang;
//         }
//       }
//     }
    
//     return "en"; // Default to English
//   };

//   // Start voice recording (text transcription)
//   const startVoiceInput = () => {
//     if (!speechSupported) {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//       return;
//     }

//     if (recognitionRef.current && !isListening) {
//       setInputMessage("");
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Failed to start speech recognition:', error);
//         setIsListening(false);
//       }
//     }
//   };

//   // Stop voice recording manually
//   const stopVoiceInput = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//     }
//   };

//   // Start audio recording (for sending audio file)
//   const startAudioInput = async () => {
//     try {
//       await startAudioRecording();
//     } catch (error) {
//       console.error('Failed to start audio recording:', error);
//     }
//   };

//   // Stop audio recording
//   const stopAudioInput = () => {
//     stopAudioRecording();
//   };

//   // Manual send message
//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     setIsProcessing(true);
    
//     // Store original language before sending
//     const originalLang = selectedLanguage;
    
//     const newMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: "user",
//       language: selectedLanguage,
//       isVoice: false
//     };

//     setMessages((prev) => [...prev, newMessage]);
//     setInputMessage("");

//     try {
//       // First detect language if English is selected or input suggests different language
//       let langToUse = selectedLanguage;
      
//       // Always run detection to show badge, but only auto-switch if English was selected
//       const detectedLang = await detectLanguage(inputMessage);
      
//       if (originalLang === "en") {
//         langToUse = detectedLang;
//         setSelectedLanguage(detectedLang);
//       }
      
//       const botReply = await sendMessageToN8N(inputMessage, langToUse);

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: botReply,
//           sender: "bot",
//           language: langToUse
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Send message to n8n Webhook - MAIN INTEGRATION POINT
//   const sendMessageToN8N = async (message, language) => {
//     try {
//       const res = await fetch(
//         "https://solutionseekers2.app.n8n.cloud/webhook/test",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ 
//             message,
//             language: language || selectedLanguage,
//             detectedLanguage: detectedLanguage || language || selectedLanguage,
//             timestamp: new Date().toISOString(),
//             source: "chatbot_web"
//           }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
      
//       // Parse the response using the helper function
//       const replyText = parseN8nResponse(data);
      
//       return replyText;
      
//     } catch (error) {
//       console.error("Error sending message to n8n:", error);
      
//       // Return user-friendly error message
//       if (error.message.includes('Failed to fetch')) {
//         return "⚠ Network error: Unable to connect to the server. Please check your internet connection.";
//       }
      
//       throw error;
//     }
//   };

//   // Get current language name
//   const getCurrentLanguageName = () => {
//     const lang = languages.find(l => l.code === selectedLanguage);
//     return lang ? lang.native : "English";
//   };

//   // Get detected language name
//   const getDetectedLanguageName = () => {
//     const lang = languages.find(l => l.code === detectedLanguage);
//     return lang ? lang.name : "Unknown";
//   };

//   // Reset auto-detect badge when user manually changes language
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setSelectedLanguage(newLang);
//     setShowAutoDetectBadge(false); // Hide badge on manual change
//     setOriginalSelectedLang(newLang); // Reset original
//   };

//   return (
//     <div className="fixed inset-0 bg-white z-30 flex flex-col">
//       {/* Header with Language Info */}
//       <div className="border-b border-gray-200 bg-white px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-lg">🤖</span>
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">
//                 Raj-Sahayak AI Assistant
//               </h1>
//               <p className="text-sm text-gray-500">How can I help you today?</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             {/* Language Detection Badge - FIXED LOGIC */}
//             {showAutoDetectBadge && detectedLanguage && (
//               <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full animate-pulse">
//                 Auto-detected: {getDetectedLanguageName()}
//               </div>
//             )}
            
//             {/* Language Selector */}
//             <select
//               value={selectedLanguage}
//               onChange={handleLanguageChange}
//               className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               {languages.map((lang) => (
//                 <option key={lang.code} value={lang.code}>
//                   {lang.native} ({lang.name})
//                 </option>
//               ))}
//             </select>
            
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               ✕
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Chat messages */}
//       <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
//         <div className="max-w-4xl mx-auto space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${
//                 message.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                   message.sender === "user"
//                     ? "bg-purple-600 text-white rounded-br-none"
//                     : "bg-white border border-gray-200 rounded-bl-none"
//                 }`}
//               >
//                 {/* Use white-space: pre-line for bot messages to preserve line breaks */}
//                 <p 
//                   className="text-sm"
//                   style={{ 
//                     whiteSpace: message.sender === "bot" ? "pre-line" : "normal"
//                   }}
//                 >
//                   {formatMessageText(message.text, message.sender === "bot")}
//                 </p>
//                 {message.sender === "user" && (
//                   <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
//                     {message.isAudio ? (
//                       <>
//                         <span>🎵</span>
//                         <span>Audio Message • {getCurrentLanguageName()}</span>
//                       </>
//                     ) : message.isVoice ? (
//                       <>
//                         <span>🎤</span>
//                         <span>Voice • {getCurrentLanguageName()}</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>⌨</span>
//                         <span>{getCurrentLanguageName()}</span>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
          
//           {/* Loading indicator */}
//           {isProcessing && (
//             <div className="flex justify-start">
//               <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%]">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                     <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {audioBlob ? "Processing audio..." : "Thinking..."}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Input bar with Voice */}
//       <div className="border-t border-gray-200 bg-white px-6 py-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex space-x-2">
//             {/* Voice Input Button (Text Transcription) */}
//             <button
//               onClick={isListening ? stopVoiceInput : startVoiceInput}
//               className={`p-3 rounded-lg border transition-all duration-200 ${
//                 isListening 
//                   ? "bg-blue-100 border-blue-300 text-blue-600 animate-pulse" 
//                   : speechSupported 
//                     ? "bg-blue-100 border-blue-300 text-blue-600 hover:bg-blue-200"
//                     : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
//               }`}
//               title={
//                 !speechSupported 
//                   ? "Voice transcription not supported" 
//                   : isListening 
//                     ? "Stop voice transcription" 
//                     : "Start voice transcription (text)"
//               }
//               type="button"
//               disabled={isProcessing || !speechSupported || isRecording}
//             >
//               {isListening ? "⏹" : "🎤"}
//             </button>

//             {/* Audio Recording Button (Send Audio File) */}
            
            
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => {
//                 setInputMessage(e.target.value);
//                 if (e.target.value.trim().length >= 3) {
//                   detectLanguage(e.target.value);
//                 }
//               }}
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//               placeholder={
//                 isListening 
//                   ? "Speaking... (text transcription)" 
//                   : isRecording
//                     ? "Recording audio... (will send as file)"
//                     : `Type your message in ${getCurrentLanguageName()}...`
//               }
//               className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//               disabled={isProcessing || isRecording}
//             />
            
//             <button
//               onClick={handleSendMessage}
//               disabled={!inputMessage.trim() || isProcessing || isRecording}
//               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
//             >
//               {isProcessing ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 'Send'
//               )}
//             </button>
//           </div>
          
//           {/* Voice Recording Status */}
//           {isListening && (
//             <div className="text-center mt-3">
//               <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//                 <span>🎤 Listening... Speak for text transcription</span>
//               </div>
//             </div>
//           )}

//           {/* Audio Recording Status */}
//           {isRecording && (
//             <div className="text-center mt-3">
//               <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm">
//                 <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
//                 <span>🎵 Recording audio... Click stop to send</span>
//               </div>
//             </div>
//           )}
          
//           {/* Browser Support Warning */}
//           {!speechSupported && (
//             <div className="text-center mt-2">
//               <p className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-lg inline-block">
//                 ⚠ Voice transcription not supported. Please use Chrome, Edge, or Safari.
//               </p>
//             </div>
//           )}
          
//           {/* Instructions */}
//           <div className="text-center mt-2">
//             <p className="text-xs text-gray-500">
//               🎤 Voice-to-text • ⌨ Type message
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;








// import React, { useState, useRef, useEffect } from "react";

// const ChatBot = ({ onClose }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I am your AI Assistant. How can I help you today?",
//       sender: "bot",
//       language: "en"
//     },
//   ]);

//   const [inputMessage, setInputMessage] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const [isListening, setIsListening] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [detectedLanguage, setDetectedLanguage] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [speechSupported, setSpeechSupported] = useState(true);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [showAutoDetectBadge, setShowAutoDetectBadge] = useState(false);
//   const [originalSelectedLang, setOriginalSelectedLang] = useState("en");
  
//   const messagesEndRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   // Available languages with speech recognition codes
//   const languages = [
//     { code: "en", name: "English", native: "English", speechCode: "en-IN" },
//     { code: "hi", name: "Hindi", native: "हिन्दी", speechCode: "hi-IN" },
//     { code: "ta", name: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
//     { code: "te", name: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
//     { code: "gu", name: "Gujarati", native: "ગુજરાતી", speechCode: "gu-IN" },
//     { code: "mr", name: "Marathi", native: "मराठी", speechCode: "mr-IN" }
//   ];

//   // Helper function to format bot messages with line breaks
//   const formatMessageText = (text, isBot = false) => {
//     if (!isBot) return text;
    
//     // Clean up markdown ** and ensure proper newlines
//     let cleanedText = text
//       .replace(/\\.\\*/g, '') // Remove ** markdown
//       .replace(/\\n/g, '\n'); // Convert \n to actual newlines
    
//     return cleanedText;
//   };

//   // Auto-scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize speech recognition
//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
//       if (!SpeechRecognition) {
//         console.warn('Speech recognition not supported in this browser');
//         setSpeechSupported(false);
//         return;
//       }

//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = true;
      
//       const currentLang = languages.find(lang => lang.code === selectedLanguage);
//       recognitionRef.current.lang = currentLang ? currentLang.speechCode : 'en-IN';

//       recognitionRef.current.onstart = () => {
//         console.log('Speech recognition started');
//         setIsListening(true);
//       };

//       recognitionRef.current.onresult = (event) => {
//         let finalTranscript = '';
//         let interimTranscript = '';

//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             finalTranscript += transcript;
//           } else {
//             interimTranscript += transcript;
//           }
//         }

//         if (interimTranscript) {
//           setInputMessage(interimTranscript);
//         }

//         if (finalTranscript) {
//           setInputMessage(finalTranscript);
//           // Auto-detect language for voice input
//           detectLanguage(finalTranscript);
//         }
//       };

//       recognitionRef.current.onend = () => {
//         console.log('Speech recognition ended');
//         setIsListening(false);
        
//         if (inputMessage.trim().length > 0) {
//           setTimeout(() => {
//             handleAutoSend();
//           }, 500);
//         }
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setIsListening(false);
        
//         if (event.error === 'not-allowed') {
//           alert('Please allow microphone access to use voice commands');
//         }
//       };
//     };

//     initSpeechRecognition();

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, []);

//   // Initialize audio recording
//   const initAudioRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         setAudioBlob(audioBlob);
//         setIsRecording(false);
        
//         // Auto-send audio to backend
//         handleSendAudioMessage(audioBlob);
//       };

//     } catch (error) {
//       console.error('Error initializing audio recording:', error);
//       alert('Microphone access denied. Please allow microphone permissions.');
//     }
//   };

//   // Start audio recording
//   const startAudioRecording = async () => {
//     if (!mediaRecorderRef.current) {
//       await initAudioRecording();
//     }

//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'recording') {
//       audioChunksRef.current = [];
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     }
//   };

//   // Stop audio recording
//   const stopAudioRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//       mediaRecorderRef.current.stop();
      
//       // Stop all tracks
//       mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
//     }
//   };

//   // Send audio message to n8n workflow
//   const handleSendAudioMessage = async (audioBlob) => {
//     if (!audioBlob) return;

//     setIsProcessing(true);

//     try {
//       // Create FormData to send audio file
//       const formData = new FormData();
//       formData.append('audio', audioBlob, 'voice-message.wav');
//       formData.append('language', selectedLanguage);
//       formData.append('detectedLanguage', detectedLanguage || selectedLanguage);
//       formData.append('hasAudio', 'true');
//       formData.append('audioType', 'wav');

//       // Add user message to chat
//       const newMessage = {
//         id: Date.now(),
//         text: "🎤 Voice message...",
//         sender: "user",
//         language: selectedLanguage,
//         isVoice: true,
//         isAudio: true
//       };

//       setMessages((prev) => [...prev, newMessage]);

//       // Send audio to n8n workflow
//       const response = await fetch('https://solutionseekers2.app.n8n.cloud/webhook-test/test', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process audio');
//       }

//       const data = await response.json();
      
//       // Parse n8n response
//       let replyText = parseN8nResponse(data);
      
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: replyText,
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);

//     } catch (error) {
//       console.error('Error sending audio message:', error);
      
//       // Fallback: Send as text message to n8n
//       const textResponse = await sendMessageToN8N("Voice message received", selectedLanguage);
      
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: textResponse,
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } finally {
//       setIsProcessing(false);
//       setAudioBlob(null);
//     }
//   };

//   // Parse n8n response to extract text and clean it
//   const parseN8nResponse = (data) => {
//     if (!data) return "I received your message but couldn't process the response.";
    
//     let responseText = "";
    
//     // Handle array response (common in n8n)
//     if (Array.isArray(data) && data.length > 0) {
//       const firstItem = data[0];
//       if (firstItem.json && firstItem.json.output) {
//         responseText = firstItem.json.output;
//       } else if (firstItem.output) {
//         responseText = firstItem.output;
//       } else if (firstItem.text) {
//         responseText = firstItem.text;
//       } else if (typeof firstItem === 'string') {
//         responseText = firstItem;
//       }
//     } else if (typeof data === 'object') {
//       // Handle object response
//       if (data.output) responseText = data.output;
//       else if (data.reply) responseText = data.reply;
//       else if (data.text) responseText = data.text;
//       else if (data.message) responseText = data.message;
//     } else if (typeof data === 'string') {
//       // Handle string response
//       responseText = data;
//     }
    
//     // Clean up the response text
//     if (responseText) {
//       // Remove markdown-style ** and replace with proper formatting
//       responseText = responseText.replace(/\\.\\*/g, '');
      
//       // Ensure proper newlines
//       responseText = responseText.replace(/\\n/g, '\n');
      
//       // Clean up any other markdown artifacts
//       responseText = responseText.replace(/\* /g, '• '); // Convert * bullets to • 
//       responseText = responseText.replace(/#{1,6}\s*/g, ''); // Remove markdown headers
      
//       return responseText;
//     }
    
//     // Fallback
//     return "I processed your request successfully.";
//   };

//   // Update speech recognition language when selected language changes
//   useEffect(() => {
//     if (recognitionRef.current) {
//       const currentLang = languages.find(lang => lang.code === selectedLanguage);
//       recognitionRef.current.lang = currentLang ? currentLang.speechCode : 'en-IN';
//     }
//   }, [selectedLanguage]);

//   // Auto-send message after voice input
//   const handleAutoSend = async () => {
//     if (!inputMessage.trim()) return;
    
//     setIsProcessing(true);
    
//     const newMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: "user",
//       language: selectedLanguage,
//       isVoice: true
//     };

//     setMessages((prev) => [...prev, newMessage]);
    
//     const messageToSend = inputMessage;
//     setInputMessage("");

//     try {
//       const botReply = await sendMessageToN8N(messageToSend, selectedLanguage);

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: botReply,
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Detect language from text using OpenAI API with better prompting
//   const detectLanguage = async (text) => {
//     if (text.trim().length < 3) return;
    
//     // Store original language before detection
//     setOriginalSelectedLang(selectedLanguage);
    
//     try {
//       // Use OpenAI API for language detection with BETTER PROMPT
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer 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` // REPLACE WITH YOUR KEY
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "user",
//               content: `Analyze this text and determine its primary language: "${text}"
              
//               Available language codes: en (English), hi (Hindi), ta (Tamil), te (Telugu), gu (Gujarati), mr (Marathi)
              
//               Rules:
//               1. If text contains Hindi words like "aap", "kaise", "hain", "hai", "namaste", "dhanyavad", etc., return "hi"
//               2. If text contains Tamil words like "vanakkam", "nandri", "epdi", etc., return "ta"
//               3. If text contains Telugu words like "namaskaram", "dhanyavadalu", "ela", etc., return "te"
//               4. If text contains Gujarati words like "kem cho", "aavjo", etc., return "gu"
//               5. If text contains Marathi words like "kasa aahat", "namaskar", etc., return "mr"
//               6. If text is mostly English, return "en"
//               7. Return ONLY the language code, no explanations.
              
//               Text to analyze: "${text}"`
//             }
//           ],
//           temperature: 0.1,
//           max_tokens: 10
//         })
//       });

//       if (!response.ok) {
//         console.error("OpenAI API error:", await response.text());
//         throw new Error(`OpenAI API error: ${response.status}`);
//       }

//       const data = await response.json();
//       const detectedLang = data.choices[0].message.content.trim().toLowerCase();
      
//       console.log("Text analyzed:", text);
//       console.log("OpenAI detected language:", detectedLang);
      
//       // Validate that detected language is in our supported languages
//       const validLang = languages.find(lang => lang.code === detectedLang) ? detectedLang : "en";
      
//       // Set detected language
//       setDetectedLanguage(validLang);
      
//       // Show auto-detect badge if different from original selection
//       if (validLang !== originalSelectedLang && validLang !== "en") {
//         setShowAutoDetectBadge(true);
//         console.log("Showing badge for:", validLang);
//       } else {
//         setShowAutoDetectBadge(false);
//       }
      
//       // Auto-switch to detected language if user hasn't manually selected one or is on English
//       // But only if detected language is NOT English
//       if ((selectedLanguage === "en" || originalSelectedLang === "en") && validLang !== "en") {
//         setSelectedLanguage(validLang);
//         // Keep badge showing to indicate auto-switch happened
//         setShowAutoDetectBadge(true);
//       }
      
//       return validLang;
//     } catch (error) {
//       console.error("OpenAI language detection failed:", error);
      
//       // FALLBACK: Use enhanced local detection
//       const enhancedLang = enhancedLanguageDetection(text);
//       setDetectedLanguage(enhancedLang);
      
//       // Show badge if different and not English
//       if (enhancedLang !== originalSelectedLang && enhancedLang !== "en") {
//         setShowAutoDetectBadge(true);
//         console.log("Fallback detection showing badge for:", enhancedLang);
//       }
      
//       if ((selectedLanguage === "en" || originalSelectedLang === "en") && enhancedLang !== "en") {
//         setSelectedLanguage(enhancedLang);
//         setShowAutoDetectBadge(true);
//       }
      
//       return enhancedLang;
//     }
//   };

//   // Enhanced language detection (fallback)
//   const enhancedLanguageDetection = (text) => {
//     const textLower = text.toLowerCase().trim();
    
//     // Hindi detection patterns (Romanized and Devanagari)
//     const hindiPatterns = [
//       /\b(aap|tum|kaise|kya|kaun|kahan|kyon|hain|hai|ho|nahi|ji|shukriya|dhanyavad|namaste|accha|thik|theek|sahi|galti|samajh|dekh|sun|bol|likh|padh)\b/i,
//       /[\u0900-\u097F]/, // Devanagari script
//       /\b(mera|meri|hamara|tumhara|uska|unki|unka|kaise)\b/i,
//       /\b(karna|hona|jana|lena|dena|ana)\b/i,
//       /\b(bahut|zyada|kam|accha|bura|sundar)\b/i
//     ];
    
//     // Tamil detection
//     const tamilPatterns = [
//       /\b(vanakkam|nandri|epdi|eppadi|enga|yaaru|enna|edhukku|porumai|nalama|romba|konjam)\b/i,
//       /[\u0B80-\u0BFF]/, // Tamil script
//       /\b(nan|naan|ungal|ungalukku|ungaloda)\b/i
//     ];
    
//     // Telugu detection
//     const teluguPatterns = [
//       /\b(namaskaram|dhanyavadalu|ela|emi|evaru|ekkada|enduku|chala|baga|manchi)\b/i,
//       /[\u0C00-\u0C7F]/, // Telugu script
//       /\b(nenu|meeru|thamudu|chelli|amma|nanna)\b/i
//     ];
    
//     // Gujarati detection
//     const gujaratiPatterns = [
//       /\b(kem|cho|chho|shu|kai|kyare|kahan|kemcho|avjo|jojo|shubh|ratri|divas)\b/i,
//       /[\u0A80-\u0AFF]/, // Gujarati script
//       /\b(hu|tame|aman|maro|taro|chhe)\b/i
//     ];
    
//     // Marathi detection
//     const marathiPatterns = [
//       /\b(kasa|kaay|kaahi|kuthhe|kashala|mala|tula|amhala|tumhala|pan|tar|ani|kichit)\b/i,
//       /[\u0900-\u097F]/, // Devanagari script (shared with Hindi)
//       /\b(ho|kaay|kiti|jasta|kami|changla|vait)\b/i,
//       /\b(ahe|ahet|hot|hoti|hoto)\b/i // Marathi verb endings
//     ];
    
//     // Count matches for each language
//     const scores = {
//       hi: hindiPatterns.filter(pattern => pattern.test(textLower)).length,
//       ta: tamilPatterns.filter(pattern => pattern.test(textLower)).length,
//       te: teluguPatterns.filter(pattern => pattern.test(textLower)).length,
//       gu: gujaratiPatterns.filter(pattern => pattern.test(textLower)).length,
//       mr: marathiPatterns.filter(pattern => pattern.test(textLower)).length,
//       en: 0 // English is default
//     };
    
//     console.log("Language detection scores for:", textLower, scores);
    
//     // Find language with highest score
//     let maxScore = 0;
//     let detectedLang = "en";
    
//     Object.entries(scores).forEach(([lang, score]) => {
//       if (score > maxScore) {
//         maxScore = score;
//         detectedLang = lang;
//       }
//     });
    
//     // Special case: If text has Devanagari script, need to distinguish Hindi vs Marathi
//     if (scores.hi > 0 && scores.mr > 0) {
//       // Check for specific Marathi markers
//       const marathiMarkers = ['ahe', 'ahet', 'hot', 'hoti', 'kasa', 'kaay', 'mala', 'tula'];
//       const marathiCount = marathiMarkers.filter(marker => textLower.includes(marker)).length;
      
//       const hindiMarkers = ['hai', 'hain', 'ho', 'kaise', 'kya', 'mera', 'meri'];
//       const hindiCount = hindiMarkers.filter(marker => textLower.includes(marker)).length;
      
//       detectedLang = marathiCount > hindiCount ? "mr" : "hi";
//     }
    
//     // If we have a non-English detection with at least 2 patterns matched
//     if (detectedLang !== "en" && maxScore >= 2) {
//       return detectedLang;
//     }
    
//     // If text is very short or ambiguous, check for greeting patterns
//     if (textLower.length < 15) {
//       const greetings = {
//         hi: ['namaste', 'namaskar', 'pranam', 'aadaab'],
//         ta: ['vanakkam', 'vaazhga'],
//         te: ['namaskaram', 'dhanyavadalu'],
//         gu: ['kem cho', 'jai shree krishna'],
//         mr: ['namaskar', 'jai maharashtra']
//       };
      
//       for (const [lang, greets] of Object.entries(greetings)) {
//         if (greets.some(greet => textLower.includes(greet.toLowerCase()))) {
//           return lang;
//         }
//       }
//     }
    
//     return "en"; // Default to English
//   };

//   // Start voice recording (text transcription)
//   const startVoiceInput = () => {
//     if (!speechSupported) {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//       return;
//     }

//     if (recognitionRef.current && !isListening) {
//       setInputMessage("");
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Failed to start speech recognition:', error);
//         setIsListening(false);
//       }
//     }
//   };

//   // Stop voice recording manually
//   const stopVoiceInput = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//     }
//   };

//   // Start audio recording (for sending audio file)
//   const startAudioInput = async () => {
//     try {
//       await startAudioRecording();
//     } catch (error) {
//       console.error('Failed to start audio recording:', error);
//     }
//   };

//   // Stop audio recording
//   const stopAudioInput = () => {
//     stopAudioRecording();
//   };

//   // Manual send message
//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     setIsProcessing(true);
    
//     // Store original language before sending
//     const originalLang = selectedLanguage;
    
//     const newMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: "user",
//       language: selectedLanguage,
//       isVoice: false
//     };

//     setMessages((prev) => [...prev, newMessage]);
//     setInputMessage("");

//     try {
//       // First detect language if English is selected or input suggests different language
//       let langToUse = selectedLanguage;
      
//       // Always run detection to show badge, but only auto-switch if English was selected
//       const detectedLang = await detectLanguage(inputMessage);
      
//       if (originalLang === "en") {
//         langToUse = detectedLang;
//         setSelectedLanguage(detectedLang);
//       }
      
//       const botReply = await sendMessageToN8N(inputMessage, langToUse);

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: botReply,
//           sender: "bot",
//           language: langToUse
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
//           sender: "bot",
//           language: selectedLanguage
//         },
//       ]);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Send message to n8n Webhook - MAIN INTEGRATION POINT
//   const sendMessageToN8N = async (message, language) => {
//     try {
//       const res = await fetch(
//         "https://solutionseekers2.app.n8n.cloud/webhook/test",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ 
//             message,
//             language: language || selectedLanguage,
//             detectedLanguage: detectedLanguage || language || selectedLanguage,
//             timestamp: new Date().toISOString(),
//             source: "chatbot_web"
//           }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
      
//       // Parse the response using the helper function
//       const replyText = parseN8nResponse(data);
      
//       return replyText;
      
//     } catch (error) {
//       console.error("Error sending message to n8n:", error);
      
//       // Return user-friendly error message
//       if (error.message.includes('Failed to fetch')) {
//         return "⚠ Network error: Unable to connect to the server. Please check your internet connection.";
//       }
      
//       throw error;
//     }
//   };

//   // Get current language name
//   const getCurrentLanguageName = () => {
//     const lang = languages.find(l => l.code === selectedLanguage);
//     return lang ? lang.native : "English";
//   };

//   // Get detected language name
//   const getDetectedLanguageName = () => {
//     const lang = languages.find(l => l.code === detectedLanguage);
//     return lang ? lang.name : "Unknown";
//   };

//   // Reset auto-detect badge when user manually changes language
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setSelectedLanguage(newLang);
//     setShowAutoDetectBadge(false); // Hide badge on manual change
//     setOriginalSelectedLang(newLang); // Reset original
//   };

//   return (
//     <div className="fixed inset-0 bg-white z-30 flex flex-col">
//       {/* Header with Language Info */}
//       <div className="border-b border-gray-200 bg-white px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
//               <div className="text-white text-lg font-medium"><img  src="data:image/jpeg;base64,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" width="40px" height="40px" className="bg-purple-600"/> </div>
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">
//                 Raj-Sahayak AI Assistant
//               </h1>
//               <p className="text-sm text-gray-500">How can I help you today?</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             {/* Language Detection Badge */}
//             {showAutoDetectBadge && detectedLanguage && (
//               <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full shadow-sm animate-pulse">
//                 <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
//                 Auto-detected: {getDetectedLanguageName()}
//               </div>
//             )}
            
//             {/* Language Selector */}
//             <div className="relative">
//               <select
//                 value={selectedLanguage}
//                 onChange={handleLanguageChange}
//                 className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pl-10 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
//               >
//                 {languages.map((lang) => (
//                   <option key={lang.code} value={lang.code}>
//                     {lang.native} ({lang.name})
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                 <span className="text-gray-500 text-sm">🌐</span>
//               </div>
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                 <span className="text-gray-400">▼</span>
//               </div>
//             </div>
            
//             <button 
//               onClick={onClose} 
//               className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
//               title="Close chat"
//             >
//               <span className="text-gray-600 group-hover:text-gray-800 transition-colors text-lg">✕</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Chat messages */}
//       <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-gray-50 to-gray-100">
//         <div className="max-w-4xl mx-auto space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${
//                 message.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
//                   message.sender === "user"
//                     ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-sm"
//                     : "bg-white border border-gray-200 rounded-bl-sm"
//                 }`}
//               >
//                 {/* Use white-space: pre-line for bot messages to preserve line breaks */}
//                 <p 
//                   className="text-sm"
//                   style={{ 
//                     whiteSpace: message.sender === "bot" ? "pre-line" : "normal"
//                   }}
//                 >
//                   {formatMessageText(message.text, message.sender === "bot")}
//                 </p>
//                 {message.sender === "user" && (
//                   <div className="text-xs opacity-80 mt-2 flex items-center gap-1.5">
                    
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
          
//           {/* Loading indicator */}
//           {isProcessing && (
//             <div className="flex justify-start">
//               <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] shadow-sm">
//                 <div className="flex items-center space-x-3">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                     <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {audioBlob ? "🎵 Processing audio..." : "🤔 Thinking..."}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Input bar with Voice */}
//       <div className="border-t border-gray-200 bg-white px-6 py-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex space-x-2">
//             {/* Voice Input Button (Text Transcription) */}
//             <button
//               onClick={isListening ? stopVoiceInput : startVoiceInput}
//               className={`p-3 rounded-xl border transition-all duration-200 ${
//                 isListening 
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg scale-105" 
//                   : speechSupported 
//                     ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 hover:shadow-md"
//                     : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
//               }`}
//               title={
//                 !speechSupported 
//                   ? "Voice transcription not supported" 
//                   : isListening 
//                     ? "Stop voice transcription" 
//                     : "Start voice transcription (text)"
//               }
//               type="button"
//               disabled={isProcessing || !speechSupported || isRecording}
//             >
//               <span className="text-lg">{isListening ? "⏹" : "🎤"}</span>
//             </button>

//             {/* Audio Recording Button (Send Audio File) */}
//             <button
//               onClick={isRecording ? stopAudioInput : startAudioInput}
//               className={`p-3 rounded-xl border transition-all duration-200 ${
//                 isRecording 
//                   ? "bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white shadow-lg scale-105" 
//                   : "bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-500 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-md"
//               }`}
//               title={isRecording ? "Stop audio recording" : "Start audio recording (send as file)"}
//               type="button"
//               disabled={isProcessing || isListening}
//             >
//               <span className="text-lg">{isRecording ? "⏹" : "🎵"}</span>
//             </button>

//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => {
//                 setInputMessage(e.target.value);
//                 if (e.target.value.trim().length >= 3) {
//                   detectLanguage(e.target.value);
//                 }
//               }}
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//               placeholder={
//                 isListening 
//                   ? "🎤 Speaking... (text transcription)" 
//                   : isRecording
//                     ? "🎵 Recording audio... (will send as file)"
//                     : ⌨ Type your message in ${getCurrentLanguageName()}...
//               }
//               className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//               disabled={isProcessing || isRecording}
//             />
            
//             <button
//               onClick={handleSendMessage}
//               disabled={!inputMessage.trim() || isProcessing || isRecording}
//               className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center min-w-[80px]"
//             >
//               {isProcessing ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <span className="flex items-center">
//                   Send
//                   <span className="ml-2 text-lg">➤</span>
//                 </span>
//               )}
//             </button>
//           </div>
          
//           {/* Voice Recording Status */}
//           {isListening && (
//             <div className="text-center mt-3">
//               <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm border border-blue-200 shadow-sm">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//                 <span className="flex items-center">
//                   <span className="mr-2">🎤</span>
//                   Listening... Speak for text transcription
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Audio Recording Status */}
//           {/* {isRecording && (
//             <div className="text-center mt-3">
//               <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 px-4 py-2 rounded-full text-sm border border-red-200 shadow-sm">
//                 <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
//                 <span className="flex items-center">
//                   <span className="mr-2">🎵</span>
//                   Recording audio... Click stop to send
//                 </span>
//               </div>
//             </div>
//           )} */}
          
//           {/* Browser Support Warning */}
//           {!speechSupported && (
//             <div className="text-center mt-2">
//               <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm border border-orange-200">
//                 <span className="mr-2">⚠</span>
//                 Voice transcription not supported. Please use Chrome, Edge, or Safari.
//               </div>
//             </div>
//           )}
          
//           {/* Instructions */}
//           {/* <div className="text-center mt-3 pt-3 border-t border-gray-100">
//             <div className="inline-flex items-center space-x-4 text-xs text-gray-500">
//               <span className="flex items-center">
//                 <span className="mr-1.5">🎤</span>
//                 Voice-to-text
//               </span>
//               <span className="flex items-center">
//                 <span className="mr-1.5">🎵</span>
//                 Audio message
//               </span>
//               <span className="flex items-center">
//                 <span className="mr-1.5">⌨</span>
//                 Type message
//               </span>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;




import React, { useState, useRef, useEffect } from "react";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AI Assistant. How can I help you today?",
      sender: "bot",
      language: "en",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [showAutoDetectBadge, setShowAutoDetectBadge] = useState(false);
  const [originalSelectedLang, setOriginalSelectedLang] = useState("en");

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Available languages with speech recognition codes
  const languages = [
    { code: "en", name: "English", native: "English", speechCode: "en-IN" },
    { code: "hi", name: "Hindi", native: "हिन्दी", speechCode: "hi-IN" },
    { code: "ta", name: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
    { code: "te", name: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી", speechCode: "gu-IN" },
    { code: "mr", name: "Marathi", native: "मराठी", speechCode: "mr-IN" },
  ];

  // Helper function to format bot messages with line breaks
  const formatMessageText = (text, isBot = false) => {
    if (!isBot) return text ?? "";
    // Remove markdown ** and convert \n sequences to real newlines
    let cleanedText = (text ?? "")
      .replace(/\*\*/g, "")
      .replace(/\\n/g, "\n");
    return cleanedText;
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition (keeps transcription)
  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn("Speech recognition not supported in this browser");
        setSpeechSupported(false);
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      const currentLang = languages.find((lang) => lang.code === selectedLanguage);
      recognitionRef.current.lang = currentLang ? currentLang.speechCode : "en-IN";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript;
          else interimTranscript += transcript;
        }

        if (interimTranscript) {
          setInputMessage(interimTranscript);
        }

        if (finalTranscript) {
          setInputMessage(finalTranscript);
          // Auto-detect language for voice input
          detectLanguage(finalTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (inputMessage.trim().length > 0) {
          setTimeout(() => {
            handleAutoSend();
          }, 500);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          alert("Please allow microphone access to use voice commands");
        }
      };
    };

    initSpeechRecognition();

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Update recognition language when selectedLanguage changes
  useEffect(() => {
    if (recognitionRef.current) {
      const currentLang = languages.find((lang) => lang.code === selectedLanguage);
      recognitionRef.current.lang = currentLang ? currentLang.speechCode : "en-IN";
    }
  }, [selectedLanguage]);

  // Auto-send message after voice input
  const handleAutoSend = async () => {
    if (!inputMessage.trim()) return;

    setIsProcessing(true);

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      language: selectedLanguage,
      isVoice: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    const messageToSend = inputMessage;
    setInputMessage("");

    try {
      const botReply = await sendMessageToN8N(messageToSend, selectedLanguage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          sender: "bot",
          language: selectedLanguage,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          language: selectedLanguage,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Manual send message (typing)
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsProcessing(true);

    const originalLang = selectedLanguage;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      language: selectedLanguage,
      isVoice: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      // Always run detection to show badge; auto-switch only if original was "en"
      const detectedLang = await detectLanguage(newMessage.text);
      let langToUse = originalLang;
      if (originalLang === "en") {
        langToUse = detectedLang;
        setSelectedLanguage(detectedLang);
      }

      const botReply = await sendMessageToN8N(newMessage.text, langToUse);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          sender: "bot",
          language: langToUse,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          language: selectedLanguage,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Send message to n8n Webhook
  const sendMessageToN8N = async (message, language) => {
    try {
      const res = await fetch("https://solutionseekers2.app.n8n.cloud/webhook/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          language: language || selectedLanguage,
          detectedLanguage: detectedLanguage || language || selectedLanguage,
          timestamp: new Date().toISOString(),
          source: "chatbot_web",
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const replyText = parseN8nResponse(data);
      return replyText;
    } catch (error) {
      console.error("Error sending message to n8n:", error);
      if (error.message.includes("Failed to fetch")) {
        return "⚠ Network error: Unable to connect to the server. Please check your internet connection.";
      }
      throw error;
    }
  };

  // Parse n8n response
  const parseN8nResponse = (data) => {
    if (!data) return "I received your message but couldn't process the response.";

    let responseText = "";

    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      if (firstItem.json && firstItem.json.output) responseText = firstItem.json.output;
      else if (firstItem.output) responseText = firstItem.output;
      else if (firstItem.text) responseText = firstItem.text;
      else if (typeof firstItem === "string") responseText = firstItem;
    } else if (typeof data === "object") {
      if (data.output) responseText = data.output;
      else if (data.reply) responseText = data.reply;
      else if (data.text) responseText = data.text;
      else if (data.message) responseText = data.message;
    } else if (typeof data === "string") {
      responseText = data;
    }

    if (responseText) {
      responseText = responseText.replace(/\*\*/g, "");
      responseText = responseText.replace(/\\n/g, "\n");
      responseText = responseText.replace(/\* /g, "• ");
      responseText = responseText.replace(/#{1,6}\s*/g, "");
      return responseText;
    }

    return "I processed your request successfully.";
  };

  // Language detection using OpenAI (as in your original code)
  // NOTE: Replace the API key usage with an env variable on server side for safety.
  const detectLanguage = async (text) => {
    if (!text || text.trim().length < 3) return "en";

    setOriginalSelectedLang(selectedLanguage);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // IMPORTANT: DO NOT store real API keys in client code in production.
          Authorization: `Bearer REPLACE_WITH_YOUR_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Analyze this text and determine its primary language: "${text}"

Available language codes: en (English), hi (Hindi), ta (Tamil), te (Telugu), gu (Gujarati), mr (Marathi)

Return ONLY the language code, no explanations. Text: "${text}"`,
            },
          ],
          temperature: 0.1,
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        console.error("OpenAI API error:", await response.text());
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const detectedLang = (data.choices?.[0]?.message?.content || "en")
        .trim()
        .toLowerCase();

      const validLang = languages.find((l) => l.code === detectedLang) ? detectedLang : "en";

      setDetectedLanguage(validLang);
      if (validLang !== originalSelectedLang && validLang !== "en") setShowAutoDetectBadge(true);
      else setShowAutoDetectBadge(false);

      if ((selectedLanguage === "en" || originalSelectedLang === "en") && validLang !== "en") {
        setSelectedLanguage(validLang);
        setShowAutoDetectBadge(true);
      }
      return validLang;
    } catch (error) {
      console.error("OpenAI detection failed, falling back:", error);
      const fallback = enhancedLanguageDetection(text);
      setDetectedLanguage(fallback);
      if (fallback !== originalSelectedLang && fallback !== "en") setShowAutoDetectBadge(true);
      if ((selectedLanguage === "en" || originalSelectedLang === "en") && fallback !== "en") {
        setSelectedLanguage(fallback);
        setShowAutoDetectBadge(true);
      }
      return fallback;
    }
  };

  // Fallback local detection (kept from your original code)
  const enhancedLanguageDetection = (text) => {
    const textLower = text.toLowerCase().trim();
    const hindiPatterns = [
      /\b(aap|tum|kaise|kya|kaun|kahan|kyon|hain|hai|ho|nahi|ji|shukriya|dhanyavad|namaste)\b/i,
      /[\u0900-\u097F]/,
    ];
    const tamilPatterns = [/\b(vanakkam|nandri|epdi|eppadi)\b/i, /[\u0B80-\u0BFF]/];
    const teluguPatterns = [/\b(namaskaram|dhanyavadalu|ela|emi)\b/i, /[\u0C00-\u0C7F]/];
    const gujaratiPatterns = [/\b(kem|cho|avjo|kemcho)\b/i, /[\u0A80-\u0AFF]/];
    const marathiPatterns = [/\b(kasa|kaay|mala|tula|ahe|ahet)\b/i, /[\u0900-\u097F]/];

    const scores = {
      hi: hindiPatterns.filter((p) => p.test(textLower)).length,
      ta: tamilPatterns.filter((p) => p.test(textLower)).length,
      te: teluguPatterns.filter((p) => p.test(textLower)).length,
      gu: gujaratiPatterns.filter((p) => p.test(textLower)).length,
      mr: marathiPatterns.filter((p) => p.test(textLower)).length,
      en: 0,
    };

    let maxScore = 0;
    let detectedLang = "en";
    Object.entries(scores).forEach(([lang, score]) => {
      if (score > maxScore) {
        maxScore = score;
        detectedLang = lang;
      }
    });

    if (detectedLang !== "en" && maxScore >= 1) return detectedLang;
    if (textLower.length < 15) {
      const greetings = {
        hi: ["namaste", "namaskar", "pranam"],
        ta: ["vanakkam"],
        te: ["namaskaram"],
        gu: ["kem cho"],
        mr: ["namaskar"],
      };
      for (const [lang, greets] of Object.entries(greetings)) {
        if (greets.some((g) => textLower.includes(g))) return lang;
      }
    }

    return "en";
  };

  // Start / Stop speech transcription
  const startVoiceInput = () => {
    if (!speechSupported) {
      alert("Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }
    if (recognitionRef.current && !isListening) {
      setInputMessage("");
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setIsListening(false);
      }
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current && isListening) recognitionRef.current.stop();
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find((l) => l.code === selectedLanguage);
    return lang ? lang.native : "English";
  };

  const getDetectedLanguageName = () => {
    const lang = languages.find((l) => l.code === detectedLanguage);
    return lang ? lang.name : "Unknown";
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setShowAutoDetectBadge(false);
    setOriginalSelectedLang(newLang);
  };

  return (
    <div className="fixed inset-0 bg-white z-30 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              {/* small logo or initial */}
              <div className="text-white text-lg font-medium">RA</div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Raj-Sahayak AI Assistant</h1>
              <p className="text-sm text-gray-500">How can I help you today?</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showAutoDetectBadge && detectedLanguage && (
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full shadow-sm animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2" />
                Auto-detected: {getDetectedLanguageName()}
              </div>
            )}

            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pl-10 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-500 text-sm">🌐</span>
              </div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <span className="text-gray-400">▼</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              title="Close chat"
            >
              <span className="text-gray-600 group-hover:text-gray-800 transition-colors text-lg">✕</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-sm"
                    : "bg-white border border-gray-200 rounded-bl-sm"
                }`}
              >
                <p className="text-sm" style={{ whiteSpace: message.sender === "bot" ? "pre-line" : "normal" }}>
                  {formatMessageText(message.text, message.sender === "bot")}
                </p>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <span className="text-sm text-gray-600">🤔 Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar (voice transcription + send) */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2">
            {/* Voice Input Button (Text Transcription) */}
            <button
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                isListening
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg scale-105"
                  : speechSupported
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 hover:shadow-md"
                  : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
              title={!speechSupported ? "Voice transcription not supported" : isListening ? "Stop voice transcription" : "Start voice transcription (text)"}
              type="button"
              disabled={isProcessing || !speechSupported}
            >
              <span className="text-lg">{isListening ? "⏹" : "🎤"}</span>
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                if (e.target.value.trim().length >= 3) detectLanguage(e.target.value);
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isListening ? "🎤 Speaking... (text transcription)" : `⌨ Type your message in ${getCurrentLanguageName()}...`}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              disabled={isProcessing}
            />

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isProcessing}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center min-w-[80px]"
            >
              {isProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="flex items-center">Send <span className="ml-2 text-lg">➤</span></span>}
            </button>
          </div>

          {isListening && (
            <div className="text-center mt-3">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm border border-blue-200 shadow-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="flex items-center">
                  <span className="mr-2">🎤</span>
                  Listening... Speak for text transcription
                </span>
              </div>
            </div>
          )}

          {!speechSupported && (
            <div className="text-center mt-2">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm border border-orange-200">
                <span className="mr-2">⚠</span>
                Voice transcription not supported. Please use Chrome, Edge, or Safari.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
