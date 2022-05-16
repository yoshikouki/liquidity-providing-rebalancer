//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract LiquidityProvidingRebalancer {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}
