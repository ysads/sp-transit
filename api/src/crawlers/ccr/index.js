const { getBuffer, queryLinks } = require('../../utils/page-query')
const { PdfReader } = require('pdfreader')

const OperatorData = {
  VIA_4: {
    base: 'http://www.viaquatro.com.br',
    links: 'http://www.viaquatro.com.br/linha-4-amarela/passageiros-transportados',
    selectors: '.list-press-download-media a'
  },
  VIA_MOBI: {
    base: 'https://www.viamobilidade.com.br',
    links: 'https://www.viamobilidade.com.br/linhas/passageiros-transportados',
    selectors: '.list-group-item-action'
  }
}

const Operator = {
  VIA_4: 'VIA_4',
  VIA_MOBI: 'VIA_MOBI'
}

const fullUrl = (operator, path) => `${OperatorData[operator].base}${path}`

const getReferenceDate = (header) => {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const strDate = header.split(' - ')[1]
  const [strMonth, year] = strDate.split(' ')

  return new Date(year, months.indexOf(strMonth), 1)
}

const newStopRidership = (name, total) => ({
  name: name.replace(/[¹²³⁴]/, ''),
  total: parseInt(total) * 1e3
})

const getRidershipLinksOf = async (operator) => {
  return queryLinks(
    OperatorData[operator].links,
    OperatorData[operator].selectors
  )
}

const readFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const content = []

    new PdfReader().parseBuffer(buffer, function (err, pdfData) {
      if (err) {
        reject(err)
      } else if (!pdfData) {
        resolve(content)
      } else if (pdfData.text) {
        content.push(pdfData.text)
      }
    })
  })
}

const parseRiderships = (operator, contents) => {
  const strContents = contents.join(' ')
  const index = contents.indexOf('Entradas')
  const isWorkday = Boolean(strContents.indexOf('úteis'))
  const date = getReferenceDate(contents[0])
  const line = operator === Operator.VIA_4 ? 4 : 5
  const stops = []

  for (let i = index + 1; contents[i] !== 'TOTAL'; i += 2) {
    stops.push({
      ...newStopRidership(contents[i], contents[i + 1]),
      date,
      isWorkday,
      isMonthTotal: true,
      line
    })
  }

  return stops
}

(async function () {
  const operator = Operator.VIA_MOBI
  const links = await getRidershipLinksOf(operator)
  const buffer = await getBuffer(fullUrl(operator, links[0]))
  const contents = await readFromBuffer(buffer)
  const stops = parseRiderships(operator, contents)

  console.log(stops)
})()
