import * as React from 'react';
import { Button, CheckboxField, TextField } from '@aws-amplify/ui-react';

export default function AddFaculty({formData, onChange}) {
    /*  formData format:
        first_name: string
        last_name: string
        email: string
        admin: bool
        professor: bool
    */
    React.useEffect(() => {
        // setup initial fields
        onChange({
            first_name: "",
            last_name: "",
            email: "",
            admin: false,
            professor: true
        });
    }, [onChange]);

    const changeHandler = (e, field) => {
        let value = e.currentTarget.value; // pull the value here cuz race conditions!!
        // love amplify making events different
        if (typeof(formData[field]) === "boolean") {
            // breaks...
            value = e.target.checked;
        }

        onChange((pfd) => {
            const newPfd = {...pfd};
            newPfd[field] = value;
            return newPfd;
        })
    };
    
    return (
        <React.Fragment>
            <TextField
                label="First Name"
                onChange={(e) => changeHandler(e, 'first_name')}
            />
            <TextField
                label="Last Name"
                onChange={(e) => changeHandler(e, 'last_name')}
            />
            <TextField
                label="Email"
                onChange={(e) => changeHandler(e, 'email')}
            />
            <CheckboxField
                label="Admin"
                onChange={(e) => changeHandler(e, 'admin')}
            />
            <CheckboxField
                label="Professor"
                onChange={(e) => changeHandler(e, 'professor')}
            />
        </React.Fragment>
    )
}