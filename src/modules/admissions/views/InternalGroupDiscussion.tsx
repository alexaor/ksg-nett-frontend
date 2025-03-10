import { useQuery } from '@apollo/client'
import { Group, Paper, Stack, Text, Title } from '@mantine/core'
import { BackButton } from 'components/BackButton'
import { FullPageError } from 'components/FullPageComponents'
import { FullContentLoader } from 'components/Loading'
import { MessageBox } from 'components/MessageBox'
import { SynCButton } from 'components/SyncButton'
import { useParams } from 'react-router-dom'
import {
  DiscussApplicantsTable,
  FreeForAllApplicantsTable,
} from '../components/DiscussionDashboard'
import { INTERNAL_GROUP_DISCUSSION_DATA } from '../queries'
import { InternalGroupDiscussionDataReturns } from '../types.graphql'

interface InternalGroupDiscussionParams {
  internalGroupId: string
}

export const InternalGroupDiscussion: React.FC = () => {
  const { internalGroupId } = useParams<
    keyof InternalGroupDiscussionParams
  >() as InternalGroupDiscussionParams

  const { error, loading, data, refetch } =
    useQuery<InternalGroupDiscussionDataReturns>(
      INTERNAL_GROUP_DISCUSSION_DATA,
      {
        variables: { internalGroupId: internalGroupId },
        pollInterval: 20_000,
        fetchPolicy: 'network-only',
      }
    )

  if (error) return <FullPageError />

  if (loading || !data) return <FullContentLoader />

  const {
    internalGroupDiscussionData: {
      applicants,
      internalGroup,
      applicantsOpenForOtherPositions,
    },
  } = data

  return (
    <Stack>
      <BackButton to="/admissions" />
      <Group position="apart">
        <Title>Fordelingsmøte {internalGroup.name}</Title>
        <SynCButton
          refetchCallback={() => refetch()}
          refetchLoading={loading}
        />
      </Group>
      <Title order={2}>Kandidater tilgjengelige for vurdering</Title>
      <MessageBox type="info">
        Søkere blir fortløpende oppdatert i denne tabellen. Her har du mulighet
        til å se hvordan de andre gjengene, og deres egen gjeng prioriterer
        kandidaten. På høyre side av tabellen finnes en meny som markerer hva
        deres gjeng vil gjøre med kandidaten. Bare søkere som er markert med{' '}
        <b>Vil ha</b> eller <b>Reserve</b> kommer videre med i systemet. Alle
        kandidater må bli vurdert før fordelingsmøtet kan stenges.
      </MessageBox>
      <MessageBox type="warning">
        <Text weight="bold">
          Obs! Du markerer ønsker på vegne av {internalGroup.name}
        </Text>
      </MessageBox>
      <DiscussApplicantsTable
        internalGroup={internalGroup}
        applicants={applicants}
      />

      <Title order={2}>Kandidater åpne for andre verv</Title>
      <FreeForAllApplicantsTable
        applicants={applicantsOpenForOtherPositions}
        internalGroupId={internalGroupId}
      />
    </Stack>
  )
}
