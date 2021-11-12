import React from "react";
import styled from "styled-components";

function AddressText({text}) {
    return (
        <Text>{text}</Text>
    )
}

export default AddressText;

const Text = styled.p`
    font-size: 1.5rem;
    color: #BFBFBF;
`