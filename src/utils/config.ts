import dotenv from 'dotenv'
dotenv.config()
const REGISTRY_PRIVATE_KEY =
  process.env.REGISTRY_PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const SENDER_COTA_PRIVATE_KEY =
  process.env.SENDER_COTA_PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const RECEIVER_COTA_PRIVATE_KEY =
  process.env.RECEIVER_COTA_PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const ALICE_COTA_PRIVATE_KEY =
  process.env.ALICE_COTA_PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const BOB_COTA_PRIVATE_KEY =
  process.env.BOB_COTA_PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const SENDER_ADDRESS = process.env.SENDER_ADDRESS || 'ckteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const RECEIVER_ADDRESS =
  process.env.RECEIVER_ADDRESS || 'ckteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const ALICE_ADDRESS = process.env.ALICE_ADDRESS || 'ckteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const BOB_ADDRESS = process.env.BOB_ADDRESS || 'ckteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const CKB_NODE_RPC = process.env.CKB_NODE_RPC || 'http://localhost:8114'
const CKB_NODE_INDEXER = process.env.CKB_NODE_INDEXER || 'http://localhost:8116'
const REGISTRY_AGGREGATOR_RPC = process.env.REGISTRY_AGGREGATOR_RPC || 'http://localhost:3030'
const COTA_AGGREGATOR_RPC = process.env.COTA_AGGREGATOR_RPC || 'http://localhost:3030'

export {
  REGISTRY_PRIVATE_KEY,
  SENDER_COTA_PRIVATE_KEY,
  RECEIVER_COTA_PRIVATE_KEY,
  ALICE_COTA_PRIVATE_KEY,
  BOB_COTA_PRIVATE_KEY,
  SENDER_ADDRESS,
  RECEIVER_ADDRESS,
  ALICE_ADDRESS,
  BOB_ADDRESS,
  CKB_NODE_RPC,
  CKB_NODE_INDEXER,
  REGISTRY_AGGREGATOR_RPC,
  COTA_AGGREGATOR_RPC,
}
