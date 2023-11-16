// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageContract {
    // Структура с произвольными полями
    struct MyData {
        uint256 integerValue;
        string stringValue;
        address addressValue;
        bool boolValue;
    }

    // Отображение для хранения структур
    mapping(bytes32 => MyData) public dataMapping;

    // Функция добавления структуры в отображение
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

        // Добавление структуры в отображение
        dataMapping[key] = newData;

        // Логирование события
        emit DataAdded(key, integerValue, stringValue, addressValue, boolValue);
    }

    // Функция удаления структуры из отображения
    function removeData(bytes32 key) public {
        // Удаление структуры из отображения
        delete dataMapping[key];

        // Логирование события
        emit DataRemoved(key);
    }

    // Определение событий
    event DataAdded(
        bytes32 indexed key,
        uint256 integerValue,
        string stringValue,
        address indexed addressValue,
        bool boolValue
    );

    event DataRemoved(bytes32 indexed key);
}
