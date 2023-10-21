import React,{useState} from "react";
import {  SendPDFFileForCourse} from "../services/newCourseServices";

export default function NewCourse(){

    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = async (e) => {
        setSelectedFile(e.target.files[0]);
        const formData = new FormData();
        formData.append('pdfFile', selectedFile);
        const response=await SendPDFFileForCourse(formData);
        console.log(response)
    };

      
    return(
        <div>
      <h1>PDF File Upload</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      
    </div>
    );
}