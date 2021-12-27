export const getVersion = async (request, reply) => {
  return reply.send({ version: '1.2.3' })
}
