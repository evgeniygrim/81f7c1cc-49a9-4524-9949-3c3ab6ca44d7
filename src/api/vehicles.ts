import gql from 'graphql-tag'
import { apolloClient } from '../plugins/apollo'
import { useRepo } from 'pinia-orm'
import { Vehicle } from '../stores/vehicle'
import { cloneDeep } from 'lodash/fp'

const GetAllVehicles = gql`
  query GetAllVehicles($lang: String) {
    vehicles(lang: $lang) {
      id
      title
      description
      icons {
        large
        medium
      }
      level
      typeName
      type {
        name
        title
        icons {
          default
        }
      }
      nationName
      nation {
        name
        title
        color
        icons {
          small
          medium
        }
      }
    }
  }
`

export const loadVehicles = (): void => {
  const repo = useRepo(Vehicle)
  apolloClient
    .query({
      query: GetAllVehicles,
      variables: { lang: navigator.language }
    })
    .then((res) => {
      repo.save(cloneDeep(res.data.vehicles))
    })
    .catch(() => null)
}
