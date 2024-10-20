import * as React from 'react';
import { Button, TextField, Radio, RadioGroupField  } from '@aws-amplify/ui-react';
import ContrastButton from '../ContrastButton';
import '../../css/PopupForm.css';

export default function AddFaculty({formData, onChange, onSubmit, onClose}) {
    const formErrors = {
        first_name: {
            hasError: false,
            errorMsg: ""
        },
        last_name: {
            hasError: false,
            errorMsg: ""
        },
        email: {
            hasError: false,
            errorMsg: ""
        },
        role: {
            hasError: false,
            errorMsg: ""
        }
    };

    const [errors, setErrors] = React.useState(formErrors);

    React.useEffect(() => {
        // set default values onMount
        onChange({currentTarget: {value: "prof"}, target: {}}, "role");
    }, []);

    const onFormSubmit = () => {
        let hasError = false;
        const err = formErrors;
        // do our data validation
        if (!formData.hasOwnProperty("first_name") || formData.first_name === "") {
            err.first_name.hasError = true;
            err.first_name.errorMsg = "Required field";
            hasError = true;
        } 
        if (!formData.hasOwnProperty("last_name") || formData.last_name === "") {
            err.last_name.hasError = true;
            err.last_name.errorMsg = "Required field";
            hasError = true;
        } 
        if (!formData.hasOwnProperty("email") || formData.email === "") {
            err.email.hasError = true;
            err.email.errorMsg = "Required field";
            hasError = true;
        } else { // do additional validation
            const pattern = new RegExp('^[a-zA-Z0-9_!#$%&\'*+/=?`{|}~^.-]+@mines.edu$'); // stop sql injection...

            if (!pattern.test(formData.email)) {
                err.email.hasError = true;
                err.email.errorMsg = "Invalid email";
                hasError = true;
            } 
        }

        // update error state
        setErrors(err);

        // only call parent submit when there are no data errors
        if (!hasError) {
            onSubmit();
        } 
    };

    return (
        <div className="dialog-internal">
            <div className="form-container">
                <TextField
                    label="First Name"
                    value={formData.first_name ?? ''}
                    onChange={(e) => onChange(e, 'first_name')}
                    hasError={errors.first_name.hasError}
                    errorMessage={errors.first_name.errorMsg}
                />
                <TextField
                    label="Last Name"
                    value={formData.last_name ?? ''}
                    onChange={(e) => onChange(e, 'last_name')}
                    hasError={errors.last_name.hasError}
                    errorMessage={errors.last_name.errorMsg}
                />
                <TextField
                    label="Email"
                    value={formData.email ?? ''}
                    onChange={(e) => onChange(e, 'email')}
                    hasError={errors.email.hasError}
                    errorMessage={errors.email.errorMsg}
                />
                <RadioGroupField 
                    legend="Role"
                    name="Role"
                    value={formData.role ?? 'prof'} // default to professor
                    onChange={(e) => {onChange(e, "role")}}
                    hasError={errors.role.hasError}
                    errorMessage={errors.role.errorMsg}
                >
                    <Radio value="admin">Admin</Radio>
                    <Radio value="prof">Professor</Radio>
                </RadioGroupField>
            </div>
            <div className='button-row'>
                <ContrastButton onClick={onFormSubmit}>Submit</ContrastButton>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        </div>
    )
}