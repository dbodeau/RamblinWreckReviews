import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import '@aws-amplify/ui-react/styles.css';
import AddFaculty from './AddFacultyForm';
import AddQuestion from './AddQuestionForm';
import '../../css/PopupForm.css';

/**
 * Handles opening, updating, and closing of a popup form
 * 
 * In order to use: pass in a `ref` and use `() => ref.current.onOpen()` as the `onClick` of some button
 * 
 * `formType` - "faculty" or "question"
 * 
 * `onSubmit` - event handler on submit 
 * 
 * `formData` - form state
 * 
 * `onChange` - form set state
 */
const PopupForm = forwardRef(({formType, onSubmit, formData, onChange}, ref) => {
    // for displaying dialog
    const dialogRef = useRef(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // magic to call onOpen() handler from a parent component
    useImperativeHandle(ref, () => {
        return {onOpen};
    }, [])

    const onOpen = () => {
        // current?. ensures that ref.current is not null before running showModal()
        setDialogOpen(true);
        dialogRef.current?.showModal();
    }

    const onClose = () => {
        setDialogOpen(false);
        dialogRef.current?.close();
    }

    const onFormSubmit = () => {
        // we want to close the dialog menu before running user form submission process
        onClose();
        onSubmit();
    }

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
    }

    return (
        <React.Fragment>
            <dialog ref={dialogRef}>
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
})

export default PopupForm;