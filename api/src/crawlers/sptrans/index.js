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
  const buffer = await getBuffer(links[0])

  console.log(parser.parseFromBuffer(buffer))
})()
