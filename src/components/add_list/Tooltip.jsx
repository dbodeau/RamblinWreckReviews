import React from 'react';
import { FcInfo } from 'react-icons/fc';

export default function Tooltip({ tooltip }) {
    const [hover, setHover] = React.useState(false);

    const handleMouseIn = () => {
        setHover(true);
    };

    const handleMouseOut = () => {
        setHover(false);
    };

    const tooltipStyle = {
        display: hover ? 'block' : 'none',
        position: "absolute",
        backgroundColor: "white",
        border: "2px",
        borderRadius: "3px",
        borderColor: "black",
        padding: 3,
        textAlign: "center",
        fontSize: 15,
        zIndex: 10 
      }

    return (
        <div>
            <div onMouseOver={handleMouseIn.bind(this)} onMouseOut={handleMouseOut.bind(this)}><FcInfo/></div>
            <div>
                <div style={tooltipStyle}>{tooltip}</div>
            </div>
        </div>
    )
}