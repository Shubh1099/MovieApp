import video from "../assets/videos/1.mp4";
function VideoPlayer() {
  return (
    <>
      <span className="bg-gray-400 grid-rows-3 text-4xl">
        <div className="p-4">Movie Name</div>
        <div className="justify-self-center">
          <video width="750" height="500" controls muted>
            <source
              src={video}
              type="video/mp4"
            />
          </video>
        </div>
      </span>
    </>
  );
}

export default VideoPlayer;
