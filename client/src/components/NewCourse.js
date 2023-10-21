import React from "react";
import {SendPDFFileForCourse} from "../services/newCourseServices";

export default function NewCourse(){
    
    const handleFileChange = async (e) => {
        const data = new FormData();
        data.append('pdfFile', e.target.files[0]);
        data.append('filename', "file");
        const response=await SendPDFFileForCourse(data);
        console.log(response)
    }

    return(
        <div>
            <h1>PDF File Upload</h1>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
    );
}