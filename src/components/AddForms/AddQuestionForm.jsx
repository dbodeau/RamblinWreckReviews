import * as React from 'react';
import { CheckboxField, TextField, TextAreaField, Radio, RadioGroupField, Button } from '@aws-amplify/ui-react';
import ContrastButton from '../ContrastButton.jsx';
import Tooltip from "../Tooltip.jsx";
import '../../css/PopupForm.css';

export default function AddQuestion({formData, onChange, onSubmit, onClose}) {
    /*  formData format:
        title: string
        type: bool/string ("mcq", "frq")
        content: string
        isMandatory: bool
    */
    const formErrors = {
        title: {
            hasError: false,
            errorMsg: ""
        },
        type: {
            hasError: false,
            errorMsg: ""
        },
        content: {
            hasError: false,
            errorMsg: ""
        },
        isMandatory: {
            hasError: false,
            errorMsg: ""
        }
    };

    const [errors, setErrors] = React.useState(formErrors);

    React.useEffect(() => {
        // set default values onMount
        onChange({currentTarget: {value: "mcq"}, target: {}}, "type");
        onChange({currentTarget: {value: false}, target: {}}, "isMandatory");
    }, []);

    const onFormSubmit = () => {
        let hasError = false;
        const err = formErrors;
        // do our data validation
        if (!formData.hasOwnProperty("title") || formData.title === "") {
            err.title.hasError = true;
            err.title.errorMsg = "Required field";
            hasError = true;
        } 
        if (!formData.hasOwnProperty("content") || formData.content === "") {
            err.content.hasError = true;
            err.content.errorMsg = "Required field";
            hasError = true;
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
                label="Question Title"
                // this ?? syntax ensures the data type of these fields, as the state isn't necessarily created by the time it's passed through here
                value={formData.title ?? ''}
                onChange={(e) => {onChange(e, "title")}}
                hasError={errors.title.hasError}
                errorMessage={errors.title.errorMsg}
            />
            <CheckboxField
                margin="10px"
                label={
                    // this is just so we can have a little info box on the form
                    <div style={{display: "flex", flexDirection: "row"}}>
                        Mandatory<Tooltip tooltip="Mandatory questions are required to be on ALL department surveys"/>
                    </div>
                    }
                name="isMandatory"
                value={formData.isMandatory ?? false}
                onChange={(e) => {onChange(e, "isMandatory")}}
                hasError={errors.isMandatory.hasError}
                errorMessage={errors.isMandatory.errorMsg}
            />
            <TextAreaField
                label="Question"
                value={formData.content ?? ''}
                onChange={(e) => {onChange(e, "content")}}
                hasError={errors.content.hasError}
                errorMessage={errors.content.errorMsg}
            />
            <RadioGroupField 
                legend="Question Type"
                name="Question Type"
                value={formData.type ?? ''}
                onChange={(e) => {onChange(e, "type")}}
                hasError={errors.type.hasError}
                errorMessage={errors.type.errorMsg}
            >
                <Radio value="mcq">Multiple Choice</Radio>
                <Radio value="frq">Short Answer</Radio>
            </RadioGroupField>
            </div>
            <div className='button-row'>
                <ContrastButton onClick={onFormSubmit}>Submit</ContrastButton>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        </div>
    )
}