import React, { useEffect, useState } from 'react';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfViewer = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState(null);

  // Load the PDF document when component mounts
  useEffect(() => {
    const loadPdf = async () => {
      const pdfDocument = await pdfjs.getDocument(pdfUrl).promise;
      setPdf(pdfDocument);
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    const renderPage = (pageNum) => {
      pdf.getPage(pageNum).then((page) => {
        // Create a new canvas for each page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });

        // Set canvas dimensions to match the page size
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page onto canvas
        page.render({
          canvasContext: context,
          viewport: viewport,
        });

        // Append the newly created canvas to the DOM
        document.getElementById('pdf-container').appendChild(canvas);
      });
    };

    if (pdf) {
      // Render all pages of the PDF once the document is loaded
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        renderPage(pageNum);
      }
    }
  }, [pdf, pdfUrl]); // Only re-run if `pdf` or `pdfUrl` changes

  return <div id="pdf-container"></div>; // Container for dynamically appended canvases
};

export default PdfViewer;
