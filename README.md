### [ethereumjs-tx-unsign](https://github.com/warren-bank/ethereumjs-tx-unsign)

#### Description:

The goal of this project is to provide a light-weight minimal library to decode a signed raw Ethereum transaction.

#### Installation:

```bash
npm install --save '@warren-bank/ethereumjs-tx-unsign'
```

- - - -

#### API:

__{txData, signature} = unsign(rawTx, to_hex, add_prefix_txData, add_prefix_signature)__

* params:
  * rawTx
    * type:
      * String: hex-encoded (with or without '0x' prefix)
      * Buffer
  * to_hex
    * description: convert values in `txData` and `signature` from Buffer to hex-encoded String?
    * type: Boolean
    * default: true
  * add_prefix_txData
    * description: if `to_hex`, prepend '0x' prefix to hex-encoded String values in `txData`?
    * type: Boolean
    * default: true
  * add_prefix_signature
    * description: if `to_hex`, prepend '0x' prefix to hex-encoded String values in `signature`?
    * type: Boolean
    * default: false
* returns:
  * txData
    * type: Object
    * keys: `"nonce","gasPrice","gasLimit","to","value","data","chainId"`
    * values:
      * type:
        * if `to_hex` is false:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;Buffer<br>
          else:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hex-encoded String
          * if `add_prefix_txData`: with '0x' prefix
        * exceptions:
          * "chainId" is a native `Number` type
  * signature
    * type: Object
    * keys: `"v","r","s"`
    * values:
      * type:
        * if `to_hex` is false:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;Buffer<br>
          else:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;hex-encoded String
          * if `add_prefix_signature`: with '0x' prefix

- - - -

#### Example:

```javascript
const unsign = require('@warren-bank/ethereumjs-tx-unsign')

const rawTx = '0xf90339018506fc23ac008310000094000000000000000000000000000000000000000080b902d26060604052341561000c57fe5b60405160a0806102d2833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b84600060006101000a81548160ff02191690831515021790555083600060016101000a81548160ff021916908360ff1602179055508260018190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600381600019169055505b50505050505b6101e7806100eb6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806337af7327146100675780634aa2762e146100b9578063bc109174146100e7578063d2a174e51461010d578063fab261f414610137575bfe5b341561006f57fe5b610077610163565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c157fe5b6100c9610189565b60405180826000191660001916815260200191505060405180910390f35b34156100ef57fe5b6100f761018f565b6040518082815260200191505060405180910390f35b341561011557fe5b61011d610195565b604051808215151515815260200191505060405180910390f35b341561013f57fe5b6101476101a8565b604051808260ff1660ff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b60015481565b600060009054906101000a900460ff1681565b600060019054906101000a900460ff16815600a165627a7a72305820ff945b9d7a6ff1e878bec54db295bb00226acfa2fb89419a3f9798c76963b16500291ba08aecbf204ffac9c31638c4cf508c5a83600fb755b869235aefe0708f460f8126a043b5fb3bd40cc632fa8f274e4bc5503c72a34b6349344b2d1b48b45055a3e110'

{
  let {txData, signature} = unsign(rawTx)
  console.log('txData:',    txData,    "\n")
  console.log('signature:', signature, "\n")
}
```

__output__:

```javascript
txData: {
  nonce:    '0x01',
  gasPrice: '0x06fc23ac00',
  gasLimit: '0x100000',
  to:       '0x0000000000000000000000000000000000000000',
  data:     '0x6060604052341561000c57fe5b60405160a0806102d2833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b84600060006101000a81548160ff02191690831515021790555083600060016101000a81548160ff021916908360ff1602179055508260018190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600381600019169055505b50505050505b6101e7806100eb6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806337af7327146100675780634aa2762e146100b9578063bc109174146100e7578063d2a174e51461010d578063fab261f414610137575bfe5b341561006f57fe5b610077610163565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c157fe5b6100c9610189565b60405180826000191660001916815260200191505060405180910390f35b34156100ef57fe5b6100f761018f565b6040518082815260200191505060405180910390f35b341561011557fe5b61011d610195565b604051808215151515815260200191505060405180910390f35b341561013f57fe5b6101476101a8565b604051808260ff1660ff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b60015481565b600060009054906101000a900460ff1681565b600060019054906101000a900460ff16815600a165627a7a72305820ff945b9d7a6ff1e878bec54db295bb00226acfa2fb89419a3f9798c76963b1650029',
  chainId:  0
}

signature: {
  v: '1b',
  r: '8aecbf204ffac9c31638c4cf508c5a83600fb755b869235aefe0708f460f8126',
  s: '43b5fb3bd40cc632fa8f274e4bc5503c72a34b6349344b2d1b48b45055a3e110'
}
```

- - - -

#### Credits (mostly) Belong To:

* [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx)
* [ethereumjs-util](https://github.com/ethereumjs/ethereumjs-util)
