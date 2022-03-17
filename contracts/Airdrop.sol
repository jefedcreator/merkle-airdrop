// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AirDrop{

    bytes32 public immutable merkleRoot = 0x8e8ad5f46d7df7757bb7a0c964bdcaa4f596a961e85f02f0b515dc4c56bd6917;

    mapping(address => bool) public tokenClaimed;

    address AirDropToken;

    function tokenClaimer( bytes32[] calldata _merkleProof) public{
        require(!tokenClaimed[msg.sender],"Address has already claimed.");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof,merkleRoot,leaf),"Invalid proof.");

        tokenClaimed[msg.sender] = true;

        // IERC20(AirDropToken).transferFrom(address(this),msg.sender,address(this).balance);
    }
}