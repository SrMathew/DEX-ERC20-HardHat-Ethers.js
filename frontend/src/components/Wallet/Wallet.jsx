import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled from "styled-components";
import WalletText from "../Texts/Wallet/WalletText";
import WalletTokenText from "../Texts/Wallet/WalletTokenText";
import TransferTokenText from "../Texts/Wallet/TransferTokenText";
import SubmitButton from "./SubmitButton";
import InputWallet from "./InputWallet";
import DirectionWallet from "./DirectionWallet";

const DIRECTION = {
    WITHDRAW: "WITHDRAW",
    DEPOSIT: "DEPOSIT"
}

function Wallet({tokens, tokenSelected, getBalances, user, setUser, deposit, withdraw, contracts}) {
    const [direction, setDirection] = useState(DIRECTION.DEPOSIT)
    const [amount, setAmount] = useState();
    
    useEffect(() => {
        getBalances(user.account, tokens[tokenSelected].ticker)
    }, [tokenSelected])

    function handleSubmit(e) {
        e.preventDefault();
        if (direction === DIRECTION.DEPOSIT) {
            deposit(amount);
        } else {
            withdraw(amount);
        }
    }
    return (
        <MainSection>
            <TitleDiv>
                <WalletText 
                    text="Wallet"
                />
                <HrLine />
            </TitleDiv>
            <TextDiv>
                <WalletTokenText 
                    text={Web3.utils.hexToUtf8(tokens[tokenSelected].ticker)}
                />
            </TextDiv>
            <div>
                <SpaceBetweenDiv>
                    <LeftDiv>
                        <p>Wallet</p>
                    </LeftDiv>
                    <RightDiv>
                        <p>{user.balances.tokenWallet}</p>
                    </RightDiv>
                </SpaceBetweenDiv>
                <SpaceBetweenDiv>
                    <LeftDiv>
                        <p>Dex</p>
                    </LeftDiv>
                    <RightDiv>
                        <p>{user.balances.tokenDex}</p>
                    </RightDiv>
                </SpaceBetweenDiv>
            </div>
            <TextDiv>
                <TransferTokenText 
                    text={Web3.utils.hexToUtf8(tokens[tokenSelected].ticker)}
                />
            </TextDiv>
            <div>
                <SpaceBetweenDiv>
                    <LeftDiv>
                        <p>Direction</p>
                    </LeftDiv>
                    <RightDiv>
                        <DirectionWallet 
                            direction={direction}
                            setDirection={setDirection}
                            directionObj={DIRECTION}
                        />
                    </RightDiv>
                </SpaceBetweenDiv>
                <SpaceBetweenDiv>
                    <LeftDiv>
                        <p>Amount</p>
                    </LeftDiv>
                    <RightDiv>
                        <InputWallet 
                            amount={amount}
                            setAmount={setAmount}
                        />
                    </RightDiv>
                </SpaceBetweenDiv>
            </div>
            <ButtonDiv>
                <SubmitButton 
                    submit={handleSubmit}
                />
            </ButtonDiv>
        </MainSection>
    )
}

export default Wallet;

const MainSection = styled.section`
    background-color: #141414;
    border-radius: 10px;
    padding: 1%;
`
const TitleDiv = styled.div`
    padding-left: 10px;
`
const HrLine = styled.hr`
    height: 15px;
    background-color: #681CD3;
    border: none;
    margin: 0;
    width: 95%;
`
const TextDiv = styled.div`
    padding-left: 10px;
`
const ButtonDiv = styled.div`
    text-align: right;
    margin: 15px 0px;
    padding-right: 30px;
`
const SpaceBetweenDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between
`
const LeftDiv = styled.div`
    width: 30%;
    padding-left: 10px;
    color: #FDFDFD;
`
const RightDiv = styled.div`
    width: 70%;
    padding-left: 10px;
    color: #FDFDFD;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
`