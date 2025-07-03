import { useRef } from "react";

interface MediaStreamConstraints {
  video?: boolean | MediaTrackConstraints;
  audio?: boolean | MediaTrackConstraints;
}
const constraints = {
  video: true,
  audio: false,
};

export default function Room() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const openMediaDevices = async (constraints: MediaStreamConstraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };
  openMediaDevices(constraints);
  return (
    <div className="text-center  min-h-screen">
      <h1 className="text-4xl font-bold mb-4 ">Welcome to GMeet</h1>
      <div className="flex flex-row justify-center items-center gap-4">
        <div>
          <video
            className="border-2 w-60 h-auto rounded-lg shadow-lg"
            ref={localVideoRef}
            autoPlay
            playsInline
          />
          Local
        </div>

        <div>
          <video
            className="border-2 w-60 h-auto rounded-lg shadow-lg"
            ref={remoteVideoRef}
            autoPlay
            playsInline
          />
          Remote
        </div>
      </div>
    </div>
  );
}
