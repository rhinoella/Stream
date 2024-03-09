// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {PedersenCommitment} from "./PedersenCommitment.sol";

contract Collateralise is Ownable {
    // Mapping from company to verkle root
    mapping(address => bool) public isCompanyRegistered;
    mapping(address => Ledger) public companyLedgers;
    mapping(address => Commit) public allocations;

    struct Commit {
        uint256 x;
        uint256 y;
    }

    struct Ledger {
        address ledgerOwner;
        Commit totalFunds;
    }

    error NotRegistered();
    error TransactionFailed();

    constructor () Ownable(msg.sender) {}

    function registerLedger() public {
        isCompanyRegistered[msg.sender] = true;
        companyLedgers[msg.sender] = Ledger(
            msg.sender,
            Commit(0, 0)
        );
    }

    function collateraliseAssets(uint256 _bindingFactor) public payable {
        if (isCompanyRegistered[msg.sender] == false) {
            revert NotRegistered();
        }

        (uint256 x, uint256 y) = PedersenCommitment.commit(_bindingFactor, msg.value);

        companyLedgers[msg.sender].Commit.x = x;
        companyLedgers[msg.sender].Commit.y = y;
    }

    function allocateFunds(address _to, uint256 _amount, uint256 _bindingFactor) public {
        if (isCompanyRegistered[msg.sender] == false) {
            revert NotRegistered();
        }

        if 
        
    }

    function withdraw(uint256 _amount) external onlyOwner {
        (bool sent,) = msg.sender.call{value: _amount}("");

        if (!sent) {
            revert TransactionFailed();
        }
    }
}