// import { useEffect, useRef, useState } from 'react';


// const MJPEGStream = () => {
//   const webcamRef = useRef(null);
//   const imageNr = useRef(0);
//   const finished = useRef([]);
//   const [paused, setPaused] = useState(false);

//   const createImageLayer = () => {
//     const img = new Image();
//     img.className = 'absolute top-0 left-0 w-full h-full object-cover';
//     img.style.zIndex = -1;
//     img.onload = function () {
//       img.style.zIndex = imageNr.current;
//       while (finished.current.length > 1) {
//         const oldImg = finished.current.shift();
//         oldImg?.parentNode?.removeChild(oldImg);
//       }
//       finished.current.push(img);
//       if (!paused) createImageLayer();
//     };
//     // img.src = `http://192.168.10.104:8080/?action=snapshot&n=0${++imageNr.current}`;
//     // img.src='http://192.168.10.108:8080/?action=stream';
//     img.src='http://192.168.10.108:8080/?action=stream';
//     if (webcamRef.current) {
//       webcamRef.current.insertBefore(img, webcamRef.current.firstChild);
//     }
//   };

//   const handleClick = () => {
//     const newPaused = !paused;
//     setPaused(newPaused);
//     if (!newPaused) createImageLayer();
//   };

//   useEffect(() => {
//     createImageLayer();
//     return () => {
//       finished.current.forEach((img) => img?.parentNode?.removeChild(img));
//       finished.current = [];
//     };
//   }, []);

//   return (
//     <div className="p-4 flex flex-col items-center mt-40">
//       <h1 className="text-2xl font-bold mb-4 text-center">Live Webcam Stream</h1>
//       <div
//         id="webcam"
//         ref={webcamRef}
//         onClick={handleClick}
//         className="relative w-full max-w-md aspect-video bg-black cursor-pointer overflow-hidden rounded-lg shadow-lg"
//       >
//         {/* Stream layers will be inserted here */}
//         <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded">
//           {paused ? 'Paused - Click to Resume' : 'Click to Pause'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MJPEGStream;

import { useEffect, useRef, useState } from 'react';

const MJPEGStream = () => {
  const webcamRef1 = useRef(null);
  const webcamRef2 = useRef(null);
  const imageNr1 = useRef(0);
  const imageNr2 = useRef(0);
  const finished1 = useRef([]);
  const finished2 = useRef([]);
  const [paused, setPaused] = useState(false);

  const createImageLayer = (ref, imgNr, finished, url) => {
    const img = new Image();
    img.className = 'absolute top-0 left-0 w-full h-full object-cover';
    img.style.zIndex = -1;
    img.onload = function () {
      img.style.zIndex = imgNr.current;
      while (finished.current.length > 1) {
        const oldImg = finished.current.shift();
        oldImg?.parentNode?.removeChild(oldImg);
      }
      finished.current.push(img);
      if (!paused) createImageLayer(ref, imgNr, finished, url);
    };
    img.src = `${url}&n=0${++imgNr.current}`;
    if (ref.current) {
      ref.current.insertBefore(img, ref.current.firstChild);
    }
  };

  // const handleClick = () => {
  //   const newPaused = !paused;
  //   setPaused(newPaused);
  //   if (!newPaused) {
  //     createImageLayer(webcamRef1, imageNr1, finished1, 'http://192.168.10.108:8080/?action=stream');
  //     createImageLayer(webcamRef2, imageNr2, finished2, 'http://localhost:5000/video_feed');
  //   }
  // };

  useEffect(() => {
    createImageLayer(webcamRef1, imageNr1, finished1, 'http://192.168.10.108:8080/?action=stream');
    // createImageLayer(webcamRef2, imageNr2, finished2, 'http://192.168.10.103:5000/video_feed');

    return () => {
      [finished1, finished2].forEach(finished => {
        finished.current.forEach((img) => img?.parentNode?.removeChild(img));
        finished.current = [];
      });
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center mt-20 gap-8">
      <h1 className="text-2xl font-bold text-center">Dual Video Streams</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-7xl">
        {/* Stream 1 */}

        <div>
        <p className=' text-center text-xl py-4 font-bold'>
            Live Video Stream
          </p>
        <div
          id="webcam1"
          ref={webcamRef1}
          // onClick={handleClick}
          className="relative aspect-video bg-black cursor-pointer overflow-hidden rounded-lg shadow-lg"
        >
          {/* <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded"> */}
            {/* {paused ? 'Paused - Click to Resume' : 'Click to Pause'} */}
          {/* </div> */}
        </div>
        </div>

        {/* Stream 2 */}
        {/* <div className="flex justify-center items-center bg-gray-900"> */}
        <div>
        <p className=' text-center text-xl py-4 font-bold'>
          Normalised Video Stream 
        </p>
          <div className='relative aspect-video bg-black cursor-pointer overflow-hidden rounded-lg shadow-lg'>
      <img
        src="http://192.168.10.103:5000/video_feed"
        alt="Live Stream"
        className="w-auto max-h-full rounded-lg shadow-lg"
      />
    </div>
    </div>

        {/* <div>
          <p className=' text-center text-xl py-4 font-bold'>
          Normalised Video Stream 
          </p>
        <div
          id="webcam2"
          ref={webcamRef2}
          // onClick={handleClick}
          className="relative aspect-video bg-black cursor-pointer overflow-hidden rounded-lg shadow-lg"
        >
          {/* <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded"> */}
            {/* {paused ? 'Paused - Click to Resume' : 'Click to Pause'} */}
          {/* </div> */}
        {/*</div>
        </div> */}

      </div>
    </div>
  );
};

export default MJPEGStream;

