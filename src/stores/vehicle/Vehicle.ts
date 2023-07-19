import { Model } from 'pinia-orm';
import { Nation } from './Nation';
import { VehicleType } from './VehicleType';

export interface IconsVehicle {
  large?: string,
  small?: string,
  default?: string,
  medium?: string,
  contourAlive?: string,
  contour?: string,
  contourDead?: string,
  localSmall?: string,
}

export class Vehicle extends Model {
  static entity = '[Vehicle]';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.string(null),
      title : this.string(null),
      titleShort : this.string(null),
      description : this.string(null),
      icons : this.attr({}),
      level : this.number(0),
      nationName : this.attr(''),
      nation : this.hasOne(Nation, 'name', 'nationName'),
      typeName : this.attr(''),
      type : this.hasOne(VehicleType, 'name', 'typeName' ),
    }
  };

  declare id: string
  declare title: string
  declare titleShort: string
  declare description: string
  declare icons: IconsVehicle
  declare level: number
  declare nation: Nation
  declare nationName: string
  declare typeName: string
  declare type: VehicleType
}