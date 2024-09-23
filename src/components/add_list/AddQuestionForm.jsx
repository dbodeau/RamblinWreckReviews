import * as React from 'react';
import { Button, CheckboxField, TextField, TextAreaField, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import { IoMdClose } from "react-icons/io";

export default function AddQuestion({formData, onSuccess}) {
    /*  formData format:
        title: string
        type: bool/string ("mcq", "frq")
        content: string
        isMandatory: bool
    */

    const onSubmit = (event) => {
        event.preventDefault();

    }
    
    return (
        <React.Fragment>
            <Button><IoMdClose /></Button>
            <form onSubmit={onSubmit}>
                <TextField
                    label="Title/Categories"
                />
                <CheckboxField
                    label="Mandatory"
                    descriptiveText="Mandatory to include in all department surveys"
                />
                <TextAreaField
                    label="Question"
                />
                <RadioGroupField legend="Question Type">
                    <Radio value="mcq">Multiple Choice</Radio>
                    <Radio value="frq">Short Answer</Radio>
                </RadioGroupField>
                
                <Button type="submit">Submit</Button>
            </form>
        </React.Fragment>
    )
}