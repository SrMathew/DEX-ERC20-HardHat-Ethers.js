import React from "react";
import styled from "styled-components";;

function InputWallet({amount, setAmount}) {

    function handleChangeInput(e) {
        setAmount(e.target.value)
    }

    return (
        <MainDiv>
            <Input
                type="number"
                onChange={handleChangeInput}
                value={amount}
                placeholder="Amount"
            />
        </MainDiv>
    )
}

export default InputWallet;

const MainDiv = styled.div`
`
const Input = styled.input`
    border: none;
    font-size: 20px;
    text-align: center;
    padding: 3px;
`