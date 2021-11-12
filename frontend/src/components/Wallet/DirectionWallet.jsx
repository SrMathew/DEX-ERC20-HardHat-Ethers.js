import React from "react";
import styled from "styled-components";

function DirectionWallet({direction, setDirection, directionObj}) {

    function handleOnClickButton(e) {
        setDirection(directionObj[e.target.value])
    }

    return (
        <MainDiv>
            <DepositButton
                value="DEPOSIT"
                onClick={handleOnClickButton}
                direction={direction}
            >Deposit</DepositButton>
            <WithdrawButton
                value="WITHDRAW"
                onClick={handleOnClickButton}
                direction={direction}
            >Withdraw</WithdrawButton>
        </MainDiv>
    )
}

export default DirectionWallet;

const MainDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const DepositButton = styled.button(({direction}) =>`
    height: 45px;
    width: 125px;
    font-size: 22px;
    color: #FDFDFD;
    background-color: ${direction === "DEPOSIT" ? "#691BD1" : "#3C1377"};
    border: 3px solid #3C1377;
    cursor: pointer;
    border-radius: 10px 0 0 10px;
    padding: 5px;
`)
const WithdrawButton = styled.button(({direction}) => `
    height: 45px;
    width: 125px;
    font-size: 22px;
    color: #FDFDFD;
    background-color: ${direction === "WITHDRAW" ? "#691BD1" : "#3C1377"};
    border: 3px solid #3C1377;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    padding: 5px;
`)