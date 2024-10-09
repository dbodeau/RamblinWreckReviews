import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react"; // Amplfiy has their own basic Components!
import "../css/NavCard.css";

function NavCard({route, title, description, logo}) {

    const navigate = useNavigate();

    const onClick = () => {
        navigate(route);
    };

    return (
        <React.Fragment>
            <Button onClick={onClick} style={{maxHeight: "30%", width: "25%", margin: "10px", display: "flex", flexDirection: "column", textAlign: "center", padding: "10px"}}>
                <img src={logo} className="navcard-img"/>
                <h2 className="navcard-h2">{title}</h2>
                <p className="navcard-p">{description}</p>
            </Button>
        </React.Fragment>
    );
}

export default NavCard;
