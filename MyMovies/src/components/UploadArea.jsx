import { FaCloudUploadAlt } from "react-icons/fa";
function UploadArea() {
  return (
    <>
      <div className="bg-neutral-200 p-6    border-dashed border-2 grid justify-center  ">
        <h1 className="text-4xl font-light">Upload Your Movie</h1>
        <div className="p-1 flex-row justify-self-center ">
          <FaCloudUploadAlt size={180} />
        </div>
        <div>
          <h3 className=""> Drop your movie file here or click to browse </h3>
        </div>

        <p className="text-sm text-gray-500 mt-2 justify-self-center">
          Supported formats: MP4, MOV, AVI
        </p>
      </div>
      <div className="p-8"></div>
    </>
  );
}

export default UploadArea;
