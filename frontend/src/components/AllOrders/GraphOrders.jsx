import React from "react";
import styled from "styled-components";
import Moment from "react-moment"

function GraphOrders({text, orders, myOrders}) {

    return (
        <MainDiv>
            <TitleDiv text={text}>
                <Text>{text}</Text>
            </TitleDiv>
            <HeadDiv>
                <Column>
                    {myOrders ? <p>Amount/filled</p> : <p>Amount</p>}
                </Column>
                <Column>
                    <p>Price</p>
                </Column>
                <Column>
                    <p>Date</p>
                </Column>
            </HeadDiv>
            <DataDiv>
                {orders.map(order => 
                    <Row>
                        <Column>
                            {myOrders ? <p>{order.amount.toString()}/{order.filled.toString()}</p> : <p>{order.amount.toString()}</p>}
                        </Column>
                        <Column>
                            <p>{order.price.toString()}</p>
                        </Column>
                        <Column>
                            <MomentDiv>
                                <StyledMoment fromNow>{parseInt(order.date) * 1000}</StyledMoment>
                            </MomentDiv>
                        </Column>
                    </Row>
                )}
            </DataDiv>
        </MainDiv>
    )
}

export default GraphOrders;

const MainDiv = styled.div`
    margin: 20px 0;
    width: 500px;
`
const TitleDiv = styled.div(({text}) => `
    background-color: ${text === "SELL" ? "green" : "red"};
    text-align: center;
    padding: 1px
`)
const HeadDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-bottom: solid 1px #FDFDFD;
`
const DataDiv = styled.div`
`
const Text = styled.p`
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-bottom: solid 1px #FDFDFD;
`
const Column = styled.div`
    width: 25%
`
const StyledMoment = styled(Moment)`
`
const MomentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-top: 16px;
`