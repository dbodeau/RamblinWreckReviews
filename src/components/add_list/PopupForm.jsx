import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@aws-amplify/ui-react';
import { IoMdAdd } from "react-icons/io";
import AddFaculty from './AddFacultyForm';
import AddQuestion from './AddQuestionForm';
import './PopupForm.css';

export default function PopupForm({formType, onSubmit, formData, onChange, validate}) {
    // for displaying dialog
    const ref = React.useRef();

    const onOpen = () => {
        // current?. ensures that ref.current is not null before running showModal()
        ref.current?.showModal();
    };

    const onClose = () => {
        ref.current?.close();
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        // make sure all fields have been filled
        for (const field in formData) {
            if (formData.hasOwnProperty(field)) {
                // empty field
                if (formData[field] === "" || 
                    formData[field] === undefined || 
                    formData[field] === null) {
                    return;
                }
            }
        }

        // do other validation (passed in) here
        if (typeof(validate) === "function") {
            validate(formData);
        }

        // we want to close the dialog menu before running user form submission process
        onClose();
        onSubmit();
    };

    return (
        <React.Fragment>
            <Button onClick={onOpen}><IoMdAdd /></Button>
            <dialog ref={ref}>
                <div className="dialog-internal">
                    <div className="form-container">
                        {formType === "question" && 
                            <AddQuestion
                                formData={formData}
                                onChange={onChange}
                            />
                        || formType === "faculty" &&
                            <AddFaculty
                                formData={formData}
                                onChange={onChange}
                            />
                        }
                    </div>
                    <div className='button-row'>
                        <Button className='contrast-button' onClick={onFormSubmit}>Submit</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </dialog>
        </React.Fragment>
    )
}