import { TraningVideoDialog } from "@/components/traning-video-dialog";
import { Fragment } from "react";

type Video = {
  id: string;
  titleId: string;
  isActive: boolean;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
};

type VideoSection = {
  id: string;
  title: string;
  video: Video[];
};

interface VideoSectionProps {
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => (
  <div className="mb-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <div key={video.id}>
          <TraningVideoDialog
            className="h-full"
            animationStyle="from-center"
            videoSrc={video.videoSrc}
            thumbnailSrc={video.thumbnailSrc}
            thumbnailAlt={video.thumbnailAlt}
          />
        </div>
      ))}
    </div>
  </div>
);

interface TrainingVideosProps {
  apiData: VideoSection[];
}

const TrainingVideos: React.FC<TrainingVideosProps> = ({ apiData }) => {
  return (
    <div className="bg-card py-6 px-4 md:container mx-auto md:rounded-xl mb-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Training Videos</h1>
        <p className="text-white">Our Comprehensive Guide/Training</p>
      </header>

      {apiData.map((section) => (
        <Fragment key={section.id}>
          <h2 className="py-3 text-xl font-bold text-white">{section.title}</h2>
          <VideoSection videos={section.video} />
        </Fragment>
      ))}
    </div>
  );
};

export default TrainingVideos;


