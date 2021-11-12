import React from "react";
import styled from "styled-components";

function ContractAddressText({text}) {
    return (
        <Text>{text}</Text>
    )
}

export default ContractAddressText;

const Text = styled.p`
    font-size: 1.5rem;
    margin-right: 10px;
    color: #BFBFBF;
`