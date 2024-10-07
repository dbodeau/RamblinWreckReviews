import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@aws-amplify/ui-react';
import { IoMdAdd } from "react-icons/io";
import AddFaculty from './AddFacultyForm';
import AddQuestion from './AddQuestionForm';
import '../../css/PopupForm.css';


/**
 * Basically just a wrapper for displaying forms as a pop-up
 * 
 * `formType` - string - either "question" or "faculty"
 * 
 * `onSubmit` - function that handles what to do after a sucessful form submission
 * 
 * `formData` - actual form data object, does not need to be initialized beforehand
 * 
 * `onChange` - setState function for formData
 */
export default function PopupForm({formType, onSubmit, formData, onChange}) {
    // for displaying dialog
    const ref = React.useRef();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const onOpen = () => {
        // current?. ensures that ref.current is not null before running showModal()
        setDialogOpen(true);
        ref.current?.showModal();
    };

    const onClose = () => {
        setDialogOpen(false);
        ref.current?.close();
    };

    const onFormSubmit = () => {
        // we want to close the dialog menu before running user form submission process
        onClose();
        onSubmit();
    };

    const changeHandler = (e, field) => {
        let value = e.currentTarget.value; // pull the value here (race conditions!)
        // amplify doesn't always use the same interface for all data types
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        // setState format
        onChange((pfd) => {
            const newPfd = {...pfd};
            newPfd[field] = value;
            return newPfd;
        })
    };

    return (
        <React.Fragment>
            <Button onClick={onOpen}><IoMdAdd /></Button>
            <dialog ref={ref}>
                {dialogOpen && (formType == 'faculty' &&
                    <AddFaculty 
                        formData={formData}
                        onSubmit={onFormSubmit}
                        onChange={changeHandler}
                        onClose={onClose}
                    />
                || formType == 'question' && 
                    <AddQuestion 
                        formData={formData}
                        onSubmit={onFormSubmit}
                        onChange={changeHandler}
                        onClose={onClose}
                    />
                )}
            </dialog>
        </React.Fragment>
    )
}