/**
 * Copyright (c) 2020 Jihwan Oh
 * 
 * stolen from fureweb's PublicGoogleSheetsParser which as a package is not deno compatble (https in custom fetch.js)
 * https://www.npmjs.com/package/public-google-sheets-parser
 */


export default class Pgsp {
  constructor (spreadsheetId, sheetName) {
    this.id = spreadsheetId
    this.sheetName = sheetName
  }
  
  getSpreadsheetDataUsingFetch () {
    if (!this.id) return null
    let url = `https://docs.google.com/spreadsheets/d/${this.id}/gviz/tq?`
    if (this.sheetName) url = url.concat(`sheet=${this.sheetName}`)

    return fetch(url)
    .then((r) => r && r.ok && r.text ? r.text() : null)
    .catch((_) => null)
  }

  normalizeRow (rows) {
    return rows.map((row) => (row && (row.v !== null && row.v !== undefined)) ? row : {})
  }

  applyHeaderIntoRows (header, rows) {
    return rows
    .map(({ c: row }) => this.normalizeRow(row))
    .map((row) => row.reduce((p, c, i) => c.v ? Object.assign(p, { [header[i]]: c.v }) : p, {}))
  }

  getItems (spreadsheetResponse) {
    let rows = []

    try {
      const parsedJSON = JSON.parse(spreadsheetResponse.split('\n')[1].replace(/google.visualization.Query.setResponse\(|\);/g, ''))
      const hasSomeLabelPropertyInCols = parsedJSON.table.cols.some(({ label }) => !!label)
      if (hasSomeLabelPropertyInCols) {
        const header = parsedJSON.table.cols.map(({ label }) => label)

        rows = this.applyHeaderIntoRows(header, parsedJSON.table.rows)
      } else {
        const [headerRow, ...originalRows] = parsedJSON.table.rows
        const header = this.normalizeRow(headerRow.c).map((row) => row.v)

        rows = this.applyHeaderIntoRows(header, originalRows)
      }
    } catch (e) {}

    return rows
  }

  async parse (spreadsheetId, sheetName) {
    if (spreadsheetId) this.id = spreadsheetId
    if (sheetName) this.sheetName = sheetName

    if (!this.id) throw new Error('SpreadsheetId is required.')

    const spreadsheetResponse = await this.getSpreadsheetDataUsingFetch()

    if (spreadsheetResponse === null) return []

    return this.getItems(spreadsheetResponse)
  }
}