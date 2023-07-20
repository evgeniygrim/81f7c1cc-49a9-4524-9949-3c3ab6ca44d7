import { Model, type ModelFields } from 'pinia-orm'
import { Nation } from './Nation'
import { VehicleType } from './VehicleType'

export interface VehicleIcons {
  large?: string
  small?: string
  default?: string
  medium?: string
  contourAlive?: string
  contour?: string
  contourDead?: string
  localSmall?: string
}

export class Vehicle extends Model {
  static entity = '[Vehicle]'

  static primaryKey = 'id'

  static fields (): ModelFields {
    return {
      id: this.string(null),
      title: this.string(null),
      titleShort: this.string(null),
      description: this.string(null),
      icons: this.attr({}),
      level: this.number(0),
      nationName: this.string(''),
      nation: this.hasOne(Nation, 'name', 'nationName'),
      typeName: this.string(''),
      type: this.hasOne(VehicleType, 'name', 'typeName')
    }
  }

  declare id: string
  declare title: string
  declare titleShort: string
  declare description: string
  declare icons: VehicleIcons
  declare level: number
  declare nationName: Nation['name']
  declare nation: Nation
  declare typeName: VehicleType['name']
  declare type: VehicleType
}
