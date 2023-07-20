import gql from 'graphql-tag'
import { apolloClient } from '/@/plugins/apollo'
import { Nation } from '/@/stores/vehicle'
import { useRepo } from 'pinia-orm'
import { cloneDeep } from 'lodash'

const NationsList = gql`
  query NationsList($lang: String) {
    nations(lang: $lang) {
      name
      title
      color
      icons {
        small
      }
    }
  }
`

export const loadNationsList = (): void => {
  const repo = useRepo(Nation)
  apolloClient
    .query({
      query: NationsList,
      variables: { lang: navigator.language }
    })
    .then((res) => {
      repo.save(cloneDeep(res.data.nations))
    })
    .catch(() => null)
}
