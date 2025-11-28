pragma solidity 0.8.30;
// SPDX-License-Identifier: GPL-3.0

contract Faucet {
		
		// Give out ether to anyone who asks
		function withdraw(uint256 _withdrawAmount, address payable _to) public
		{
				// limit to withdrawal
				require(_withdrawAmount <= 1000000000000, "The requested amount is too much, try a smalller amount" ); // units are in wei

				// Send the amount to the address that requested it
				_to.transfer(_withdrawAmount);
		}

		// Function to receive Ether, msg.data is empty

		receive() external payable {}

		// Fallback when msg.data is not empy

		fallback() external payable {}


}
