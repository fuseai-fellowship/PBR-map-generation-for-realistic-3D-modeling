import React from 'react';
// import titleDefence from './assets/titleDefence.pdf'
import finalReport from './assets/depth_estimation_form_rgb_images(4).pdf'

function PDFViewer() {

  return (
    <div className="mt-20">
      <iframe
        src={finalReport}
        className='h-screen w-full'    
        title="PDF Viewer"
        />
    </div>
  );
}

export default PDFViewer