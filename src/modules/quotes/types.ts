import { UserNode } from 'modules/users'
import { RelayEdgesWithPageInfo } from 'types/graphql'

export interface QuoteNode {
  id: string
  text: string
  reportedBy: UserNode
  tagged: Pick<UserNode, 'id' | 'profilePicture' | 'initials'>[]
  verifiedBy: UserNode | null
  context: string
  sum: number
  semester: `${'H' | 'V'}${number}`
}

/* ==== QUERY TYPING === */
export interface ApprovedQuotesReturns {
  approvedQuotes: RelayEdgesWithPageInfo<QuoteNode>
}

export interface ApprovedQuotesVariables {
  q: string
}

export interface PendingQuotesReturns {
  pendingQuotes: QuoteNode[]
}
