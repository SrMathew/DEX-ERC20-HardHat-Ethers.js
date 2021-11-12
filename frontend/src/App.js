import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled from "styled-components";
import getBlockchain from "./ethereum";
import Loading from "../src/components/Loading/Loading";
import Header from "./components/Header/Header";
import Wallet from "./components/Wallet/Wallet";
import AllTrades from "./components/AllTrades/AllTrades";
import NewOrder from "./components/NewOrder/NewOrder";
import AllOrders from "./components/AllOrders/AllOrders";
import MyOrders from "./components/MyOrders/MyOrders";

function App() {
  const [contracts, setContracts] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);
  const [tokenSelected, setTokenSelected] = useState("none");
  const [trades, setTrades] = useState([]);
  const [listener, setListener] = useState(undefined);
  const [orders, setOrders] = useState({
    buy: [],
    sell: []
  })
  const [user, setUser] = useState({
    account: "",
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    }
  })

  const getBalances = async (account, token) => {
    const tokenName = Web3.utils.hexToUtf8(token)
    const tokenDex = await contracts.dex
      .traderBalances(account, token);
    let tokenWallet;
    try {
      tokenWallet = await contracts[tokenName].balanceOf(account);
    } catch (e) {
      console.log("ERROR: Get balances -> Token wallet Error -> TokenWallet = 0")
      tokenWallet = 0;
    }
    setUser({
      ...user,
      balances: {
        tokenDex: tokenDex.toString(),
        tokenWallet: tokenWallet.toString()
      }
    })
    return {tokenDex, tokenWallet}
  }

  const getOrders = async (ticker) => {
    const buyOrders = await contracts.dex.getOrders(ticker, 0);
    const sellOrders = await contracts.dex.getOrders(ticker, 1);
    setOrders({
      buy: buyOrders,
      sell: sellOrders
    })
  }

  const listenToTrades = async ticker => {
    const tradesIds = new Set();
    const listener = contracts.dex.on("NewTrade", (tradeId, orderId, ticker, trader1, trader2, amount, price, date) => {
      if (tradesIds.has(tradeId)) return;
      tradesIds.add(tradeId);
      const newTrade = {
        tradeId: tradeId,
        orderId: orderId,
        ticker: ticker,
        trader1: trader1,
        trader2: trader2,
        amount: amount,
        price: price, 
        date: date
      }
      setTrades(trades => [...trades, newTrade])
    })
    setListener(listener)
  }
  
  const deposit = async (amount) => {
    await contracts[Web3.utils.hexToUtf8(tokens[tokenSelected].ticker)]
      .approve(contracts.dex.address, amount)
    await contracts.dex
      .connect(contracts.signer)
      .deposit(
        tokens[tokenSelected].ticker,
        amount,
      )
    await getBalances(user.account, tokens[tokenSelected].ticker)
  }
  const withdraw = async (amount) => {
    await contracts.dex
      .connect(contracts.signer)
      .withdraw(
        tokens[tokenSelected].ticker,
        amount,
      )
      await getBalances(user.account, tokens[tokenSelected].ticker)
  }

  const createMarketOrder = async (ticker, amount, side) => {
    await contracts.dex
    .connect(contracts.signer)
    .createMarketOrder(ticker, amount, side);
    await getOrders(ticker);
  }
  const createLimitOrder = async (ticker, amount, price, side) => {
    await contracts.dex
    .connect(contracts.signer)
    .createLimitOrder(ticker, amount, price, side);
    await getOrders(ticker);
  }

  useEffect(() => {
    const init = async () => {
      const contracts = await getBlockchain();
      const tokens = await contracts.dex.getTokens();

      setContracts(contracts);
      setTokens(tokens)
      setUser({
        ...user,
        account: contracts.signerAddress
      })
    }
    init();
  }, [])
  
  
  if (
    typeof contracts === "undefined" ||
    typeof tokens === "undefined"
  ) { return <Loading /> }
    console.log("App Trades: ", trades)
    console.log("contracts: ", contracts)
  return (
    <MainSection>
      <Header 
        tokens={tokens}
        tokenSelected={tokenSelected}
        setTokenSelected={setTokenSelected}
      />
      {tokenSelected !== "none" ? 
        <DatasDiv>
          <LeftDiv>
            <Wallet 
              tokens={tokens}
              tokenSelected={tokenSelected}
              getBalances={getBalances}
              user={user}
              setUser={setUser}
              deposit={deposit}
              withdraw={withdraw}
              contracts={contracts}
            />
            <NewOrder
              tokens={tokens}
              tokenSelected={tokenSelected}
              createMarketOrder={createMarketOrder}
              createLimitOrder={createLimitOrder}
            />
          </LeftDiv>
          {Web3.utils.hexToUtf8(tokens[tokenSelected].ticker) !== "DAI" ? 
            <RightDiv>
              <AllTrades 
                tokens={tokens}
                tokenSelected={tokenSelected}
                allTrades={trades}
                listenToTrades={listenToTrades}
                listener={listener}
                dex={contracts.dex}
              />
              <AllOrders 
                tokens={tokens}
                tokenSelected={tokenSelected}
                orders={orders}
                getOrders={getOrders}
              />
              <MyOrders 
                tokens={tokens}
                tokenSelected={tokenSelected}
                orders={{
                  buy: orders.buy.filter(
                    order => order.trader.toLowerCase() === user.account.toLowerCase()
                  ),
                  sell: orders.sell.filter(
                    order => order.trader.toLowerCase() === user.account.toLowerCase()
                  )
                }}
                getOrders={getOrders}
              />
            </RightDiv> :
            null
            }
        </DatasDiv> : 
        null
      }
    </MainSection>
  );
}

export default App;

const MainSection = styled.section`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const DatasDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`
const LeftDiv = styled.div`
  width: 30%;
`
const RightDiv = styled.div`
  width: 65%
`
