import AddQuestion from "./AddQuestionForm";
import AddFaculty from "./AddFacultyForm";
import { Button } from "@aws-amplify/ui-react";
import React from "react";

export default function TestPage() {
    const qRef = React.useRef();
    
    const [questionFormData, setQuestionFormData] = React.useState({
        title: "",
        type: "",
        content: "",
        isMandatory: false
    });

    const [list, setList] = React.useState([]);

    const onButtonClick = () => {
        qRef.current?.showModal();
    };

    const onClose = () => {
        qRef.current?.close();
    };

    const onQuestionSubmit = () => {
        qRef.current?.close();
        setList((pl) => [...pl, questionFormData]);
    };

    return (
        <React.Fragment>
            <Button onClick={onButtonClick}>
                Open
            </Button>
            <hr />
            <dialog ref={qRef}>
                <AddQuestion 
                    onClose={onClose}
                    onSuccess={onQuestionSubmit}
                    onChange={setQuestionFormData}
                    formData={questionFormData}
                />
            </dialog>
            
            <AddFaculty />
            <hr />
            <Button onClick={() => console.log(list)}>
                Print
            </Button>
        </React.Fragment>
    );
};