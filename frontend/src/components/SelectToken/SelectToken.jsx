import React from "react";
import styled from "styled-components";
import Web3 from "web3";

function SelectToken({tokens, tokenSelected, setTokenSelected}) {

    function handleSelectChange(e) {
        setTokenSelected(e.target.value)
    }

    return (
        <MainDiv>
            <Select defaultValue="none" value={tokenSelected} onChange={handleSelectChange}>
                <option value="none">Choose token</option>
                {tokens && tokens.map((token, index) => 
                    <option key={index} value={index}>{Web3.utils.hexToUtf8(token.ticker)}</option>
                )}
            </Select> 
        </MainDiv>
    )
}

export default SelectToken;

const MainDiv = styled.div`
`
const Select = styled.select(({tokenSelected}) => `
    background-color: #000000;
    color: #FDFDFD;
    border: none;
    height: 50px;
    text-align: center;
    font-size: ${tokenSelected !== "none" ? "1.5rem" : "10px"};
    cursor: pointer;
`)