import path from "path";

export type AnyFilter = '*'
export const AnyFilter: AnyFilter = '*';

export const AnyVehicleLevel = {value: AnyFilter, title: 'I-X Все уровни'};
export const AnyNation = {name: AnyFilter, title: 'Все нации', icons: {
  default: '/@/assets/nation.png',
  small: '/@/assets/nation.png'
}};
export const AnyVehicleType = {name: AnyFilter, title: 'Все типы', icons: {
  default:'/@/assets/vehicle-type.png'
}};
