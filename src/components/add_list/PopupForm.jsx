import React from 'react';

export default function PopupForm({children}) {
    const qRef = React.useRef();

    const onButtonClick = () => {
        qRef.current?.showModal();
    };

    const onClose = () => {
        qRef.current?.close();
    };

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}