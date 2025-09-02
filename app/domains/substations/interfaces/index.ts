export interface ICSVSubstationKeyRow {
  id: string
  keyDefectSubstation: string
}

export interface IResultParseCSVSubstationKey {
  id: number
  keyDefectSubstation: number | null
}

export interface IErrorParseCSVSubstationKey {
  status?: number
  row: number
  message: string
}

export interface IProcessCSVFile {
  validRows: IResultParseCSVSubstationKey[]
  errors: IErrorParseCSVSubstationKey[]
}
