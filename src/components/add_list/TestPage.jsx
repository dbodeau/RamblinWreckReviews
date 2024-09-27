import React, { useEffect } from "react";
import '@aws-amplify/ui-react/styles.css';
import PopupForm from "../add_list/PopupForm";

export default function TestPage() {
    
    const [questionFormData, setQuestionFormData] = React.useState({});

    const [list, setList] = React.useState([]);

    const onQuestionSubmit = () => {
        // here is where we would add API calls to save questions/faculty
        // and update any states
        setList((pl) => [...pl, questionFormData]);
        setQuestionFormData({});
    };

    useEffect(() => {
        console.log("list", list);
    }, [list]);

    return (
        <React.Fragment>
            <PopupForm 
                onSubmit={onQuestionSubmit} 
                formType={"faculty"} 
                formData={questionFormData}
                onChange={setQuestionFormData}
            />
        </React.Fragment>
    );
};