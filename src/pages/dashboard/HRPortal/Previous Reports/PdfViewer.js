import React, { useEffect, useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfViewer = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState(null);
  const rendered = useRef(false); 
  const containerRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      rendered.current = false; 
      const pdfDocument = await pdfjs.getDocument(pdfUrl).promise;
      setPdf(pdfDocument);
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdf || rendered.current) return;
    rendered.current = true; 

    const container = containerRef.current;
    container.innerHTML = ''; 

    const renderPage = async (pageNum) => {
      const page = await pdf.getPage(pageNum);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const containerWidth = container.clientWidth;
      const viewport = page.getViewport({ scale: 1 });

      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;

      container.appendChild(canvas);
    };

    const renderAllPages = async () => {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        await renderPage(pageNum);
      }
    };

    renderAllPages();
  }, [pdf]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    />
  );
};

export default PdfViewer;
