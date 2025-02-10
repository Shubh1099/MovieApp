import "./App.css";
import NavBar from "./components/NavBar";
import UploadArea from "./components/UploadArea";
import ViewArea from "./components/VideoPlayer";
function App() {
  return (
    <>
      <NavBar />
      <UploadArea />
      <ViewArea />
    </>
  );
}

export default App;
