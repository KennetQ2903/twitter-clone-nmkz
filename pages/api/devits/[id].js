import { fireStore } from 'FirebaseSR/admin'
export default (req, res) => {
  const { query } = req
  const { id } = query
  fireStore
    .collection('devits')
    .doc(id)
    .get()
    .then(doc => {
      res.json(doc.data())
    }).catch(err => {
      console.error(err)
      res.status(404).end()
    })
}
