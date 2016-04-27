export function handler ({ payload, request }, done) {
  const { record: { id, apiName }, priorState, changeSet } = payload
  const wasNameChanged = 'first_name' in changeSet || 'last_name' in changeSet
  if (!wasNameChanged) return done(null, 'No name change')

  const { first_name, last_name } = { ...priorState, ...changeSet }
  const name = `${first_name} ${last_name}`.trim() || 'Unnamed Contact'

  console.log(`Changing from "${priorState.name}" to "${name}" with post to /v1/records/${apiName}/${id}.`)

  return request({
    method: 'PATCH',
    path: `/v1/records/${apiName}/${id}`,
    body: { name }
  }, done)
}
