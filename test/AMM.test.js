const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

describe("AMM", () => {
  let accounts, deployer, token1, token2, amm;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    const Token = await ethers.getContractFactory("Token");
    token1 = await Token.deploy("Ornelas.tech", "OTECH", "1000000");
    token2 = await Token.deploy("USD Token", "USD", "1000000");

    const AMM = await ethers.getContractFactory("AMM");
    amm = await AMM.deploy();
  });

  describe("Deployment", () => {
    it("has an address", async () => {
      expect(amm.address).to.not.equal(0x0);
    });
  });
});
