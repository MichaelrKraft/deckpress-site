"use client"

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VideoRecorder } from './VideoRecorder'
import { 
  Camera, 
  Play, 
  Trash2, 
  Download, 
  Upload,
  Eye,
  Clock,
  FileVideo,
  Plus,
  Edit3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface VideoRecord {
  id: string
  name: string
  blob: Blob
  thumbnail: string
  duration: number
  createdAt: Date
  size: number
}

interface VideoManagerProps {
  onVideoSelect: (video: VideoRecord) => void
  selectedVideo?: VideoRecord
  maxVideos?: number
}

export function VideoManager({ 
  onVideoSelect, 
  selectedVideo, 
  maxVideos = 5 
}: VideoManagerProps) {
  const [videos, setVideos] = useState<VideoRecord[]>([])
  const [showRecorder, setShowRecorder] = useState(false)
  const [previewVideo, setPreviewVideo] = useState<VideoRecord | null>(null)

  const handleVideoSave = useCallback((videoBlob: Blob, thumbnail: string) => {
    // Calculate duration (simplified - in real app you'd analyze the blob)
    const duration = 60 // placeholder
    
    const newVideo: VideoRecord = {
      id: Date.now().toString(),
      name: `Introduction Video ${videos.length + 1}`,
      blob: videoBlob,
      thumbnail,
      duration,
      createdAt: new Date(),
      size: videoBlob.size
    }

    setVideos(prev => [newVideo, ...prev.slice(0, maxVideos - 1)])
    onVideoSelect(newVideo)
    setShowRecorder(false)
  }, [videos.length, maxVideos, onVideoSelect])

  const handleDeleteVideo = (videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId))
    if (selectedVideo?.id === videoId) {
      onVideoSelect(videos.find(v => v.id !== videoId) || videos[0])
    }
  }

  const handleDownloadVideo = (video: VideoRecord) => {
    const url = URL.createObjectURL(video.blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${video.name}.webm`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Video Library</h2>
          <p className="text-white/60">
            Manage your introduction videos ({videos.length}/{maxVideos})
          </p>
        </div>
        
        <Button
          onClick={() => setShowRecorder(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white"
          disabled={videos.length >= maxVideos}
        >
          <Camera className="w-5 h-5 mr-2" />
          Record New Video
        </Button>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <Card 
              className={`relative overflow-hidden cursor-pointer transition-all ${
                selectedVideo?.id === video.id 
                  ? 'ring-2 ring-purple-400 bg-purple-500/10' 
                  : 'hover:bg-white/5'
              }`}
              onClick={() => onVideoSelect(video)}
            >
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-32 object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewVideo(video)
                      }}
                      className="text-white"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDuration(video.duration)}
                    </Badge>
                  </div>

                  {/* Selected Indicator */}
                  {selectedVideo?.id === video.id && (
                    <div className="absolute top-2 left-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-white" />
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 truncate">
                    {video.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{formatFileSize(video.size)}</span>
                    <span>{video.createdAt.toLocaleDateString()}</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 mt-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadVideo(video)
                      }}
                      className="text-white/60 hover:text-white p-1"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteVideo(video.id)
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add New Video Card */}
        {videos.length < maxVideos && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            layout
          >
            <Card 
              className="border-2 border-dashed border-white/20 hover:border-purple-400 hover:bg-purple-500/5 cursor-pointer transition-all"
              onClick={() => setShowRecorder(true)}
            >
              <CardContent className="p-6 h-48 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">Record New Video</h3>
                <p className="text-sm text-white/60">
                  Create a personal introduction
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="col-span-full">
            <Card className="border-2 border-dashed border-white/20">
              <CardContent className="p-12 text-center">
                <FileVideo className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No videos yet
                </h3>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  Record your first introduction video to make your pitch deck more personal and engaging for investors.
                </p>
                <Button
                  onClick={() => setShowRecorder(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Record Your First Video
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Video Recorder Modal */}
      <VideoRecorder
        isOpen={showRecorder}
        onClose={() => setShowRecorder(false)}
        onVideoSave={handleVideoSave}
        maxDuration={300} // 5 minutes
        suggestedDuration={60} // 1 minute
      />

      {/* Preview Modal */}
      <AnimatePresence>
        {previewVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl mx-4 bg-slate-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold text-white">{previewVideo.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewVideo(null)}
                >
                  ×
                </Button>
              </div>

              {/* Video */}
              <video
                className="w-full h-80 bg-black"
                controls
                autoPlay
                src={URL.createObjectURL(previewVideo.blob)}
              />

              {/* Actions */}
              <div className="p-4 flex items-center justify-between">
                <div className="text-sm text-white/60">
                  {formatFileSize(previewVideo.size)} • {formatDuration(previewVideo.duration)}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onVideoSelect(previewVideo)
                      setPreviewVideo(null)
                    }}
                  >
                    Select Video
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadVideo(previewVideo)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}