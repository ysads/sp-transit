const xlsxFromBuffer = require('../../../utils/xlsx')
const Parser1 = require('./parser-1')

const allParsers = [
  Parser1
]

const parseFromBuffer = (buffer) => {
  const rows = xlsxFromBuffer(buffer)
  const parser = allParsers.find(parser => parser.canParse(rows))

  return rows.map(row => parser.getRidership(row))
}

module.exports = { parseFromBuffer }
