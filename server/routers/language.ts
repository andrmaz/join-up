import {publicProcedure, router} from '../trpc'

import {Language} from 'app/types/constants'
import {SelectOptionsType} from 'app/types/form'

const languages: SelectOptionsType<Language>[] = [
  {id: 1, label: Language.English},
  {id: 2, label: Language.Italian},
  {id: 3, label: Language.Spanish},
  {id: 4, label: Language.French},
]

export const languageRouter = router({
  list: publicProcedure.query(async () => {
    return {languages}
  }),
})
