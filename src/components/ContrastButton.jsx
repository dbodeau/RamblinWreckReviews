import React, { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';

export default function ContrastButton({onClick, children}) {
    const [hover, setHover] = useState(false);

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    // need this for reactive styling of amplify components
    const buttonStyle = hover ? {
        backgroundColor: "#23334f",
        borderColor: "#000000",
        fontWeight: "bolder",
        color: "#e2e2e2",
        margin: "0px 5px"
    } : {
        backgroundColor: "#21314d",
        color: "#e2e2e2",
        margin: "0px 5px"
    }

    return (
        <Button style={buttonStyle} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</Button>
    )
}