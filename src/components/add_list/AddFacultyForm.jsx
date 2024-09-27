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
    
    return (
        <React.Fragment>
            <TextField
                label="First Name"
                value={formData["first_name"] ?? ''}
                onChange={(e) => onChange(e, 'first_name')}
            />
            <TextField
                label="Last Name"
                value={formData["last_name"] ?? ''}
                onChange={(e) => onChange(e, 'last_name')}
            />
            <TextField
                label="Email"
                value={formData["email"] ?? ''}
                onChange={(e) => onChange(e, 'email')}
            />
            <CheckboxField
                label="Admin"
                name="admin"
                value={formData["admin"] ?? false}
                onChange={(e) => onChange(e, 'admin')}
            />
            <CheckboxField
                label="Professor"
                name="professor"
                value={formData["professor"] ?? false}
                onChange={(e) => onChange(e, 'professor')}
            />
        </React.Fragment>
    )
}