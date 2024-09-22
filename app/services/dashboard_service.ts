import TypeKp from "#models/type_kp"

export default class DashboardService {
  static async getSubstationsTypeKp() {
    const typesKp = await TypeKp.query().withCount('substations')
    const typesKpSerialize = typesKp.map(({ id, name, $extras: { substations_count } }) => ({
      id, name, numberSubstations: substations_count
    }))

    return typesKpSerialize
  }
}
