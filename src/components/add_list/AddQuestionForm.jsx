import * as React from 'react';
import { CheckboxField, TextField, TextAreaField, Radio, RadioGroupField } from '@aws-amplify/ui-react';

export default function AddQuestion({formData, onChange}) {
    /*  formData format:
        title: string
        type: bool/string ("mcq", "frq")
        content: string
        isMandatory: bool
    */

    React.useEffect(() => {
        // use this to initialize formData to our type, prevents default values
        // so we don't have to worry about formData being set in parent
        onChange({
            title: "",
            type: "",
            content: "",
            isMandatory: false
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
                label="Question Title"
                onChange={(e) => {changeHandler(e, "title")}}
            />
            <TextAreaField
                label="Question"
                onChange={(e) => {changeHandler(e, "content")}}
            />
            <CheckboxField
                label="Mandatory"
                name="isMandatory"
                value={true}
                onChange={(e) => {changeHandler(e, "isMandatory")}}
            />
            <RadioGroupField 
                legend="Question Type" 
                name="Question Type"
                onChange={(e) => {changeHandler(e, "type")}}
            >
                <Radio value="mcq">Multiple Choice</Radio>
                <Radio value="frq">Short Answer</Radio>
            </RadioGroupField>
        </React.Fragment>
    )
}