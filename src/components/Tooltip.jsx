import React from 'react';
import { FcInfo } from 'react-icons/fc';

// Poorly designed component- doesn't generalize well to all use cases
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
        zIndex: 10,
        width: 200,
        left: "15%",
        top: "100%",
        backgroundColor: "#ececec",
        margin: "auto",
        borderRadius: 3,
        padding: 5,
        textAlign: "center",
        fontSize: 15
      }

    return (
        <div>
            <div onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} style={{margin: "2px 5px"}}><FcInfo/></div>
            <div>
                <div style={tooltipStyle}>{tooltip}</div>
            </div>
        </div>
    )
}