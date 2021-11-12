import React, { useEffect } from "react";
import styled from "styled-components";
import AllOrdersText from "../Texts/AllOrders/AllOrdersText";
import GraphOrders from "./GraphOrders";

function AllOrders({tokens, tokenSelected, orders, getOrders}) {

    useEffect(() => {
        const init = async () => {
            await getOrders(tokens[tokenSelected].ticker)
        }
        init();
    }, [])

    return (
        <MainSection>
            <TitleDiv>
                <AllOrdersText 
                    text="All orders"
                />
                <HrLine />
            </TitleDiv>
            <GraphsDiv>
                <div>
                    <GraphOrders 
                        text="BUY"
                        orders={orders.buy}
                    />
                </div>
                <div>
                    <GraphOrders 
                        text="SELL"
                        orders={orders.sell}
                    />
                </div>
            </GraphsDiv>
        </MainSection>
    )
}

export default AllOrders;

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