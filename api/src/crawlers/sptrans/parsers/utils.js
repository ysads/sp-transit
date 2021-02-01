module.exports = {
  lineCodes: (rawLine) => {
    const code = rawLine.split(' - ')[0]

    return {
      lineCode: code,
      lineBase: code.substring(0, code.length - 2),
      lineBranch: code.substring(code.length - 2)
    }
  },

  terminals: (rawLine) => {
    const terminals = rawLine.split(' - ')[1].split('/')

    return {
      terminalP: terminals[0],
      terminalS: terminals[1]
    }
  }
}