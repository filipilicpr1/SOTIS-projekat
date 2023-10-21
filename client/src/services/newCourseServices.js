import axios from 'axios'

export const SendPDFFileForCourse = async(pdfFile)=>{
  
  const config = {
    headers : {
      'Content-Type': 'multipart/form-data'
    }
  };

  return await axios.post(`${process.env.REACT_APP_API_URL}api/newcourse/addpdf`,pdfFile,config);
}

