import React from "react";
import styled from "styled-components";

function TokenSelectedText({text}) {
    return (
        <Text>{text} -</Text>
    )
}

export default TokenSelectedText;

const Text = styled.p`
    font-weight: 700;
    font-size: 1.5rem;
    margin-right: 10px;
    color: #FDFDFD;
`