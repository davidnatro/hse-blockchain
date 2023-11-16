const { Web3 } = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com'));

const contractAddress = '0x1A9e4b16468d154bEBbc36B361a5F09E3912447C';

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "integerValue",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "stringValue",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addressValue",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "boolValue",
        "type": "bool"
      }
    ],
    "name": "addData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "integerValue",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "stringValue",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addressValue",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "boolValue",
        "type": "bool"
      }
    ],
    "name": "DataAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "DataRemoved",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "removeData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "dataMapping",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "integerValue",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "stringValue",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addressValue",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "boolValue",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

const randomKey =  '0xB3B3886F389F27BC1F2A41F0ADD45A84453F0D2A877FCD1225F13CD95953A86A';

async function addDataToContract() {
  try {
    const key = randomKey;
    const integerValue = 123;
    const stringValue = 'Hello, world!';
    const addressValue = '0x1249A662dFaDE6d94f77aF54a7f06d7318ae0638';
    const boolValue = true;

    const result = await contract.methods.addData(
      key,
      integerValue,
      stringValue,
      addressValue,
      boolValue
    ).send({ from: '0x1249A662dFaDE6d94f77aF54a7f06d7318ae0638', gas: 1 });

    console.log('Результат добавления данных:', result);
  } catch (error) {
    console.error('Ошибка при добавлении данных в контракт:', error);
  }
}

async function getContractEvents() {
  try {
    const events = await contract.getPastEvents('DataAdded', {
      filter: { key: randomKey },
      fromBlock: web3.eth.getBlockNumber() - 500,
      toBlock: 'latest',
    });
    console.log('События контракта:', events);
  } catch (error) {
    console.error('Ошибка запроса событий контракта:', error);
  }
}

async function viewContractStorage() {
  try {
    const key = randomKey;
    const storageData = await contract.methods.dataMapping(key).call();
    console.log('Данные из хранилища контракта:', storageData);
  } catch (error) {
    console.error('Ошибка просмотра хранилища контракта:', error);
  }
}

addDataToContract();
getContractEvents();
viewContractStorage();
