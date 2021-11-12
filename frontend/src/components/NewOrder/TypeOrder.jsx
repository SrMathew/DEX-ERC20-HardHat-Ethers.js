import React from "react";
import styled from "styled-components";

function TypeOrder({order, setOrder, typeObj}) {

    function handleButtonClick(e) {
        setOrder({
            ...order,
            type: typeObj[e.target.value]
        })
    }

    return (
        <MainDiv>
            <LimitButton
                value="LIMIT"
                onClick={handleButtonClick}
                type={order.type}
            >Limit</LimitButton>
            <MarketButton
                value="MARKET"
                onClick={handleButtonClick}
                type={order.type}
            >Market</MarketButton>
        </MainDiv>
    )
}

export default TypeOrder;

const MainDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const LimitButton = styled.button(({type}) =>`
    height: 45px;
    width: 125px;
    font-size: 22px;
    color: #FDFDFD;
    background-color: ${type === "LIMIT" ? "#691BD1" : "#3C1377"};
    border: 3px solid #3C1377;
    cursor: pointer;
    border-radius: 10px 0 0 10px;
    padding: 5px;
`)
const MarketButton = styled.button(({type}) => `
    height: 45px;
    width: 125px;
    font-size: 22px;
    color: #FDFDFD;
    background-color: ${type === "MARKET" ? "#691BD1" : "#3C1377"};
    border: 3px solid #3C1377;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    padding: 5px;
`)