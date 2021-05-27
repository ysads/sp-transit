const xlsxFromBuffer = require('../../../utils/xlsx')
const parser1 = require('./parser-1')

const allParsers = [
  parser1
]

const parseFromBuffer = (buffer) => {
  const rows = xlsxFromBuffer(buffer)
  const parser = allParsers.find(parser => parser.canParse(rows))

  return rows.map(row => parser.getRidership(row))
}

module.exports = { parseFromBuffer }
