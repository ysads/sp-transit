const utils = require('./utils')

module.exports = {
  canParse: (rows) => {
    return rows[0].length === 16
  },

  getRidership: (row) => {
    return {
      payCash: row[5],
      pay____: row[7],
      payStudent: row[8],
      payStudentMonth: row[9],
      payVtCommon: row[6],
      payVtMonth: row[10],
      payTotal: row[11],
      freeIntBusBus: row[12],
      freeTotal: row[13],
      freeStudent: row[14],
      total: row[15],
      date: row[0],
      ...utils.lineCodes(row[4]),
      ...utils.terminals(row[4])
    }
  }
}