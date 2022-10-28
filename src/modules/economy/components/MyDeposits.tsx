import { Paper, Table } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons'
import { format } from 'util/date-fns'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DepositNode } from '../types.graphql'
import { CardTable } from 'components/CardTable'

const DepositCell = styled.td`
  user-select: none;
`
interface MyDepositsProps {
  deposits: DepositNode[]
}

export const MyDeposits: React.VFC<MyDepositsProps> = ({ deposits }) => {
  const rows = deposits.map(deposit => (
    <tr key={deposit.id}>
      <DepositCell>
        {format(new Date(deposit.createdAt), 'yy.MM.dd')}
      </DepositCell>
      <DepositCell>{deposit.amount}</DepositCell>
      <DepositCell>{deposit.approved ? '✅' : '❌'}</DepositCell>
    </tr>
  ))
  return (
    <CardTable>
      <thead>
        <tr>
          <th>Dato</th>
          <th>Mengde</th>
          <th>Godkjent</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </CardTable>
  )
}
