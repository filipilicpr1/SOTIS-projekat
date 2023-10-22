import React, { useState, useRef } from "react";
import { SendPDFFileForCourse, GetAnswer } from "../services/newCourseServices";

export default function NewCourse(){
    const [courseId, setCourseId] = useState();
    const questionRef = useRef();
    
    const handleFileChange = async (e) => {
        const data = new FormData();
        const file = e.target.files[0];

        data.append('pdfFile', file);
        data.append('filename', "file");
        
        const name = file.name.split('.')[0];
        setCourseId(name);

        const response = await SendPDFFileForCourse(data, name);
        console.log(response)
    }

    const clickHandler = async () => {
        const question = questionRef.current.value.trim();
        if(question.length === 0) {
            return;
        }

        const data = {
            'courseId' : courseId,
            'question' : question
        }

        const response = await GetAnswer(data);
        console.log(response)
    }

    return(
        <div>
            <h1>PDF File Upload</h1>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <br/>
            <input type="text" name="question" ref={questionRef}/>
            <button onClick={clickHandler}>ASK QUESTION</button>
        </div>
    );
}