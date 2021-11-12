import React, { useState } from "react";
import styled from "styled-components";
import NewOrderText from "../Texts/NewOrder/NewOrderText";
import TypeOrder from "./TypeOrder";
import SideOrder from "./SideOrder";
import AmountOrder from "./AmountOrder";
import PriceOrder from "./PriceOrder";
import SubmitButton from "../Wallet/SubmitButton"

const TYPE = {
    LIMIT: "LIMIT",
    MARKET: "MARKET"
}

const SIDE = {
    BUY: 0,
    SELL: 1
}

function NewOrder({tokens, tokenSelected, createMarketOrder, createLimitOrder}) {

    const [order, setOrder] = useState({
        type: TYPE.LIMIT,
        side: SIDE.BUY,
        amount: "",
        price: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        if (order.type === TYPE.MARKET) {
            createMarketOrder(tokens[tokenSelected].ticker, order.amount, order.side);
        } else {
            createLimitOrder(tokens[tokenSelected].ticker, order.amount, order.price, order.side);
        }
    }

    return (
        <MainSection>
            <TitleDiv>
                <NewOrderText 
                    text="New Order"
                />
                <HrLine />
            </TitleDiv>
            <SpaceBetweenDiv>
                <LeftDiv>
                    <p>Type</p>
                </LeftDiv>
                <RightDiv>
                    <TypeOrder 
                        order={order}
                        setOrder={setOrder}
                        typeObj={TYPE}
                    />
                </RightDiv>
            </SpaceBetweenDiv>
            <SpaceBetweenDiv>
                <LeftDiv>
                    <p>Side</p>
                </LeftDiv>
                <RightDiv>
                    <SideOrder 
                        order={order}
                        setOrder={setOrder}
                        sideObj={SIDE}
                    />
                </RightDiv>
            </SpaceBetweenDiv>
            <div>
            <SpaceBetweenDiv>
                    <LeftDiv>
                        <p>Amount</p>
                    </LeftDiv>
                    <RightDiv>
                        <AmountOrder 
                            order={order}
                            setOrder={setOrder}
                        />
                    </RightDiv>
            </SpaceBetweenDiv>
            <SpaceBetweenDiv>
                <LeftDiv>
                    <p>Price</p>
                </LeftDiv>
                <RightDiv>
                    <PriceOrder 
                        order={order}
                        setOrder={setOrder}
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

export default NewOrder;

const MainSection = styled.section`
    background-color: #141414;
    border-radius: 10px;
    padding: 1%;
    margin: 20px 0;
`
const TitleDiv = styled.div`
    padding-left: 10px;
    margin-bottom: 25px;
`
const HrLine = styled.hr`
    height: 15px;
    background-color: #681CD3;
    border: none;
    margin: 0;
    width: 95%;
`
const ButtonDiv = styled.div`
    text-align: right;
    margin: 15px 0px;
    padding-right: 30px;
`
const SpaceBetweenDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
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