import gql from 'graphql-tag';
import {apolloClient} from '/@/plugins/apollo';
import { VehicleType } from '../stores/vehicle';
import { useRepo } from 'pinia-orm';
import { cloneDeep } from 'lodash';

const VehicleTypesList = gql`
  query VehicleTypes($lang: String) {
    vehicleTypes(lang: $lang) {
      name
      title
      titleShort
      icons {
        default
      }
    }
  }
`;

export const loadVehicleTypesList = () => {
  const repo = useRepo(VehicleType);
  apolloClient
    .query({
      query: VehicleTypesList,
      variables: { lang: navigator.language || '' },
    })
    .then((res) => {
      repo.save(cloneDeep(res.data.vehicleTypes));
    })
    .catch(() => null);
};
