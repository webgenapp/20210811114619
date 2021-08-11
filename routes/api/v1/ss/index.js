const express = require('express')
const router = express.Router()
const { S } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const ss = await S.findAll()

  res.send(ss)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const s = await S.findOne({ where: { id } })

  res.send(s)
})

router.post('/', auth, async function (req, res, next) {
  const s = await S.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(s)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await S.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const s = await S.findOne({ where: { id } })

  s.s = req.body.s

  s.save()

  res.send(s)
})

module.exports = router
