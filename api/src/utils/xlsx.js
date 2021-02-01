const XLSX = require('xlsx')

const encodeCell = (r, c) => {
  return XLSX.utils.encode_cell({ r: r, c: c })
}

const deleteRow = (ws, rowIndex) => {
  const range = XLSX.utils.decode_range(ws['!ref'])

  for (let R = rowIndex; R < range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      ws[encodeCell(R, C)] = ws[encodeCell(R+1, C)]
    }
  }

  range.e.r--
  ws['!ref'] = XLSX.utils.encode_range(range.s, range.e)
}

const xlsxFromBuffer = (buffer) => {
  const workbook = XLSX.read(buffer, { cellDates: true, type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  deleteRow(sheet, 0)
  deleteRow(sheet, 1)

  return XLSX.utils.sheet_to_json(sheet).map(r => Object.values(r))
}

module.exports = xlsxFromBuffer
