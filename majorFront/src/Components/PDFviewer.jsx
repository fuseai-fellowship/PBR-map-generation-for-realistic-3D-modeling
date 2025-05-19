import React from 'react';
import titleDefence from './assets/titleDefence.pdf'

function PDFViewer() {

  return (
    <div className="mt-20">
      <iframe
        src={titleDefence}
        className='h-screen w-full'    
        title="PDF Viewer"
        />
    </div>
  );
}

export default PDFViewer