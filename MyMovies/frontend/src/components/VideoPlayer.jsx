import { video } from "../assets/videos/1.mp4";
function VideoPlayer() {
  return (
    <>
      <span className="bg-gray-400 grid-rows-3 text-4xl">
        <div className="">ABC</div>
        <div className="justify-self-center">
          <video controls src={video}></video>
        </div>

        <div className="text-4xl">ABC</div>
      </span>
    </>
  );
}

export default VideoPlayer;
