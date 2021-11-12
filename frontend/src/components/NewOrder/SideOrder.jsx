import React from "react";
import styled from "styled-components";

function SideOrder({order, setOrder, sideObj}) {

    function handleButtonClick(e) {
        setOrder({
            ...order,
            side: sideObj[e.target.value]
        })
    }

    return (
        <MainDiv>
            <BuyButton
                value="BUY"
                onClick={handleButtonClick}
                side={order.side}
            >Buy</BuyButton>
            <SellButton
                value="SELL"
                onClick={handleButtonClick}
                side={order.side}
            >Sell</SellButton>
        </MainDiv>
    )
}

export default SideOrder;

const MainDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const BuyButton = styled.button(({side}) =>`
    height: 45px;
    width: 125px;
    font-size: 22px;
    color: #FDFDFD;
    background-color: ${side === 0 ? "#691BD1" : "#3C1377"};
    border: 3px solid #3C1377;
    cursor: pointer;
    border-radius: 10px 0 0 10px;
    padding: 5px;
`)
const SellButton = styled.button(({side}) => `
    height: 45px;
    width: 125px;
    font-size: 22px;
    color: #FDFDFD;
    background-color: ${side === 1 ? "#691BD1" : "#3C1377"};
    border: 3px solid #3C1377;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    padding: 5px;
`)