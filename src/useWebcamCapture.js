import { useCallback, useEffect, useRef, useState } from "react";
//add values as a prop so we can have the values of rgb for filters
export const useWebcamCapture = (stickerImg, title, values) => {
  const [videoRef, setVideoRef] = useState();
  const [canvasRef, setCanvasRef] = useState();
  const [picture, setPicture] = useState([]);//make picture an empty array

  //fill picture array with photos
  const addCapture = (newCapture) => {
    setPicture(oldStack => [...oldStack,newCapture]);
  }
  const onVideoRef = useCallback((node) => {
    setVideoRef(node);
  });
  const onCanvasRef = useCallback((node) => {
    setCanvasRef(node);
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (videoRef && canvasRef && !initialized) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
          },
          audio: false,
        })
        .then(function (stream) {
          videoRef.srcObject = stream;
          videoRef.play();
        })
        .catch(function (err) {
          console.log("Couldn't start webcam: " + err);
        });

      const onCanPlay = function (ev) {
        const width = videoRef.videoWidth;
        const height = videoRef.videoHeight / (videoRef.videoWidth / width);

        videoRef.setAttribute("width", width);
        videoRef.setAttribute("height", height);
        canvasRef.setAttribute("width", width);
        canvasRef.setAttribute("height", height);
        videoRef.removeEventListener("canplay", onCanPlay, false);
      };

      videoRef.addEventListener("canplay", onCanPlay, false);
      setInitialized(true);
    } else if (!videoRef || !canvasRef) {
      setInitialized(false);
    }
  }, [videoRef, canvasRef, initialized]);

  const mousePos = useRef({ x: 0, y: 0 });

  const startRenderLoop = useCallback(() => {
    if (canvasRef && videoRef) {
      let lastFrameTime = 0;
      let frameInterval = 1000/60;
      const renderFrame = (timestamp) => {
        if(timestamp - lastFrameTime > frameInterval) {
          const ctx = canvasRef.getContext("2d");
          const width = canvasRef.getAttribute("width");
          const height = canvasRef.getAttribute("height");
          ctx.drawImage(videoRef, 0, 0, width, height);
          let imageData = ctx.getImageData(0,0,width,height);
          let data = imageData.data;
          
          for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] + values[0]; // red
            data[i+1] = data[i+1] + values[1] //green
            data[i+2] = data[i+2] + values[2]//blue
          }
          //Careful with the filters too many requestAnimationFrame calls
          ctx.putImageData(imageData,0,0);
        if (stickerImg) {
          const bb = canvasRef.getBoundingClientRect();
          const x = ((mousePos.current.x - bb.left) / bb.width) * width;
          const y = ((mousePos.current.y - bb.top) / bb.height) * height;
          ctx.drawImage(
            stickerImg,
            x - width * 0.2,
            y - width * 0.2,
            width * 0.4,
            width * 0.4
          );
        }
        lastFrameTime = timestamp;
        cancelAnimationFrame(renderFrame);
      }
      requestAnimationFrame(renderFrame);
    };
      requestAnimationFrame(renderFrame);
    }
  }, [canvasRef, videoRef, stickerImg,values]);

  useEffect(() => {
    startRenderLoop();
  }, [startRenderLoop]);

  useEffect(() => {
    if (canvasRef) {
      const onMouseMove = (ev) => {
        mousePos.current = { x: ev.clientX, y: ev.clientY };
      };
      canvasRef.addEventListener("mousemove", onMouseMove);
      canvasRef.addEventListener("mousedown", onMouseMove);
      return () => {
        canvasRef.removeEventListener("mousemove", onMouseMove);
        canvasRef.removeEventListener("mousedown", onMouseMove);
      };
    }
  }, [canvasRef]);

  const onCapture = useCallback(
    (ev) => {
      if (canvasRef) {
        const data = canvasRef.toDataURL("image/png");
        addCapture({ dataUri: data, title });
      }
    },
    [canvasRef, title]
  );

  return [onVideoRef, onCanvasRef, onCapture, picture];
};
