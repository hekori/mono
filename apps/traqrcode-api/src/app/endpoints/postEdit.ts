import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import {
  API_CODE,
  MAX_QR_SUBTITLE_LENGTH,
  MAX_QR_TITLE_LENGTH,
  PageEditErrors,
  PageItemInitializer,
  PageWorkerInitializer,
  PostEditRequest,
  PostResponseBase,
  PostResponseError,
  to,
  User,
  UserInitializer,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'

export const postEdit = async (request, reply) => {
  console.log('body', request.body)
  console.log('query', request.query)
  console.log('params', request.params)
  console.log('headers', request.headers)
  console.log('headers.authorization', request.headers?.authorization)

  const body = request.body as PostEditRequest
  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  if (!decoded) {
    const responseData: PageEditErrors & PostResponseBase = {
      count: 1,
      field: {},
      status: API_CODE.ERROR,
      global: [API_CODE.ERROR_INVALID_ACCESS_TOKEN],
    }
    return reply.status(422).send(responseData)
  }

  const { userUuid } = decoded

  const page = await pg('page')
    .where({ createdBy: userUuid, pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')
    .first()

  if (!page) {
    const responseData: PageEditErrors & PostResponseBase = {
      count: 1,
      field: {},
      status: API_CODE.ERROR,
      global: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  // input validation
  let inputValidationErrors: PageEditErrors = {
    count: 0,
    field: {},
    global: [],
  }

  // process pageItems

  // process pageWorkers

  // check that there is at least one worker
  if (body.emails.length === 0) {
    inputValidationErrors = {
      ...inputValidationErrors,
      count: inputValidationErrors.count + 1,
      global: [
        ...inputValidationErrors.global,
        API_CODE.ERROR_EMPTY_WORKER_LIST,
      ],
    }
  }

  // check that all workers have a valid email address
  for (const email of body.emails) {
    if (!email.includes('@')) {
      inputValidationErrors.count += 1
      inputValidationErrors.field[email] = [API_CODE.ERROR_INVALID_EMAIL]
    }
  }

  // check that all pageItems are valid
  for (const pageItemUuid of body.pageItemUuids) {
    const pageItem = body.uuidToPageItem[pageItemUuid]
    console.log('pageItem', pageItem)

    if (pageItem.title.length === 0) {
      inputValidationErrors.count += 1
      inputValidationErrors.field[`${pageItemUuid}---title`] = [
        API_CODE.ERROR_EMPTY_TITLE,
      ]
    }
    if (pageItem.title.length > MAX_QR_TITLE_LENGTH) {
      inputValidationErrors.count += 1
      inputValidationErrors.field[`${pageItemUuid}---title`] = [
        API_CODE.ERROR_TITLE_TOO_LONG,
      ]
    }

    if (pageItem.subTitle.length > MAX_QR_SUBTITLE_LENGTH) {
      inputValidationErrors.count += 1
      inputValidationErrors.field[`${pageItemUuid}---subTitle`] = [
        API_CODE.ERROR_SUBTITLE_TOO_LONG,
      ]
    }
  }
  if (body.pageItemUuids.length === 0) {
    inputValidationErrors.count += 1
    inputValidationErrors.global = [
      ...inputValidationErrors.global,
      API_CODE.ERROR_EMPTY_ITEMS_LIST,
    ]
  }

  if (inputValidationErrors.count > 0) {
    return reply.status(422).send({
      ...inputValidationErrors,
      status: API_CODE.ERROR,
    } as PageEditErrors & PostResponseBase)
  }

  // update
  await pg('page')
    .where({ createdBy: userUuid, pageUuid: request.params.pageUuid })
    .update({ title: body.title })

  // PageItems
  // insert or update
  for (const pageItemUuid of body.pageItemUuids) {
    // https://dev.to/vvo/upserts-in-knex-js-1h4o
    await pg('pageItem')
      .insert({
        pageUuid: page.pageUuid,
        pageItemUuid,
        title: body.uuidToPageItem[pageItemUuid].title,
        subTitle: body.uuidToPageItem[pageItemUuid].subTitle,
      } as PageItemInitializer)
      .onConflict('pageItemUuid')
      .merge()
      .returning('*')
  }
  // delete others
  await pg('pageItem')
    .where({ pageUuid: page.pageUuid })
    .whereNotIn('pageItemUuid', body.pageItemUuids)
    .delete()

  const userUuids = []
  for (const email of body.emails) {
    // https://dev.to/vvo/upserts-in-knex-js-1h4o

    // create user account if necessary
    const users = await pg<User>('user')
      .insert({
        email,
      })
      .onConflict('email')
      .merge()
      .returning('*')

    const user = users[0]
    userUuids.push(user.userUuid)

    // create pageWorker if necessary
    await to(
      pg('pageWorker').insert({
        pageUuid: page.pageUuid,
        userUuid: user.userUuid,
      } as PageWorkerInitializer)
    )
  }

  // delete others
  await pg('pageWorker')
    .where({ pageUuid: page.pageUuid })
    .whereNotIn('userUuid', userUuids)
    .delete()

  // const responseData: PageEditErrors & PostResponseBase = {
  //   count: 1,
  //   idToItem: {},
  //   idToWorker: {},
  //   status: API_CODE.ERROR,
  //   global: [API_CODE.ERROR_INVALID_EMAIL],
  // }
  // return reply.send(responseData)

  const responseData: PostResponseBase = {
    status: API_CODE.OK,
  }
  return reply.send(responseData)
}
