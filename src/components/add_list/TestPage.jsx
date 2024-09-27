import React, { useEffect } from "react";
import '@aws-amplify/ui-react/styles.css';
import PopupForm from "../add_list/PopupForm";
import Tooltip from "./Tooltip.jsx";

export default function TestPage() {
    
    const [questionFormData, setQuestionFormData] = React.useState({});

    const [qList, setqList] = React.useState([]);

    const onQuestionSubmit = () => {
        // here is where we would add API calls to save questions/faculty
        // and update any states
        setqList((pl) => [...pl, questionFormData]);
        setQuestionFormData({});
    };

    useEffect(() => {
        console.log("qList", qList);
    }, [qList]);

    const [facultyFormData, setFacultyFormData] = React.useState({});

    const [fList, setFList] = React.useState([]);

    const onFacultySubmit = () => {
        // here is where we would add API calls to save facultys/faculty
        // and update any states
        setFList((pl) => [...pl, facultyFormData]);
        setFacultyFormData({});
    };

    useEffect(() => {
        console.log("fList", fList);
    }, [fList]);

    return (
        <React.Fragment>
            <PopupForm 
                onSubmit={onQuestionSubmit} 
                formType={"question"} 
                formData={questionFormData}
                onChange={setQuestionFormData}
            />
            <hr />
            <PopupForm 
                onSubmit={onFacultySubmit} 
                formType={"faculty"} 
                formData={facultyFormData}
                onChange={setFacultyFormData}
            />
            <Tooltip tooltip="M"/>
        </React.Fragment>
    );
};