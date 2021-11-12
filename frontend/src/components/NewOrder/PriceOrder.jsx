import React from "react";
import styled from "styled-components";

function PriceOrder({order, setOrder}) {

    function handleChangeInput(e) {
        setOrder({
            ...order,
            price: e.target.value
        })
    }

    return (
        <MainDiv>
            <Input 
                type="number"
                onChange={handleChangeInput}
                value={order.price}
                placeholder="Price"
            />
        </MainDiv>
    )
}

export default PriceOrder;

const MainDiv = styled.div`
`
const Input = styled.input`
    border: none;
    font-size: 20px;
    text-align: center;
    padding: 3px;
`