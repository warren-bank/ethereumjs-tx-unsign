'use strict'

const rlp = require('./lib/rlp')  // {decode, toBuffer, isHexPrefixed, stripHexPrefix, padToEven, intToBuffer, safeParseInt, bufferToHex}

const fields = ["nonce","gasPrice","gasLimit","to","value","data"]

const format_fields = function(rawData, to_hex, add_prefix) {
  let txData = {}

  fields.forEach((field, index) => {
    if (rawData[index] !== undefined) {
      txData[field] = to_hex ? rlp.bufferToHex(rawData[index], add_prefix) : rawData[index]
    }
  })

  return txData
}

// ===
// API
// ===
const unsign = function(rawTx, to_hex=true, add_prefix=true) {
  let rawData
  if (typeof rawTx === 'string') {
    rawTx = Buffer.from(rlp.stripHexPrefix(rawTx), 'hex')
  }
  if (Buffer.isBuffer(rawTx)) {
    rawData = rlp.decode(rawTx)
  }

  if (rawData === undefined)          throw new Error('TypeError: raw transaction must be either a Buffer or hex-encoded String value')
  if (! Array.isArray(rawData))       throw new Error('TypeError: raw transaction is not RLP encoded')
  if (rawData.length < fields.length) throw new Error('FormatError: RLP encoded raw transaction contains too few data fields')

  for (let i=0; i<rawData.length; i++) {
    rawData[i] = rlp.toBuffer(rawData[i])
  }

  let txData  = format_fields(rawData, to_hex, add_prefix)
  return txData
}

module.exports = unsign
