import React from "react";
import styled from "styled-components";

function WalletTokenText({text}) {
    return (
        <Text>Token balance for {text}</Text>
    )
}

export default WalletTokenText;

const Text = styled.p`
    color: #FDFDFD;
    font-size: 2rem;
    font-weight: 700;
`