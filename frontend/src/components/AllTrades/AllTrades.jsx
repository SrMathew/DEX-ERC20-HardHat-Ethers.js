import React, { useEffect } from "react";
import styled from "styled-components";
import AllTradesText from "../Texts/AllTrades/AllTradesText";
import GraphOrders from "../AllOrders/GraphOrders";

function AllTrades({tokens, tokenSelected, allTrades, listenToTrades, dex}) {

    console.log("alltrades: ", allTrades)

    useEffect(() => {
        listenToTrades(tokens[tokenSelected].ticker);
        return () => {
            dex.removeAllListeners()
            console.log("All listener removed")
        }
    }, [tokenSelected])

    return (
        <MainSection>
            <TitleDiv>
                <AllTradesText 
                    text="All trades"
                />
                <HrLine />
            </TitleDiv>
            <div>
                <div>
                    <p>Graph</p>
                </div>
                <div>
                    <GraphOrders 
                        text="All trades"
                        orders={allTrades}
                    />
                </div>
            </div>
        </MainSection>
    )
}

export default AllTrades;

const MainSection = styled.section`
    background-color: #141414;
    border-radius: 10px;
    padding: 1%;
    color: #FDFDFD;
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