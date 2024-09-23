import * as React from 'react';
import { Button, CheckboxField, TextField } from '@aws-amplify/ui-react';
import { IoMdClose } from "react-icons/io";

export default function AddFaculty({formData, onSuccess}) {
    /*  formData format:
        first_name: string
        last_name: string
        email: string
        admin: bool
        professor: bool
    */

    const onSubmit = (event) => {
        event.preventDefault();

    }
    
    return (
        <React.Fragment>
            <Button><IoMdClose /></Button>
            <form onSubmit={onSubmit}>
                <TextField
                    label="First Name"
                />
                <TextField
                    label="Last Name"
                />
                <TextField
                    label="Email"
                />
                <CheckboxField
                    label="Admin"
                />
                <CheckboxField
                    label="Professor"
                />
                <Button type="submit">Submit</Button>
            </form>
        </React.Fragment>
    )
}