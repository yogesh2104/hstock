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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="py-6 px-4 md:container mx-auto md:rounded-xl mb-6">
      {/* <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
          Training Videos <br />
          
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Our Comprehensive Guide/Training
        </p>
      </div> */}

      {apiData.map((section) => (
        <Fragment key={section.id}>
          <h2 className="py-3 text-xl font-bold text-black">{section.title}</h2>
          <VideoSection videos={section.video} />
        </Fragment>
      ))}
    </div>
  );
};

export default TrainingVideos;


