"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { EditableText } from '@/components/ui/EditableText'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  Camera,
  Edit3,
  Trash2
} from 'lucide-react'
import { SlideContent } from '@/lib/openai'

interface VideoSlideTemplateProps {
  slide: SlideContent
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: () => void
  className?: string
  videoBlob?: Blob
  thumbnailUrl?: string
  onEditVideo?: () => void
  onDeleteVideo?: () => void
}

interface VideoContent {
  url?: string
  blob?: Blob
  thumbnail?: string
  duration?: number
  title?: string
  description?: string
}

export function VideoSlideTemplate({
  slide,
  onUpdateSlide,
  onAiImprove,
  className = "",
  videoBlob,
  thumbnailUrl,
  onEditVideo,
  onDeleteVideo
}: VideoSlideTemplateProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Get video content from slide data
  const videoContent = slide.content.video as VideoContent | undefined
  const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : videoContent?.url
  const thumbnail = thumbnailUrl || videoContent?.thumbnail

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const updateSlideContent = (field: string, value: any) => {
    if (onUpdateSlide) {
      const updatedSlide = {
        ...slide,
        content: {
          ...slide.content,
          [field]: value
        }
      }
      onUpdateSlide(updatedSlide)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Slide Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <EditableText
              content={slide.title}
              onChange={(value) => updateSlideContent('title', value)}
              variant="h2"
              className="text-2xl font-bold text-white"
              placeholder="Video slide title..."
              onAiImprove={onAiImprove}
            />
          </div>
        </div>
        
        {/* Video Controls */}
        {videoUrl && (
          <div className="flex items-center gap-2">
            {onEditVideo && (
              <button
                onClick={onEditVideo}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title="Edit video"
              >
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            )}
            {onDeleteVideo && (
              <button
                onClick={onDeleteVideo}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                title="Delete video"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video Player */}
      <div className="relative">
        {videoUrl ? (
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-80 object-cover"
              poster={thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/webm" />
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
              {/* Center Play Button */}
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </motion.button>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                {/* Progress Bar */}
                <div 
                  className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlay}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                    </button>
                    
                    <button
                      onClick={handleMute}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Placeholder when no video
          <div className="w-full h-80 bg-white/5 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center">
            <Camera className="w-16 h-16 text-white/40 mb-4" />
            <h3 className="text-xl font-semibold text-white/60 mb-2">No video recorded</h3>
            <p className="text-white/40 text-center mb-4">
              Record an introduction video to make your pitch more personal
            </p>
            {onEditVideo && (
              <button
                onClick={onEditVideo}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Record Video
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video Description */}
      <div className="space-y-4">
        {/* Main Headline */}
        <div>
          <label className="text-sm text-white/60 mb-2 block">Headline</label>
          <EditableText
            content={slide.content.headline || 'Meet the Founder'}
            onChange={(value) => updateSlideContent('headline', value)}
            variant="h3"
            className="text-xl font-semibold text-white"
            placeholder="Video headline..."
            onAiImprove={onAiImprove}
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-white/60 mb-2 block">Description</label>
          <EditableText
            content={slide.content.subheadline || 'A personal introduction from our founder explaining the vision and passion behind this company.'}
            onChange={(value) => updateSlideContent('subheadline', value)}
            variant="p"
            className="text-lg text-white/80 leading-relaxed"
            placeholder="Video description..."
            multiline={true}
            onAiImprove={onAiImprove}
          />
        </div>

        {/* Key Points */}
        {slide.content.bullets && slide.content.bullets.length > 0 && (
          <div>
            <label className="text-sm text-white/60 mb-2 block">Key Points Covered</label>
            <div className="space-y-2">
              {slide.content.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <EditableText
                    content={bullet}
                    onChange={(value) => {
                      const newBullets = [...(slide.content.bullets || [])]
                      newBullets[index] = value
                      updateSlideContent('bullets', newBullets)
                    }}
                    variant="p"
                    className="text-white/90 flex-1"
                    placeholder="Key point..."
                    onAiImprove={onAiImprove}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {slide.content.callout && (
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-400/30">
            <EditableText
              content={slide.content.callout}
              onChange={(value) => updateSlideContent('callout', value)}
              variant="p"
              className="text-white font-medium text-center"
              placeholder="Call to action..."
              onAiImprove={onAiImprove}
            />
          </div>
        )}
      </div>
    </div>
  )
}