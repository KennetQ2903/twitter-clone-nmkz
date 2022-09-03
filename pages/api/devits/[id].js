import { fireStore } from 'FirebaseSR/admin'
export default (req, res) => {
  const { query } = req
  const { id } = query
  fireStore
    .collection('devits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const { id } = doc
      const { createdAt } = data
      res.json({
        ...data,
        id,
        createdAt: +createdAt.toDate()
      })
    }).catch(err => {
      console.error(err)
      res.status(404).end()
    })
}
