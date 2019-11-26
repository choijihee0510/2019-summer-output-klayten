pragma solidity ^0.4.24;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Klaystagram is ERC721, ERC721Enumerable {
    using SafeMath for uint256;

    event MediUploaded (string MediName, uint256 Quantity, string Date, string Provider, string  Memo);

    mapping (uint256 => MediData) private _MediList;

    struct MediData {
        uint256 tokenId;                       // Unique token id
        address[] ownerHistory;                // History of all previous owners
        string MediName;                           //약이름
        uint256 Quantity;                          // 수량
        string Date;                             // 날짜
        string Provider;                         // 공급자
        string  Memo;                            //메모쓰
    }

    /**
     * @notice _mint() is from ERC721.sol
     */
    function uploadMedi(string MediName, uint256 Quantity, string Date, string Provider, string  Memo) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory ownerHistory;

        MediData memory newMediData = MediData({
            tokenId : tokenId,
            ownerHistory : ownerHistory,
            MediName : MediName,
            Quantity : Quantity,
            Date : Date,
            Provider : Provider,
            Memo : Memo
            });

        _MediList[tokenId] = newMediData;
        _MediList[tokenId].ownerHistory.push(msg.sender);

        emit MediUploaded(MediName, Quantity, Date, Provider, Memo);
    }

    /**
     * @notice safeTransferFrom function checks whether receiver is able to handle ERC721 tokens
     *  and then it will call transferFrom function defined below
     */
    function transferOwnership(uint256 tokenId, address to) public returns(uint, address, address, address) {
        safeTransferFrom(msg.sender, to, tokenId);
        uint ownerHistoryLength = _MediList[tokenId].ownerHistory.length;
        return (
        _MediList[tokenId].tokenId,
        //original owner
        _MediList[tokenId].ownerHistory[0],
        //previous owner, length cannot be less than 2
        _MediList[tokenId].ownerHistory[ownerHistoryLength-2],
        //current owner
        _MediList[tokenId].ownerHistory[ownerHistoryLength-1]);
    }

    /**
     * @notice Recommand using transferOwnership, which uses safeTransferFrom function
     * @dev Overided transferFrom function to make sure that every time ownership transfers
     *  new owner address gets pushed into ownerHistory array
     */
    function transferFrom(address from, address to, uint256 tokenId) public {
        super.transferFrom(from, to, tokenId);
        _MediList[tokenId].ownerHistory.push(to);
    }

    function getTotalMediCount () public view returns (uint) {
        return totalSupply();
    }

    function getMedi (uint tokenId) public view
    returns(uint256, address[], string, uint256, string, string, string) {
        require(_MediList[tokenId].tokenId != 0, "Data does not exist");
        return (
        _MediList[tokenId].tokenId,
        _MediList[tokenId].ownerHistory,
        _MediList[tokenId].MediName,
        _MediList[tokenId].Quantity,
        _MediList[tokenId].Date,
        _MediList[tokenId].Provider,
        _MediList[tokenId].Memo);
    }


    //    function burn(uint _tokenId) external {
    //
    //        address addr_owner = ownerOf(_tokenId);
    //
    //        require(
    //            addr_owner == msg.sender,
    //            "msg.sender is NOT the owner of the token"
    //        );
    //
    //        //reset approved address
    //        if (allowance[_tokenId] != address(0)) {
    //            delete allowance[_tokenId];
    //            // tokenId => 0
    //        }
    //
    //        //transfer : change the owner of the token, but address(0)
    //        tokenOwners[_tokenId] = address(0);
    //        balances[msg.sender] = balances[msg.sender].sub(1);
    //
    //        //for enumeration
    //        removeInvalidToken(_tokenId);
    //
    //        emit Transfer(addr_owner, address(0), _tokenId);
    //    }
    //
    //    function removeInvalidToken(uint256 tokenIdToRemove) private {
    //
    //        uint256 lastIndex = allValidTokenIds.length.sub(1);
    //        uint256 removeIndex = allValidTokenIndex[tokenIdToRemove];
    //
    //        uint256 lastTokenId = allValidTokenIds[lastIndex];
    //
    //        //swap
    //        allValidTokenIds[removeIndex] = lastTokenId;
    //        allValidTokenIndex[lastTokenId] = removeIndex;
    //
    //        //delete
    //        //Arrays have a length member to hold their number of elements.
    //        //Dynamic arrays can be resized in storage (not in memory) by changing the .length member.
    //        allValidTokenIds.length = allValidTokenIds.length.sub(1);
    //        //allValidTokenIndex is private so can't access invalid token by index programmatically
    //        allValidTokenIndex[tokenIdToRemove] = 0;
    //    }

}