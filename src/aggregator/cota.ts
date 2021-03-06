import axios from 'axios'
import { COTA_AGGREGATOR_RPC } from '../utils/config'
import { toCamelcase, toSnakeCase } from '../utils/util'
import {
  ClaimReq,
  ClaimResp,
  DefineReq,
  DefineResp,
  MintReq,
  MintResp,
  SmtReq,
  SmtResp,
  TransferReq,
  TransferResp,
  UpdateReq,
  UpdateResp,
  WithdrawalReq,
  WithdrawalResp,
  ClaimUpdateReq,
  ClaimUpdateResp,
  TransferUpdateReq,
  TransferUpdateResp,
} from './types'

export const generateCotaSmt = async (method: string, req: SmtReq): Promise<SmtResp> => {
  let payload = {
    id: 1,
    jsonrpc: '2.0',
    method,
    params: toSnakeCase(req),
  }
  const body = JSON.stringify(payload, null, '')
  try {
    let response = (
      await axios({
        method: 'post',
        url: COTA_AGGREGATOR_RPC,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
        data: body,
      })
    ).data
    if (response.error) {
      console.error('aggreagtor response error', response.error)
    } else {
      // console.log(JSON.stringify(response))
      return toCamelcase(response.result)
    }
  } catch (error) {
    console.error('aggreagtor request error', error)
  }
}

export const generateDefineCotaSmt = async (define: DefineReq): Promise<DefineResp> => {
  return (await generateCotaSmt('generate_define_cota_smt', define)) as Promise<DefineResp>
}

export const generateMintCotaSmt = async (mint: MintReq): Promise<MintResp> => {
  return (await generateCotaSmt('generate_mint_cota_smt', mint)) as Promise<MintResp>
}

export const generateWithdrawalCotaSmt = async (withdrawal: WithdrawalReq): Promise<WithdrawalResp> => {
  return (await generateCotaSmt('generate_withdrawal_cota_smt', withdrawal)) as Promise<WithdrawalResp>
}

export const generateClaimCotaSmt = async (claim: ClaimReq): Promise<ClaimResp> => {
  return (await generateCotaSmt('generate_claim_cota_smt', claim)) as Promise<ClaimResp>
}

export const generateTransferCotaSmt = async (transfer: TransferReq): Promise<TransferResp> => {
  return (await generateCotaSmt('generate_transfer_cota_smt', transfer)) as Promise<TransferResp>
}

export const generateUpdateCotaSmt = async (update: UpdateReq): Promise<UpdateResp> => {
  return (await generateCotaSmt('generate_update_cota_smt', update)) as Promise<UpdateResp>
}

export const generateClaimUpdateCotaSmt = async (claim: ClaimUpdateReq): Promise<ClaimUpdateResp> => {
  return (await generateCotaSmt('generate_claim_update_cota_smt', claim)) as Promise<ClaimUpdateResp>
}

export const generateTransferUpdateCotaSmt = async (transfer: TransferUpdateReq): Promise<TransferUpdateResp> => {
  return (await generateCotaSmt('generate_transfer_update_cota_smt', transfer)) as Promise<TransferUpdateResp>
}
