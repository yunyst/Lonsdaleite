let db = uniCloud.database({
  throwOnNotFound: false
})
exports.main = async (event, context) => {

  if (event.api === 'publish') {
    return await db.collection('message').add({
      content: event.content,
    })
  }
  if (event.api === 'getMessage') {
    return await db.collection('message').get()
  }
  return event
};