import React from "react";
import styled from "styled-components";

function SubmitButton({submit}) {

    return (
        <Button onClick={submit}>Submit</Button>
    )
}

export default SubmitButton;

const Button = styled.button`
    background-color: #691BD1;
    border: none;
    color: #FDFDFD;
    font-size: 1.5rem;
    height: 50px;
    width: 100px;
    border-radius: 8px;
    cursor: pointer;
`