const { parse } = require('node-html-parser')
const fetch = require('node-fetch')

module.exports = {
  getBuffer: async (link) => {
    const response = await fetch(link)
    return response.buffer()
  },

  queryLinks: async (path, selector) => {
    const response = await fetch(path)
    const pageContent = await response.text()
    const root = parse(pageContent)
    const nodes = root.querySelectorAll(selector)

    return nodes.map(n => n.attributes.href)
  }
}
