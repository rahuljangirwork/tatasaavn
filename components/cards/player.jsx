"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Play,
  Pause,
  Repeat,
  Repeat1,
  X,
  Download,
  Loader2,
  Share2,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";
import { MusicContext } from "@/hooks/use-context";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { IoPause } from "react-icons/io5";
import { useMusic } from "../music-provider";

export default function Player() {
  const [data, setData] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioURL, setAudioURL] = useState("");
  const [isLooping, setIsLooping] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const audioRef = useRef(null);
  const values = useContext(MusicContext);

  const getSong = async () => {
    const get = await getSongsById(values.music);
    const data = await get.json();
    setData(data.data[0]);
    setAudioURL(data?.data[0]?.downloadUrl?.[2]?.url || data?.data[0]?.downloadUrl?.[1]?.url || data?.data[0]?.downloadUrl?.[0]?.url);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const seekTime = e[0];
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const loopSong = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setIsLooping(!isLooping);
  };

  const downloadSong = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(audioURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name}.mp3`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Song downloaded successfully!");
    } catch (error) {
      toast.error("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const { current, setCurrent } = useMusic();

  useEffect(() => {
    if (values.music) {
      getSong();
      if (current) {
        audioRef.current.currentTime = parseFloat(current + 1);
      }
      setPlaying(localStorage.getItem("p") === "true" || !localStorage.getItem("p"));
      const handleTimeUpdate = () => {
        try {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration);
          setCurrent(audioRef.current.currentTime);
        } catch (e) {
          setPlaying(false);
        }
      };
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, [values.music]);

  return (
    <main>
      <audio
        autoPlay={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setDuration(audioRef.current.duration)}
        src={audioURL}
        ref={audioRef}
      ></audio>
      {values.music && (
        <div className="shadow-lg fixed bottom-0 max-w-full md:max-w-[700px] md:border-l md:border-r md:rounded-md md:!rounded-b-none md:ml-auto right-0 left-0 border-border overflow-hidden border-t-none z-50 bg-background gap-3">
          <div className="w-full">
            {!duration ? (
              <Skeleton className="h-1 w-full" />
            ) : (
              <Slider
                thumbClassName="hidden"
                trackClassName="h-1 transition-[height] group-hover:h-2 rounded-none"
                onValueChange={handleSeek}
                value={[currentTime]}
                max={duration}
                className="w-full group"
              />
            )}
          </div>
          <div className="grid gap-2 p-3 pt-1">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex items-center gap-2 w-full">
                <img
                  src={data.image ? data?.image[1]?.url : ""}
                  alt={data?.name}
                  className="rounded-md aspect-square h-12 w-12 bg-secondary hover:opacity-85 transition cursor-pointer md:h-14 md:w-14"
                />
                <img
                  src={data.image ? data?.image[1]?.url : ""}
                  alt={data?.name}
                  className="rounded-md h-[110%] min-w-[110%] opacity-40 hidden dark:block absolute top-0 left-0 right-0 blur-3xl -z-10"
                />
                <div className="w-full">
                {!data?.name ? (
  <Skeleton className="h-4 w-32" />
) : (
  <>
  
    
    {/* Show full name only on large screens */}
    <Link
      href={`/${values.music}`}
      className="text-base hover:opacity-85 transition font-medium gap-2 items-center hidden md:flex"
    >
      {data?.name}
    </Link>
  </>
)}

                {!data?.artists?.primary[0]?.name ? (
  <Skeleton className="h-3 w-14 mt-1" />
) : (
  <>
    {/* Show the artist name only on large screens */}
    <h2 className="hidden md:block text-xs -mt-0.5 text-muted-foreground">
      {data?.artists?.primary[0]?.name}
    </h2>
  </>
)}

                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
  {/* Loop Button */}
  <Button
    size="icon"
    className="p-2 sm:p-3 h-10 sm:h-12 w-10 sm:w-12 rounded-full border-2 border-transparent hover:bg-primary/20 active:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all ease-in-out dark:hover:bg-primary/10 dark:active:bg-primary/20"
    variant={!isLooping ? "ghost" : "secondary"}
    onClick={loopSong}
  >
    {!isLooping ? (
      <Repeat className="h-5 sm:h-6 w-5 sm:w-6 text-muted-foreground dark:text-muted-foreground transition-transform transform hover:scale-110" />
    ) : (
      <Repeat1 className="h-5 sm:h-6 w-5 sm:w-6 text-primary dark:text-primary transition-transform transform hover:scale-110" />
    )}
  </Button>

  {/* Play/Pause Button */}
  <Button
    size="icon"
    className="p-2 sm:p-3 h-10 sm:h-12 w-10 sm:w-12 rounded-full border-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary transition-all ease-in-out dark:bg-primary/500 dark:text-primary-foreground dark:hover:bg-primary/600 dark:active:bg-primary/700"
    onClick={togglePlayPause}
  >
    {playing ? (
      <IoPause className="h-5 sm:h-6 w-5 sm:w-6 text-muted-foreground dark:text-muted-foreground transition-transform transform hover:scale-110" />
    ) : (
      <Play className="h-5 sm:h-6 w-5 sm:w-6 text-primary-foreground dark:text-primary-foreground transition-transform transform hover:scale-110" />
    )}
  </Button>

  {/* Download Button */}
  <Button
    size="icon"
    className="p-2 sm:p-3 h-10 sm:h-12 w-10 sm:w-12 rounded-full border-2 border-transparent hover:bg-green-500/20 active:bg-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ease-in-out dark:hover:bg-green-500/10 dark:active:bg-green-500/20"
    variant="secondary"
    onClick={downloadSong}
  >
    {isDownloading ? (
      <Loader2 className="h-5 sm:h-6 w-5 sm:w-6 animate-spin text-green-500" />
    ) : (
      <Download className="h-5 sm:h-6 w-5 sm:w-6 text-green-500" />
    )}
  </Button>

  {/* Close Button */}
  <Button
    size="icon"
    className="p-2 sm:p-3 h-10 sm:h-12 w-10 sm:w-12 rounded-full border-2 border-transparent hover:bg-red-500/20 active:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ease-in-out dark:hover:bg-red-500/10 dark:active:bg-red-500/20"
    variant="secondary"
    onClick={() => {
      values.setMusic(null);
      setCurrent(0);
      localStorage.clear();
      audioRef.current.currentTime = 0;
      audioRef.current.src = null;
      setAudioURL(null);
    }}
  >
    <X className="h-5 sm:h-6 w-5 sm:w-6 text-red-500 dark:text-red-500 transition-transform transform hover:scale-110" />
  </Button>
</div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}
