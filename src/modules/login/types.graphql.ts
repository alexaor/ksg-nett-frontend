import { UserNode } from 'modules/users/types'

export interface LoginMutationVariables {
  username: String
  password: String
}

export interface LoginMutationReturns {
  login: {
    ok: boolean
    token: string | null
    user: UserNode | null
  }
}

export interface IsLoggedInQueryReturns {
  isLoggedIn: boolean
}
