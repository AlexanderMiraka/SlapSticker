import ImageUpload from "./imageUpload";
import Filters from "./cameraFilters";

export default function PictureEnhancing(props) {
  //function that takes the value from the input value
  //transforms it into an object that has the same
  //structure as the objects in stickers array and
  //then adds it into the array
  const customSticker = (e) => {
    if (e.target.files.length > 0) {
      const imageSrc = URL.createObjectURL(e.target.files[0]);
      const img = document.createElement("img");
      img.src = imageSrc;
      props.setSticker(
        props.stickers.push({
          img: img,
          url: { src: imageSrc },
          index: props.stickers.length,
        })
      );
    }
  };
  return (
    <div class="homepageEnhancing">
      <section className={props.classes.Stickers}>
        <h4>Use our stickers </h4>
        <div class="buttonWrp">
          {props.stickers.map((imgSrc, index) => (
            <button
              class="buttonSecondary"
              onClick={() => props.setSticker(props.stickers[index])}
            >
              <img src={imgSrc.url.src} key={index} alt={index}/>
            </button>
          ))}
        </div>
        <div class="customStickerWrp">
          <h4>Don't like them? Upload your own</h4>
          <ImageUpload
            setSticker={props.setSticker}
            stickers={props.stickers}
            customSticker={customSticker}
          ></ImageUpload>
        </div>
        <Filters values={props.values} updateValue={props.updateValue}/>
      </section>
      <section className={props.classes.Main}>
        <video ref={props.handleVideoRef} />
        <canvas
          ref={props.handleCanvasRef}
          width={1}
          height={1}
          onClick={props.handleCapture}
        />
      </section>
    </div>
  );
}
