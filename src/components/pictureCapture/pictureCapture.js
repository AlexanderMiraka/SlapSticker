import logo from "../../stickersPool";
import { useEffect, useState } from "react";
import { useWebcamCapture } from "../../useWebcamCapture";
import PictureName from "./pictureName";
import PictureEnhancing from "./pictureEnhancing";
import { saveAs } from 'file-saver'

//first map the existing images then more will be added using state
const stickers = logo.map((url, index) => {
  const img = document.createElement("img");
  img.src = url.src;
  return { img, url, index };
});

export default function PictureCaptureSteps(props) {
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("SLAPPE!");
  const [values, setValues] = useState([0, 0, 0]); //r,g,b

  const updateValue = (index, updateValue) => {
    const updatedValues = values.map((value, i) =>
      i === index ? parseInt(updateValue, 10) : value
    );

    setValues(updatedValues);
  };

  //function from a third party library to download images use npm install
  const downloadImage = (imageUrl,index) => {
    saveAs(imageUrl, `SlapSticker${index}.png`);
  }
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title, values);
console.log(picture);
  return (
    <main>
      <PictureName classes={props.classes} title={title} passTitle={setTitle} />
      <PictureEnhancing
        classes={props.classes}
        setSticker={setSticker}
        stickers={stickers}
        handleVideoRef={handleVideoRef}
        handleCanvasRef={handleCanvasRef}
        handleCapture={handleCapture}
        values={values}
        updateValue={updateValue}
      />
      <section class="gallerySlider">
        {picture &&
          Array.isArray(picture) &&
          picture.map((picture, index) => (
            <div class="gallerySlideItem">
              <img src={picture.dataUri} key={index} onClick={(e)=>{downloadImage(e.target.src, index)}}/>
              <h3>{picture.title}</h3>
              <p>Download Me</p>
            </div>
          ))}
      </section>
    </main>
  );
}
