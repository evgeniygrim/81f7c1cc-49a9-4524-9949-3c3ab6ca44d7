import { Model } from 'pinia-orm';

export interface VehicleTypeIcons{
  default?: string,
  special?: string,
  normal?: string,
  elite?: string,
  premium?: string,
}

export class VehicleType extends Model {
  static entity = '[VehicleType]'
  static primaryKey = 'name';

  static fields() {
    return {
      name: this.string(''),
      title: this.string(null),
      titleShort: this.string(null),
      icons: this.attr({}),
    };
  }

  declare name: string;
  declare title: string;
  declare titleShort: string;
  declare icons: VehicleTypeIcons;
}
