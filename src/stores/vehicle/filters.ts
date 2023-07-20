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

const initial: VehicleFilters = {
  level: AnyFilter,
  nation: AnyFilter,
  type: AnyFilter,
}

export const useVehicleQuery = defineStore('VehicleQuery', {
  state: () => initial,
  getters: {
    ids: (state) => {
      const { level, nation, type } = state;

      const vehicles = vehicleRepo
        .where((vehicle: Vehicle) => {
          return (
            (vehicle.level == level || level == AnyFilter) &&
            (vehicle.nationName == nation || nation == AnyFilter) &&
            (vehicle.typeName == type || type == AnyFilter)
          );
        })
        .get();

      return (vehicles || []).map(({ id }) => ({ id }));
    },
  },
  actions: {
    loadVehicles() {
      loadVehicles()
    }
  }
});
