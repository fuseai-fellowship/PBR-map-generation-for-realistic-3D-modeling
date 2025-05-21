import { useEffect, useRef, useState } from 'react';

const MJPEGStream = () => {
  const webcamRef = useRef(null);
  const imageNr = useRef(0);
  const finished = useRef([]);
  const [paused, setPaused] = useState(false);

  const createImageLayer = () => {
    const img = new Image();
    img.className = 'absolute top-0 left-0 w-full h-full object-cover';
    img.style.zIndex = -1;
    img.onload = function () {
      img.style.zIndex = imageNr.current;
      while (finished.current.length > 1) {
        const oldImg = finished.current.shift();
        oldImg?.parentNode?.removeChild(oldImg);
      }
      finished.current.push(img);
      if (!paused) createImageLayer();
    };
    img.src = `http://192.168.10.104:8080/?action=snapshot&n=0${++imageNr.current}`;
    if (webcamRef.current) {
      webcamRef.current.insertBefore(img, webcamRef.current.firstChild);
    }
  };

  const handleClick = () => {
    const newPaused = !paused;
    setPaused(newPaused);
    if (!newPaused) createImageLayer();
  };

  useEffect(() => {
    createImageLayer();
    return () => {
      finished.current.forEach((img) => img?.parentNode?.removeChild(img));
      finished.current = [];
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center mt-40">
      <h1 className="text-2xl font-bold mb-4 text-center">Live Webcam Stream</h1>
      <div
        id="webcam"
        ref={webcamRef}
        onClick={handleClick}
        className="relative w-full max-w-md aspect-video bg-black cursor-pointer overflow-hidden rounded-lg shadow-lg"
      >
        {/* Stream layers will be inserted here */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded">
          {paused ? 'Paused - Click to Resume' : 'Click to Pause'}
        </div>
      </div>
    </div>
  );
};

export default MJPEGStream;
