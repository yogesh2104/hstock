import { TraningVideoDialog } from "@/components/traning-video-dialog";
import { siteConfig } from "@/config/site-config";

type Video = {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
};


interface VideoSectionProps {
  title: string;
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ title, videos }) => (
  <div className="mb-6">
    <h2 className="py-3 text-xl font-bold text-white">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {videos.map((video, index) => (
        <div key={index}>
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

const TrainingVideos: React.FC = () => {
  return (
    <div className="bg-card py-6 px-4 md:container mx-auto md:rounded-xl mb-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Training Videos</h1>
        <p className="text-white">Our Comprehensive Guide/Training</p>
      </header>

      {siteConfig.traningVideoData.map((section, index) => (
        <VideoSection key={index} title={section.title} videos={section.videos} />
      ))}
    </div>
  );
};

export default TrainingVideos;
