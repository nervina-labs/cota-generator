import axios from 'axios'
import CKB from '@nervosnetwork/ckb-sdk-core'
import { CKB_NODE_RPC, CKB_NODE_INDEXER } from '../utils/config'
import { FEE } from '../constants/'
import { toCamelcase } from '../utils/util'

const ckb = new CKB(CKB_NODE_RPC)

export const getCells = async (lock: CKBComponents.Script, type?: CKBComponents.Script): Promise<IndexerCell[]> => {
  const filter = type
      ? {
          script: {
            code_hash: type.codeHash,
            hash_type: type.hashType,
            args: type.args,
          },
        }
      : {
          script: null,
          output_data_len_range: ['0x0', '0x1'],
        }
    let payload = {
      id: 1,
      jsonrpc: '2.0',
      method: 'get_cells',
      params: [
        {
          script: {
            code_hash: lock.codeHash,
            hash_type: lock.hashType,
            args: lock.args,
          },
          script_type: 'lock',
          filter,
        },
        'asc',
        '0x64',
      ],
    }
    const body = JSON.stringify(payload, null, '  ')
    let response = (
      await axios({
        method: 'post',
        url: CKB_NODE_INDEXER,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 20000,
        data: body,
      })
    ).data
    if (response.error) {
      console.error(response.error)
      throw Error('Get cells error')
    } else {
      console.log(JSON.stringify(response))
      return toCamelcase(response.result.objects)
    }
}

export const collectInputs = (liveCells: IndexerCell[], needCapacity: bigint) => {
  let inputs: CKBComponents.CellInput[] = []
  let sum = BigInt(0)
  for (let cell of liveCells) {
    inputs.push({
      previousOutput: {
        txHash: cell.outPoint.txHash,
        index: cell.outPoint.index,
      },
      since: '0x0',
    })
    sum = sum + BigInt(cell.output.capacity)
    if (sum >= needCapacity + FEE) {
      break
    }
  }
  if (sum < needCapacity + FEE) {
    throw Error('Capacity not enough')
  }
  return { inputs, capacity: sum }
}

export const getLiveCell = async outPoint => {
  const { cell } = await ckb.rpc.getLiveCell(outPoint, true)
  return cell
}
