import CKB from '@nervosnetwork/ckb-sdk-core'
import { addressToScript, scriptToHash, serializeScript } from '@nervosnetwork/ckb-sdk-utils'
import { secp256k1Dep } from '../../account'
import { generateClaimCotaSmt } from '../../aggregator/cota'
import { ClaimReq } from '../../aggregator/types'
import { getLiveCell } from '../../collector'
import { FEE, CotaTypeDep } from '../../constants'
import { CKB_NODE_RPC, RECEIVER_COTA_PRIVATE_KEY, SENDER_ADDRESS, RECEIVER_ADDRESS, SENDER_COTA_PRIVATE_KEY, BOB_ADDRESS, BOB_COTA_PRIVATE_KEY, ALICE_COTA_PRIVATE_KEY, ALICE_ADDRESS } from '../../utils/config'
import { append0x, u32ToBe } from '../../utils/hex'

const ckb = new CKB(CKB_NODE_RPC)

const batchClaims = new Array(50).fill(0).map((_, index) => {
  return {
    cotaId: '0xc7801a1d8ff707d2076b85de002160cf92ec7b65',
    tokenIndex: append0x(u32ToBe(50 + index)),
  }
})

const claims = [
  {
    cotaId: '4c520ed47063fef801c33a4516190980c80f2179',
    tokenIndex: '0x00000000',
  },
]

export const claimCotaNFT = async (
  cotaOutPoint: CKBComponents.OutPoint,
  withdrawalOutPoint: CKBComponents.OutPoint,
) => {
  const inputs = [
    {
      previousOutput: cotaOutPoint,
      since: '0x0',
    },
  ]

  const cotaCell = await getLiveCell(cotaOutPoint)
  const outputs = [cotaCell.output]
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  const withdrawalLockHash = scriptToHash(addressToScript(SENDER_ADDRESS))

  const claimReq: ClaimReq = {
    lockScript: serializeScript(addressToScript(RECEIVER_ADDRESS)),
    withdrawalLockHash,
    claims: batchClaims,
  }

  const { smtRootHash, claimSmtEntry } = await generateClaimCotaSmt(claimReq)
  const outputsData = [`0x00${smtRootHash}`]

  const withdrawalCellDep: CKBComponents.CellDep = { outPoint: withdrawalOutPoint, depType: 'code' }
  const cellDeps = [withdrawalCellDep, await secp256k1Dep(), CotaTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses: [],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) =>
    i > 0 ? '0x' : { lock: '', inputType: `0x04${claimSmtEntry}`, outputType: '' },
  )
  const signedTx = ckb.signTransaction(RECEIVER_COTA_PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  let txHash = await ckb.rpc.sendTransaction(signedTx, 'passthrough')
  console.info(`Claim cota nft from mint tx has been sent with tx hash ${txHash}`)
}
