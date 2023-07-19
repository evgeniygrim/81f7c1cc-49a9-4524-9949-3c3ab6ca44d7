import { defineStore } from 'pinia';
import { Vehicle, Nation, VehicleType } from '/@/stores/vehicle';
import { useRepo } from 'pinia-orm';
import { AnyFilter } from '/@/const/vehicles';
import { loadVehicles } from '/@/api/vehicles';

export interface VehicleFilters {
  level: Vehicle['level'] | AnyFilter;
  nation: Nation['name'] | AnyFilter;
  type: VehicleType['name'] | AnyFilter;
}

const vehicleRepo = useRepo(Vehicle);

export const useVehicleFilters = defineStore('VehicleFilters', {
  state: () =>
    ({
      level: AnyFilter,
      nation: AnyFilter,
      type: AnyFilter,
    } as VehicleFilters),
  getters: {
    ids: (state) => {
      const { level, nation, type } = state;

      const vehicle = vehicleRepo
        .where((vehicle: Vehicle) => {
          return (
            (vehicle.level == level || level == AnyFilter) &&
            (vehicle.nationName == nation || nation == AnyFilter) &&
            (vehicle.typeName == type || type == AnyFilter)
          );
        })
        .get();

      return (vehicle || []).map(({ id }) => ({ id }));
    },
  },
  actions: {
    loadVehicles() {
      loadVehicles()
    }
  }
});
