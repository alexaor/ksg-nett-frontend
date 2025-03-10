import { useQuery } from '@apollo/client'
import { Group, SimpleGrid, Stack, Title } from '@mantine/core'
import { FullPageError } from 'components/FullPageComponents'
import { FullContentLoader } from 'components/Loading'
import styled from 'styled-components'
import { QuoteCard } from '../components'
import { QuotesTabs } from '../components/QuotesTabs'
import { POPULAR_QUOTES_QUERY } from '../queries'
import { PopularQuotesReturns } from '../types.graphql'

const AllTimeContainer = styled.div`
  grid-area: all-time;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const PopularQuotes: React.VFC = () => {
  const { data, loading, error } =
    useQuery<PopularQuotesReturns>(POPULAR_QUOTES_QUERY)

  if (error) return <FullPageError />

  if (loading || !data) return <FullContentLoader />

  const {
    popularQuotesAllTime,
    popularQuotesCurrentSemester,
    currentSemesterShorthand,
  } = data

  return (
    <Stack>
      <Group position="apart">
        <Title order={2} color="dimmed">
          Populære sitater
        </Title>
        <QuotesTabs />
      </Group>
      <Stack>
        <Title order={3}>{currentSemesterShorthand}</Title>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 'lg', cols: 2, spacing: 'md' },
            { maxWidth: 'sm', cols: 1, spacing: 'sm' },
          ]}
        >
          {popularQuotesCurrentSemester.map(quote => (
            <QuoteCard quote={quote} key={quote.id} />
          ))}
        </SimpleGrid>
      </Stack>
      <AllTimeContainer>
        <Title order={3}>Siden tidenes morgen</Title>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 'lg', cols: 2, spacing: 'md' },
            { maxWidth: 'sm', cols: 1, spacing: 'sm' },
          ]}
        >
          {popularQuotesAllTime.map(quote => (
            <QuoteCard quote={quote} key={quote.id} displaySemester />
          ))}
        </SimpleGrid>
      </AllTimeContainer>
    </Stack>
  )
}
