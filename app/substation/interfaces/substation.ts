export interface CreateSubstation {
  userId: number
  active?: boolean
  districtId: number
  voltageClassesId: number
  objectTypeId: number
  name: string
  nameSearch: string
  rdu?: boolean
}

export interface UpdateSubstation {
  active?: boolean
  districtId?: number
  voltageClassesId?: number
  objectTypeId?: number
  name?: string
  nameSearch?: string
  rdu?: boolean
}

export interface UpdateNoteSubstation {
  note?: string | null
}

export interface KeyDefectSubstation {
  keyDefectSubstation?: number | null
}
