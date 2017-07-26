'use strict'

const rlp = require('./lib/rlp')  // {decode, toBuffer, isHexPrefixed, stripHexPrefix, padToEven, intToBuffer, safeParseInt, bufferToHex}

const field_sets = {
  params:    ["nonce","gasPrice","gasLimit","to","value","data"],
  signature: ["v","r","s"]
}

const format_fields = function(fields, rawData, to_hex, add_prefix) {
  let txData = {}

  fields.forEach((field, index) => {
    if (rawData[index] && rawData[index].length) {
      txData[field] = to_hex ? rlp.bufferToHex(rawData[index], add_prefix) : rawData[index]
    }
  })

  return txData
}

// ===
// API
// ===
const unsign = function(rawTx, to_hex=true, add_prefix_txData=true, add_prefix_signature=false) {
  let rawData
  if (typeof rawTx === 'string') {
    rawTx = Buffer.from(rlp.stripHexPrefix(rawTx), 'hex')
  }
  if (Buffer.isBuffer(rawTx)) {
    rawData = rlp.decode(rawTx)
  }

  if (rawData === undefined)
    throw new Error('TypeError: raw transaction must be either a Buffer or hex-encoded String value')
  if (! Array.isArray(rawData))
    throw new Error('TypeError: raw transaction is not RLP encoded')
  if (rawData.length < (field_sets.params.length + field_sets.signature.length))
    throw new Error('FormatError: RLP encoded raw transaction contains too few data fields')

  for (let i=0; i<rawData.length; i++) {
    rawData[i] = rlp.toBuffer(rawData[i])
  }

  let txData    = format_fields(field_sets.params,    rawData.slice(0, field_sets.params.length), to_hex, add_prefix_txData)
  let signature = format_fields(field_sets.signature, rawData.slice(field_sets.params.length),    to_hex, add_prefix_signature)

  let v_hex   = to_hex ? (add_prefix_signature ? rlp.stripHexPrefix(signature.v) : signature.v) : rlp.bufferToHex(signature.v, false)
  let v_int   = parseInt(v_hex, 16)
  let chainId = Math.floor((v_int - 35) / 2)
  if (chainId < 0) chainId = 0
  txData['chainId'] = chainId

  return {txData, signature}
}

module.exports = unsign
