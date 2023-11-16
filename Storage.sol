// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageContract {
    //    
    struct MyData {
        uint256 integerValue;
        string stringValue;
        address addressValue;
        bool boolValue;
    }

    //    
    mapping(bytes32 => MyData) public dataMapping;

    //     
    function addData(
        bytes32 key,
        uint256 integerValue,
        string memory stringValue,
        address addressValue,
        bool boolValue
    ) public {
        MyData memory newData = MyData({
            integerValue: integerValue,
            stringValue: stringValue,
            addressValue: addressValue,
            boolValue: boolValue
        });

        //    
        dataMapping[key] = newData;

        //  
        emit DataAdded(key, integerValue, stringValue, addressValue, boolValue);
    }

    //     
    function removeData(bytes32 key) public {
        //    
        delete dataMapping[key];

        //  
        emit DataRemoved(key);
    }

    //  
    event DataAdded(
        bytes32 indexed key,
        uint256 integerValue,
        string stringValue,
        address indexed addressValue,
        bool boolValue
    );

    event DataRemoved(bytes32 indexed key);
}

