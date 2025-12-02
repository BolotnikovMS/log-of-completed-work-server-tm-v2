export interface CSVSubstationKeyRow {
  id: string
  keyDefectSubstation: string
}

export interface ResultParseCSVSubstationKey {
  id: number
  keyDefectSubstation: number | null
}

export interface ErrorParseCSVSubstationKey {
  status?: number
  row: number
  message: string
}

export interface ProcessCSVFile {
  validRows: ResultParseCSVSubstationKey[]
  errors: ErrorParseCSVSubstationKey[]
}
