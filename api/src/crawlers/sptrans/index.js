const parser = require('./parsers')
const { getBuffer, queryLinks } = require('../../utils/page-query')

const SHEETS = {
  2021: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/transportes/institucional/sptrans/acesso_a_informacao/agenda/index.php?p=306932',
  2020: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/transportes/institucional/sptrans/acesso_a_informacao/index.php?p=292723',
  2019: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/transportes/institucional/sptrans/acesso_a_informacao/index.php?p=269652'
}

const getRidershipLinksOf = async (year) => {
  const path = SHEETS[String(year)]

  return queryLinks(path, '.calend_esq a, .calend_dir a')
}

(async function () {
  const links = await getRidershipLinksOf(2021)

  const showRidershipOf = async (line) => {
    console.log('========', line, '========')

    for (let i = 0; i < 10; i++) {
      const buffer = await getBuffer(links[i])
      const allRiderships = parser.parseFromBuffer(buffer)
      const ridership = allRiderships.find(c => c.lineCode === line)

      console.log(ridership
        ? {
            lineCode: ridership.lineCode,
            date: new Date(ridership.date).toDateString(),
            total: ridership.total
          }
        : {}
      )
    }
  }

  await showRidershipOf('620010')
  await showRidershipOf('640010')
})()
