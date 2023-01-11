const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

describe("AMM", () => {
  let accounts, deployer, liquidityProvider, token1, token2, amm;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    liquidityProvider = accounts[1];

    const Token = await ethers.getContractFactory("Token");
    token1 = await Token.deploy("Ornelas.tech", "OTECH", "1000000");
    token2 = await Token.deploy("USD Token", "USD", "1000000");

    // send tokens to liquidity provider
    let transaction = await token1
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000));
    await transaction.wait();

    transaction = await token2
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000));
    await transaction.wait();

    const AMM = await ethers.getContractFactory("AMM");
    amm = await AMM.deploy(token1.address, token2.address);
  });

  describe("Deployment", () => {
    it("has an address", async () => {
      expect(amm.address).to.not.equal(0x0);
    });

    it("tracks token1 address", async () => {
      expect(await amm.token1()).to.equal(token1.address);
    });

    it("tracks token2 address", async () => {
      expect(await amm.token2()).to.equal(token2.address);
    });
  });

  describe("Swapping Tokens", () => {
    let amount;
    it("facilates swaps", async () => {
      // deployer approves 100k tokens
      amount = tokens(100000);
    });
  });
});
