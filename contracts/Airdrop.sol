// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// interface IERC20{
//     function transfer(
//         address to,
//         uint256 tokenId
//     ) external;
// }

contract AirDrop is ERC20{
    constructor() ERC20("AirdropToken", "ADT") {
        
    }
    
    bytes32 public immutable merkleRoot = 0x8e8ad5f46d7df7757bb7a0c964bdcaa4f596a961e85f02f0b515dc4c56bd6917;

    mapping(address => bool) public tokenClaimed;

    function tokenClaimer( bytes32[] calldata _merkleProof, uint amount, uint id) public{
        require(!tokenClaimed[msg.sender],"Address has already claimed.");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender,id,amount));
        require(MerkleProof.verify(_merkleProof,merkleRoot,leaf),"Invalid proof.");

        tokenClaimed[msg.sender] = true;

        _mint(msg.sender, amount * 10**18);
    }
}