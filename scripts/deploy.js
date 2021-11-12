const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const Dex = await hre.ethers.getContractFactory("Dex");
    const Bat = await hre.ethers.getContractFactory("Bat");
    const Dai = await hre.ethers.getContractFactory("Dai");
    const Rep = await hre.ethers.getContractFactory("Rep");
    const Zrx = await hre.ethers.getContractFactory("Zrx");
    const dex = await Dex.deploy();
    const bat = await Bat.deploy();
    const dai = await Dai.deploy();
    const rep = await Rep.deploy();
    const zrx = await Zrx.deploy();
    await dex.deployed();
    await bat.deployed();
    await dai.deployed();
    await rep.deployed();
    await zrx.deployed();
    //Simulate Tokens
    const SIDE = {
        BUY: 0,
        SELL: 1
    };
    const [DAI, BAT, REP, ZRX] = ["DAI", "BAT", "REP", "ZRX"].map(ticker => web3.utils.asciiToHex(`${ticker}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0`)); 
    // \0 porque le faltaban 58 caracteres para que lo considere un bytes32 valido
    await dex.addToken(DAI, dai.address);
    await dex.addToken(BAT, bat.address);
    await dex.addToken(REP, rep.address);
    await dex.addToken(ZRX, zrx.address);
    //Simulate traders and token balances
    [owner, trader1, trader2, trader3, trader4, _] = await ethers.getSigners();
    const amount = web3.utils.toWei("1000");
    const seedTokenBalance = async (token, trader) => {
        await token.faucet(trader.address, amount);
        await token.connect(trader).approve(
            dex.address,
            amount,
        );
        const ticker = await token.name();
        await dex.connect(trader).deposit(
            web3.utils.asciiToHex(`${ticker}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0`),
            amount
        )
    };
    await Promise.all(
        [dai, bat, rep, zrx].map(
          token => seedTokenBalance(token, trader1) 
        )
    );
    await Promise.all(
        [dai, bat, rep, zrx].map(
          token => seedTokenBalance(token, trader2) 
        )
    );
    await Promise.all(
        [dai, bat, rep, zrx].map(
          token => seedTokenBalance(token, trader3) 
        )
    );
    await Promise.all(
        [dai, bat, rep, zrx].map(
          token => seedTokenBalance(token, trader4) 
        )
    );
    const increaseTime = async (seconds) => {
        await web3.currentProvider.send({
          jsonrpc: '2.0',
          method: 'evm_increaseTime',
          params: [seconds],
          id: 0,
        }, () => {});
        await web3.currentProvider.send({
          jsonrpc: '2.0',
          method: 'evm_mine',
          params: [],
          id: 0,
        }, () => {});
    }
    //create trades
    await dex.connect(trader1).createLimitOrder(BAT, 1000, 10, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(BAT, 1000, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(BAT, 1200, 11, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(BAT, 1200, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(BAT, 1200, 15, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(BAT, 1200, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(BAT, 1500, 14, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(BAT, 1500, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(BAT, 2000, 12, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(BAT, 2000, SIDE.SELL);

    await dex.connect(trader1).createLimitOrder(REP, 1000, 2, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(REP, 1000, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(REP, 500, 4, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(REP, 500, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(REP, 800, 2, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(REP, 800, SIDE.SELL);
    await increaseTime(1);
    await dex.connect(trader1).createLimitOrder(REP, 1200, 6, SIDE.BUY);
    await dex.connect(trader2).createMarketOrder(REP, 1200, SIDE.SELL);
    //Transactions from the Promise.all
    await dex.connect(trader1).createLimitOrder(BAT, 1400, 10, SIDE.BUY)
    await dex.connect(trader2).createLimitOrder(BAT, 1200, 11, SIDE.BUY)
    await dex.connect(trader2).createLimitOrder(BAT, 1000, 12, SIDE.BUY)
       
    await dex.connect(trader1).createLimitOrder(REP, 3000, 4, SIDE.BUY)
    await dex.connect(trader1).createLimitOrder(REP, 2000, 5, SIDE.BUY)
    await dex.connect(trader2).createLimitOrder(REP, 500, 6, SIDE.BUY)
       
    await dex.connect(trader1).createLimitOrder(ZRX, 4000, 12, SIDE.BUY)
    await dex.connect(trader1).createLimitOrder(ZRX, 3000, 13, SIDE.BUY)
    await dex.connect(trader2).createLimitOrder(ZRX, 500, 14, SIDE.BUY)
       
    await dex.connect(trader3).createLimitOrder(BAT, 2000, 16, SIDE.SELL)
    await dex.connect(trader4).createLimitOrder(BAT, 3000, 15, SIDE.SELL)
    await dex.connect(trader4).createLimitOrder(BAT, 500, 14, SIDE.SELL)
       
    await dex.connect(trader3).createLimitOrder(REP, 4000, 10, SIDE.SELL)
    await dex.connect(trader3).createLimitOrder(REP, 2000, 9, SIDE.SELL)
    await dex.connect(trader4).createLimitOrder(REP, 800, 8, SIDE.SELL)
       
    await dex.connect(trader3).createLimitOrder(ZRX, 1500, 23, SIDE.SELL)
    await dex.connect(trader3).createLimitOrder(ZRX, 1200, 22, SIDE.SELL)
    await dex.connect(trader4).createLimitOrder(ZRX, 900, 21, SIDE.SELL)
    
    const data = {
        addressDex: dex.address,
        addressBat: bat.address,
        addressDai: dai.address,
        addressRep: rep.address,
        addressRzx: zrx.address,
        abiDex: JSON.parse(dex.interface.format("json")),
        abiBat: JSON.parse(bat.interface.format("json")),
        abiDai: JSON.parse(dai.interface.format("json")),
        abiRep: JSON.parse(rep.interface.format("json")),
        abiZrx: JSON.parse(zrx.interface.format("json"))
    };

    fs.writeFileSync("frontend/src/Contracs.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });