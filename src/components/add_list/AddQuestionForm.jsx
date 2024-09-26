import * as React from 'react';
import { Button, CheckboxField, TextField, TextAreaField, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import { IoMdClose } from "react-icons/io";

export default function AddQuestion({formData, onSuccess, onClose, onChange}) {
    /*  formData format:
        title: string
        type: bool/string ("mcq", "frq")
        content: string
        isMandatory: bool
    */
//    const onMount = React.useEffect(() => {
//     onChange({
//         title: "",
//         type: "",
//         content: "",
//         isMandatory: false
//     });
//    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        // do other validation

        onSuccess();
    };
    
    return (
        <React.Fragment>
            <Button onClick={onClose}><IoMdClose /></Button>
            <form onSubmit={onSubmit}>
                <TextField
                    label="Question Title"
                    value={formData}
                    onChange={(e) => {onChange((pfd) => {
                        const newPfd = {...pfd};
                        newPfd["title"] = e.currentTarget.value;
                        return newPfd;
                    })}}
                />
                <CheckboxField
                    label="Mandatory"
                    descriptivetext="Mandatory to include in all department surveys"
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