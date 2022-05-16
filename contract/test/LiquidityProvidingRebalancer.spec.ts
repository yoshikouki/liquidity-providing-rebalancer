import { expect } from "chai";
import { Wallet } from "ethers";
import { ethers, waffle } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { LiquidityProvidingRebalancer } from "../typechain/LiquidityProvidingRebalancer";

describe("LiquidityProvidingRebalancer", () => {
  let wallet: Wallet, other: Wallet;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;
  let rebalancer: LiquidityProvidingRebalancer;
  const fixture = async () => {
    const LiquidityProvidingRebalancer = await ethers.getContractFactory(
      "LiquidityProvidingRebalancer",
    );
    return await LiquidityProvidingRebalancer.deploy();
  };

  before("create wallet and fixture loader", async () => {
    [wallet, other] = await (ethers as any).getSigners();
    loadFixture = waffle.createFixtureLoader([wallet, other]);
  });

  beforeEach("deploy rebalancer", async () => {
    rebalancer = await loadFixture(fixture);
  });

  it("owner is deployer", async () => {
    expect(await rebalancer.owner()).to.equal(wallet.address);
  });
});
