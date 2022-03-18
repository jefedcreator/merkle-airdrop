// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.1;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract AirdropToken is ERC20{
//     constructor() ERC20("AirdropToken", "ADT") {
//         _mint(address(this), 1000 * 10**18);
//     }

// // not safe
//     function giveReward(address _winner, uint256 _amt) public returns(bool) {
//         require(_transfer(address(this), _winner, _amt), "transfer failed");
//         return true;
//     }
// }