"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Monitor, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Play,
  Pause,
  Square,
  RotateCcw,
  Download,
  Trash2,
  Settings,
  CheckCircle,
  Clock,
  Eye,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface VideoRecorderProps {
  onVideoSave: (videoBlob: Blob, thumbnail: string) => void
  onClose: () => void
  isOpen: boolean
  maxDuration?: number // in seconds
  suggestedDuration?: number // in seconds
}

type RecordingMode = 'camera' | 'screen' | 'both'
type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped' | 'reviewing'

export function VideoRecorder({ 
  onVideoSave, 
  onClose, 
  isOpen, 
  maxDuration = 300, // 5 minutes
  suggestedDuration = 60 // 1 minute
}: VideoRecorderProps) {
  // Recording state
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('camera')
  const [duration, setDuration] = useState(0)
  
  // Media settings
  const [isCameraEnabled, setIsCameraEnabled] = useState(true)
  const [isMicEnabled, setIsMicEnabled] = useState(true)
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string>('')
  const [selectedMic, setSelectedMic] = useState<string>('')
  
  // Recording data
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [finalVideoBlob, setFinalVideoBlob] = useState<Blob | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  
  // Refs
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const playbackVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize devices and permissions
  useEffect(() => {
    if (isOpen) {
      initializeDevices()
    }
    
    return () => {
      cleanup()
    }
  }, [isOpen])

  const initializeDevices = async () => {
    try {
      // Request permissions first
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      
      // Get available devices
      const devices = await navigator.mediaDevices.enumerateDevices()
      setAvailableDevices(devices)
      
      // Set default devices
      const videoDevices = devices.filter(device => device.kind === 'videoinput')
      const audioDevices = devices.filter(device => device.kind === 'audioinput')
      
      if (videoDevices.length > 0) setSelectedCamera(videoDevices[0].deviceId)
      if (audioDevices.length > 0) setSelectedMic(audioDevices[0].deviceId)
      
      // Start preview
      await startPreview()
    } catch (error) {
      console.error('Failed to initialize devices:', error)
    }
  }

  const startPreview = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: isCameraEnabled ? { 
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } : false,
        audio: isMicEnabled ? {
          deviceId: selectedMic ? { exact: selectedMic } : undefined,
          echoCancellation: true,
          noiseSuppression: true
        } : false
      }

      if (recordingMode === 'screen' || recordingMode === 'both') {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        })
        
        if (recordingMode === 'both' && isCameraEnabled) {
          const cameraStream = await navigator.mediaDevices.getUserMedia(constraints)
          // Combine streams - for now just use screen
          streamRef.current = screenStream
        } else {
          streamRef.current = screenStream
        }
      } else {
        streamRef.current = await navigator.mediaDevices.getUserMedia(constraints)
      }

      if (previewVideoRef.current && streamRef.current) {
        previewVideoRef.current.srcObject = streamRef.current
      }
    } catch (error) {
      console.error('Failed to start preview:', error)
    }
  }

  const startRecording = useCallback(async () => {
    if (!streamRef.current) return

    try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9,opus'
      })

      mediaRecorderRef.current = mediaRecorder
      setRecordedChunks([])

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data])
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' })
        setFinalVideoBlob(blob)
        generateThumbnail(blob)
        setRecordingState('reviewing')
      }

      mediaRecorder.start(1000) // Collect data every second
      setRecordingState('recording')
      startTimer()
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }, [recordedChunks])

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.pause()
      setRecordingState('paused')
      stopTimer()
    }
  }, [recordingState])

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === 'paused') {
      mediaRecorderRef.current.resume()
      setRecordingState('recording')
      startTimer()
    }
  }, [recordingState])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecordingState('stopped')
      stopTimer()
    }
  }, [])

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 1
        if (newDuration >= maxDuration) {
          stopRecording()
          return maxDuration
        }
        return newDuration
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const generateThumbnail = async (videoBlob: Blob) => {
    try {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(videoBlob)
      video.currentTime = 1 // Get thumbnail at 1 second
      
      video.onloadeddata = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8)
          setThumbnailUrl(thumbnailDataUrl)
        }
        
        URL.revokeObjectURL(video.src)
      }
    } catch (error) {
      console.error('Failed to generate thumbnail:', error)
    }
  }

  const retakeVideo = () => {
    setRecordingState('idle')
    setDuration(0)
    setFinalVideoBlob(null)
    setThumbnailUrl('')
    setRecordedChunks([])
    startPreview()
  }

  const saveVideo = () => {
    if (finalVideoBlob && thumbnailUrl) {
      onVideoSave(finalVideoBlob, thumbnailUrl)
      onClose()
    }
  }

  const cleanup = () => {
    stopTimer()
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-4xl mx-4 bg-slate-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Record Introduction Video</h2>
                <p className="text-white/60 mt-1">
                  Create a personal introduction for your pitch deck
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Recording indicator */}
                {recordingState === 'recording' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 font-medium">{formatTime(duration)}</span>
                  </div>
                )}
                
                {/* Duration badge */}
                <Badge variant={duration > suggestedDuration ? "warning" : "default"}>
                  Suggested: {formatTime(suggestedDuration)}
                </Badge>
                
                <Button variant="outline" size="sm" onClick={onClose}>
                  ×
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Video Preview/Playback */}
              <div className="lg:col-span-2">
                <Card className="relative overflow-hidden bg-black">
                  <CardContent className="p-0">
                    {recordingState === 'reviewing' && finalVideoBlob ? (
                      <video
                        ref={playbackVideoRef}
                        className="w-full h-80 object-cover"
                        controls
                        src={URL.createObjectURL(finalVideoBlob)}
                      />
                    ) : (
                      <video
                        ref={previewVideoRef}
                        className="w-full h-80 object-cover"
                        autoPlay
                        muted
                        playsInline
                      />
                    )}
                    
                    {/* Overlay controls during recording */}
                    {recordingState === 'recording' && (
                      <div className="absolute top-4 left-4 flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/90 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white font-medium">REC</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recording Controls */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  {recordingState === 'idle' && (
                    <Button
                      onClick={startRecording}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
                      disabled={!streamRef.current}
                    >
                      <Video className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  )}

                  {recordingState === 'recording' && (
                    <>
                      <Button
                        onClick={pauseRecording}
                        variant="outline"
                        className="px-6 py-3"
                      >
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </Button>
                      <Button
                        onClick={stopRecording}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop
                      </Button>
                    </>
                  )}

                  {recordingState === 'paused' && (
                    <>
                      <Button
                        onClick={resumeRecording}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Resume
                      </Button>
                      <Button
                        onClick={stopRecording}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop
                      </Button>
                    </>
                  )}

                  {recordingState === 'reviewing' && (
                    <>
                      <Button
                        onClick={retakeVideo}
                        variant="outline"
                        className="px-6 py-3"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Retake
                      </Button>
                      <Button
                        onClick={saveVideo}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Save Video
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              <div className="space-y-4">
                {/* Recording Mode */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-3">Recording Mode</h3>
                    <div className="space-y-2">
                      {[
                        { mode: 'camera' as RecordingMode, icon: Camera, label: 'Camera Only' },
                        { mode: 'screen' as RecordingMode, icon: Monitor, label: 'Screen Only' },
                        { mode: 'both' as RecordingMode, icon: Video, label: 'Camera + Screen' }
                      ].map(({ mode, icon: Icon, label }) => (
                        <button
                          key={mode}
                          onClick={() => setRecordingMode(mode)}
                          disabled={recordingState !== 'idle'}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            recordingMode === mode
                              ? 'bg-purple-500/20 border border-purple-400'
                              : 'bg-white/5 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                          <span className="text-white">{label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Media Controls */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-3">Media Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Camera</span>
                        <Button
                          size="sm"
                          variant={isCameraEnabled ? "primary" : "outline"}
                          onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                          disabled={recordingState !== 'idle'}
                        >
                          {isCameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Microphone</span>
                        <Button
                          size="sm"
                          variant={isMicEnabled ? "primary" : "outline"}
                          onClick={() => setIsMicEnabled(!isMicEnabled)}
                          disabled={recordingState !== 'idle'}
                        >
                          {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-3">
                      <Eye className="w-4 h-4 inline mr-2" />
                      Recording Tips
                    </h3>
                    <div className="space-y-2 text-sm text-white/70">
                      <p>• Keep it under {formatTime(suggestedDuration)} for best engagement</p>
                      <p>• Introduce yourself and your company briefly</p>
                      <p>• Speak clearly and maintain eye contact</p>
                      <p>• Ensure good lighting and quiet environment</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Hidden canvas for thumbnail generation */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}