import React from "react";
import ethers from "ethers";
import styled from "styled-components";
import SelectToken from "../SelectToken/SelectToken";
import TokenSelectedText from "../Texts/Header/TokenSelectedText";
import ContractAddressText from "../Texts/Header/ContractAddressText";
import AddressText from "../Texts/Header/AddressText";

function Header({tokens, tokenSelected, setTokenSelected}) {
    return (
        <MainSection>
            <SelectToken 
                tokens={tokens}
                tokenSelected={tokenSelected}
                setTokenSelected={setTokenSelected}
            />
            {tokenSelected !== "none" ? 
                <TextDiv>
                    <TokenSelectedText 
                        text={ethers.utils.toUtf8String(tokens[tokenSelected].ticker)}
                    />
                    <ContractAddressText 
                        text={"Contract Address: "}
                    />
                    <AddressText 
                        text={tokens[tokenSelected].tokenAddress}
                    />
                </TextDiv> : 
                null
            }
        </MainSection>
    )
}

export default Header;

const MainSection = styled.section`
    background-color: #141414;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const TextDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`