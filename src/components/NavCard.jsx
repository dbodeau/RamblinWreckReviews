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
            <Button onClick={onClick} className="navcard-button">
                <img src={logo} />
                <h2>{title}</h2>
                <p>{description}</p>
            </Button>
        </React.Fragment>
    );
}

export default NavCard;
