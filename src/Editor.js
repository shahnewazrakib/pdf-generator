import React, {useCallback} from 'react';
import jsPDF from 'jspdf';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function Editor() {

  function generatePDF(){
    const doc = new jsPDF({
      orientation: 'p',
      hotfixes : ["px_scaling"],
      unit: 'px',
      format: [770, 1020],
      putOnlyUsedFonts:true,
    });
    doc.html(document.querySelector('#container .ql-editor'), {
      callback: pdf => {
        pdf.save('document.pdf');
      }
    })      
  }
  

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    const wrapperRef =  useCallback(wrapper => {
        if(wrapper === null) return;  
        wrapper.innerHTML = ''; 
        const editor = document.createElement('div');
        wrapper.append(editor); 
        new Quill(editor,
        {
            modules: {
              toolbar: toolbarOptions
            },
            theme: 'snow'
        }) 

     }, [])

  return (
    <>
     <div id='container' ref={wrapperRef}></div>
      <button className='d-btn' onClick={generatePDF}>Download PDF</button>
      
    </>
  )
}

export default Editor
