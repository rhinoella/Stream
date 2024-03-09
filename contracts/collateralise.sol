// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Collateralise is Ownable {
    // Mapping from company to verkle root
    mapping(address => Ledger) public companyLedgers;
    mapping(address => uint256) public allocations;
    mapping(address => bool) public isCompanyRegistered;

    struct Ledger {
        address ledgerOwner;
        uint256 rootHash;
    }

    error NotRegistered();
    error TransactionFailed();

    constructor () Ownable(msg.sender) {}

    function registerLedger() public {
        isCompanyRegistered[msg.sender] = true;// Commit?
        companyLedgers[msg.sender] = Ledger(
            msg.sender,
            0
        );
    }

    function collateraliseAssets(uint256 commitment) public payable {
        if (isCompanyRegistered[msg.sender] == false) {
            revert NotRegistered();
        }

        companyLedgers[msg.sender].rootHash = commitment;
    }

    function allocateFunds(address _to, uint256 amount, uint256 commitment) public {
        if (isCompanyRegistered[msg.sender] == false) {
            revert NotRegistered();
        }

        
    }

    function withdraw(uint256 _amount) external onlyOwner {
        (bool sent,) = msg.sender.call{value: _amount}("");

        if (!sent) {
            revert TransactionFailed();
        }
    }
}