import axios from 'axios'

export const SendPDFFileForCourse = async(pdfFile, courseId)=>{
  
  const config = {
    headers : {
      'Content-Type': 'multipart/form-data'
    }
  };

  return await axios.post(`${process.env.REACT_APP_API_URL}api/newcourse/${courseId}/add-pdf`,pdfFile,config);
}

export const GetAnswer = async (data) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}api/newcourse/${data.courseId}/answer?question=${data.question}`);
};