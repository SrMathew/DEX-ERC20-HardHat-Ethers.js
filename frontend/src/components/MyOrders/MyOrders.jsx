import React, { useEffect } from "react";
import styled from "styled-components"
import GraphOrders from "../AllOrders/GraphOrders";
import MyOrdersText from "../Texts/MyOrders/MyOrdersText.jsx"

function MyOrders({orders, tokenSelected, tokens, getOrders}) {

    useEffect(() => {
        const init = async () => {
            await getOrders(tokens[tokenSelected].ticker)
        }
        init();
    }, [])

    return (
        <MainSection>
            <TitleDiv>
                <MyOrdersText 
                    text="My orders"
                />
                <HrLine />
            </TitleDiv>
            <GraphsDiv>
                <div>
                    <GraphOrders 
                        text="BUY"
                        orders={orders.buy}
                        myOrders={true}
                    />
                </div>
                <div>
                    <GraphOrders 
                        text="SELL"
                        orders={orders.sell}
                        myOrders={true}
                    />
                </div>
            </GraphsDiv>
        </MainSection>
    )
}

export default MyOrders;

const MainSection = styled.section`
    background-color: #141414;
    border-radius: 10px;
    padding: 1%;
    color: #FDFDFD;
    margin: 20px 0;
`
const TitleDiv = styled.div`
`
const HrLine = styled.hr`
    height: 15px;
    background-color: #681CD3;
    border: none;
    margin: 0;
    width: 95%;
`
const GraphsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`