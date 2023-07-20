import { Model, type ModelFields } from 'pinia-orm'

export interface NationIcons {
  default?: string
  tiny?: string
  small?: string
  medium?: string
  large?: string
}

export class Nation extends Model {
  static entity = '[Nation]'
  static primaryKey = 'name'

  static fields (): ModelFields {
    return {
      name: this.string(''),
      title: this.string(null),
      color: this.string(null),
      icons: this.attr({})
    }
  }

  declare name: string
  declare title: string
  declare color: string
  declare icons: NationIcons
}
