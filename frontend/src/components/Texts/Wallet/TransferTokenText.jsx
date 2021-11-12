import React from "react";
import styled from "styled-components";

function TransferTokenText({text}) {
    return (
        <Text>Transfer {text}</Text>
    )
}

export default TransferTokenText;

const Text = styled.p`
    color: #FDFDFD;
    font-size: 2rem;
    font-weight: 700;
`