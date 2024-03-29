// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {EllipticCurveParameters} from "./EllipticCurveParameters.sol";
import {PedersenCommitment} from "./PedersenCommitment.sol";

contract Collateralise is Ownable, PedersenCommitment {
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
        uint256 totalBalance;
        Commit totalRevenue;
        Commit totalBalanceCommit;
    }

    error NotRegistered();
    error TransactionFailed();
    error InsufficientFunds();

    event FundsTransfered(address company, address to, uint256 x, uint256 y);
    event AssetsCollateralised(address company, uint256 amount);

    constructor () Ownable(msg.sender) {}

    modifier onlyRegistered() {
        if (isCompanyRegistered[msg.sender] == false) {
            revert NotRegistered();
        }
        _;
    }

    function registerLedger() public {
        isCompanyRegistered[msg.sender] = true;
        companyLedgers[msg.sender] = Ledger(msg.sender, 0, Commit(0, 0), Commit(0, 0));
    }

    function collateraliseAssets(uint256 _bindingFactor) public payable onlyRegistered() {
        (uint256 x, uint256 y) = commit(_bindingFactor, msg.value);

        (uint256 xTot, uint256 yTot) = eAdd(
            x, y, companyLedgers[msg.sender].totalBalanceCommit.x, companyLedgers[msg.sender].totalBalanceCommit.y
        );
        companyLedgers[msg.sender].totalRevenue.x = xTot;
        companyLedgers[msg.sender].totalRevenue.y = yTot;
        companyLedgers[msg.sender].totalBalance += msg.value;
        companyLedgers[msg.sender].totalBalanceCommit.x = xTot;
        companyLedgers[msg.sender].totalBalanceCommit.y = yTot;
    }

    function allocateFunds(address _to, uint256 _amount, uint256 _bindingFactor) public onlyRegistered() {
        if (_amount > companyLedgers[msg.sender].totalBalance) {
            revert InsufficientFunds();
        }

        (uint256 xAlloc, uint256 yAlloc) = commit(_bindingFactor, _amount);
        (uint256 xRemaining, uint256 yRemaining) = eSub(
            companyLedgers[msg.sender].totalRevenue.x, companyLedgers[msg.sender].totalRevenue.y, xAlloc, yAlloc
        );

        companyLedgers[msg.sender].totalRevenue = Commit(xRemaining, yRemaining);
        if (allocations[_to].x != 0) {
            (uint256 xTot, uint256 yTot) = eAdd(allocations[_to].x, allocations[_to].y, xAlloc, yAlloc);
            allocations[_to].x = xTot;
            allocations[_to].y = yTot;
        }
        else {
            allocations[_to].x = xAlloc;
            allocations[_to].y = yAlloc;
        }

        emit FundsTransfered(msg.sender, _to, xAlloc, yAlloc);
    }

    function verifyFunds(address _addr, uint256 _amount, uint256 _bindingFactor) public view returns (bool) {
        return PedersenCommitment.verify(_bindingFactor, _amount, allocations[_addr].x, allocations[_addr].y);
    }

    function withdraw(uint256 _amount) external onlyOwner {
        (bool sent,) = msg.sender.call{value: _amount}("");

        if (!sent) {
            revert TransactionFailed();
        }
    }
}
