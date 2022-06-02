import { useRef, useState } from "react";
import cl from "./App.module.css";
import Loader from "./Reusable/Loader";
import RoundButton from "./Reusable/RoundButton";
function App() {
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50);
  const buttonRef = useRef();
  const imageRef = useRef();

  const upload = () => {
    buttonRef.current.click();
  };

  const onUpload = async (e) => {
    setLoading(true);
    try {
      const image = e.target.files[0];
      buttonRef.current.value = "";

      if (image) {
        console.log(image);
        imageRef.current.src = URL.createObjectURL(image);
      } else throw new Error();
    } catch (error) {
      console.log("error occured", error);
    }
    setLoading(false);
  };
  return (
    <div className={cl.App}>
      {!loading && (
        <RoundButton cl={cl.button} onClick={upload}>
          Upload
        </RoundButton>
      )}
      <input type="file" ref={buttonRef} name="avatar" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={(e) => onUpload(e)} />
      {!loading && (
        <img
          src=""
          ref={imageRef}
          className={cl.image}
          onClick={upload}
          style={{ animation: `${(slider / 100) * 1.5}s linear 0s normal none infinite ${cl.spin}` }}
        />
      )}
      {loading && <Loader />}
      {!loading && (
        <input type="range" min="1" max="100" value={slider} className={cl.slider} id="myRange" onChange={(e) => setSlider(e.target.value)} />
      )}
    </div>
  );
}

export default App;
