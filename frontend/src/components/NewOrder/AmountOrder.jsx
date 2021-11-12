import React from "react";
import styled from "styled-components";

function AmountOrder({order, setOrder}) {

    function handleChangeInput(e) {
        setOrder({
            ...order,
            amount: e.target.value
        })
    }
    return (
        <MainDiv>
            <Input 
                type="number"
                onChange={handleChangeInput}
                value={order.amount}
                placeholder="Amount"
            />
        </MainDiv>
    )
}

export default AmountOrder;

const MainDiv = styled.div`
`
const Input = styled.input`
    border: none;
    font-size: 20px;
    text-align: center;
    padding: 3px;
`