import { useQuery } from '@apollo/client'
import { Button, Indicator } from '@mantine/core'
import { Link, LinkProps } from 'react-router-dom'
import { PNEDING_QUOTES_QUERY } from '../queries'
import { PendingQuotesReturns } from '../types.graphql'

export const PendingQuotesButton: React.FC<LinkProps> = ({ ...rest }) => {
  const { data } = useQuery<PendingQuotesReturns>(PNEDING_QUOTES_QUERY, {
    fetchPolicy: 'network-only',
  })

  const pendingCount = data?.pendingQuotes?.length ?? 0

  return (
    <Link {...rest} style={{ overflow: 'visible' }}>
      <Indicator label={pendingCount} showZero={false} size={20} zIndex={1}>
        <Button variant="outline">Innsendt</Button>
      </Indicator>
    </Link>
  )
}
