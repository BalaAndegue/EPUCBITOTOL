'use client';

import { useState } from 'react';
import { Play, Calendar, Download, BookOpen } from 'lucide-react';
import { getEmbeddedVideoUrl } from '@/lib/videoHelper';

interface SermonCardProps {
    sermon: {
        id: string;
        title: string;
        preacher: string;
        date: Date;
        description: string | null;
        verses: string | null;
        videoUrl: string | null;
        downloadUrl: string | null;
    };
}

export default function SermonCard({ sermon }: SermonCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const embedUrl = getEmbeddedVideoUrl(sermon.videoUrl);
    const hasVideo = !!embedUrl;

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
            {/* Media Area */}
            <div className="relative aspect-video bg-slate-900 border-b border-gray-100 flex-shrink-0">
                {isPlaying && hasVideo ? (
                    <iframe
                        src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 group">
                        {/* Placeholder image representation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-indigo-900 opacity-80"></div>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

                        {hasVideo ? (
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="relative z-10 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-[var(--color-primary)] hover:scale-110 transition-transform shadow-lg"
                            >
                                <Play className="w-8 h-8 ml-1" fill="currentColor" />
                            </button>
                        ) : (
                            <div className="relative z-10 text-white flex flex-col items-center opacity-70">
                                <BookOpen className="w-12 h-12 mb-2" />
                                <span className="text-sm font-medium">Message Audio / Texte</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 line-clamp-2" title={sermon.title}>
                        {sermon.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] font-medium text-sm mb-3 text-[var(--color-primary)]">
                        {sermon.preacher}
                    </p>

                    {sermon.verses && (
                        <div className="flex items-start text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded-md">
                            <BookOpen className="w-4 h-4 mr-2 mt-0.5 text-indigo-500 flex-shrink-0" />
                            <span className="italic">"{sermon.verses}"</span>
                        </div>
                    )}

                    {sermon.description && (
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
                            {sermon.description}
                        </p>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center text-gray-500 font-medium">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {new Date(sermon.date).toLocaleDateString()}
                    </div>
                    {sermon.downloadUrl && (
                        <a
                            href={sermon.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md font-medium transition-colors"
                        >
                            <Download className="w-4 h-4 mr-1.5" /> Fichier
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
