import CompletedWork from "#models/completed_work"
import TypeKp from "#models/type_kp"
import db from "@adonisjs/lucid/services/db"

export default class DashboardService {
  static async getSubstationsTypeKp() {
    const typesKp = await TypeKp.query().withCount('substations')
    const typesKpSerialize = typesKp.map(({ id, name, $extras: { substations_count } }) => ({
      id, name, numberSubstations: substations_count
    }))

    return typesKpSerialize
  }
  static async getCompletedWorksYear() {
    const completedWorks = await CompletedWork.query()
      .select(db.raw("strftime('%Y', date_completion) as year"))
      .count('* as total')
      .groupBy('year')
      .orderBy('year', 'asc')

    const result = completedWorks.map(work => ({
      year: work.$extras.year,
      workCount: work.$extras.total
    }))

    return result
  }
}
