export type TDatasetsCreateWork = {
  testData: number
  expectedProperties: string[]
  payload: {
    substationId: number
    description: string
    workProducerId: number
    typeWorkId: number
    dateCompletion: string
    note?: string
    inControl?: boolean
  }
}
