// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Collateralise is Ownable {
    // Mapping from company to verkle root
    mapping(address => uint256) public companyLedgers;
    mapping(address => bool) public isCompanyRegistered;

    error NotRegistered();
    error TransactionFailed();

    constructor () Ownable(msg.sender) {}

    function registerLedger() public {
        isCompanyRegistered[msg.sender] = true;// Commit?
    }

    function collateraliseAssets(uint256 commitment) public payable {
        if (isCompanyRegistered[msg.sender] == false) {
            revert NotRegistered();
        }

        companyLedgers[msg.sender] = commitment;
    }

    function withdraw(uint256 _amount) external onlyOwner {
        (bool sent,) = msg.sender.call{value: _amount}("");

        if (!sent) {
            revert TransactionFailed();
        }
    }
}