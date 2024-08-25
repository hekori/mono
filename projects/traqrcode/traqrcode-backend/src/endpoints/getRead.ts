import {API_CODE, GetReadResponseError, GetReadResponseOk, to} from '@hekori/traqrcode-common'
import { pg } from '../database/pg'

export const getRead = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const [err, pageItem] = await to(
    pg('pageItem').where({ pageItemUuid: request.params.pageItemUuid }).first()
  )

  if (!pageItem) {
    const responseData: GetReadResponseError = {
      status: 'ERROR',
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  const responseData: GetReadResponseOk = {
    status: 'OK',
    pageItem
  }
  return reply.send(responseData)

}
