import React from "react";
import styled from "styled-components";

function WalletText({text}) {
    return (
        <Text>{text}</Text>
    )
}

export default WalletText;

const Text = styled.p`
    color: #FDFDFD;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0;
`