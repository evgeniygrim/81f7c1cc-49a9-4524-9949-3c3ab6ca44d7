import { Model } from 'pinia-orm';

export interface NationIcon {
  default?: string,
  tiny?: string,
  small?: string,
  medium?: string,
  large?: string,
}

export class Nation extends Model {
  static entity = '[Nation]'
  static primaryKey = 'name';

  static fields() {
    return {
      name: this.attr(''),
      title: this.string(null),
      color: this.string(null),
      icons: this.attr({}),
    }
  }

  declare name: string;
  declare title: string;
  declare color: string;
  declare icons: NationIcon; 
}