import { useQuery } from '@apollo/client'
import { ActionIcon, Group, Stack } from '@mantine/core'
import { IconEdit, IconX } from '@tabler/icons'
import { FullPage404, FullPageError } from 'components/FullPageComponents'
import { FullContentLoader } from 'components/Loading'
import { PermissionGate } from 'components/PermissionGate'
import { format } from 'date-fns'
import { useState } from 'react'
import { useParams } from 'react-router'
import { PERMISSIONS } from 'util/permissions'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { Summary } from '../components/Summary'
import { SummaryForm } from '../components/SummaryForm'
import {
  SummaryDetailQueryVariables,
  SummaryDetailsQueryReturns,
} from '../index'
import { SUMMARY_QUERY } from '../queries'

interface SummaryDetailParams {
  summaryId: string
}

export const SummaryDetail = () => {
  const params = useParams<keyof SummaryDetailParams>() as SummaryDetailParams
  const [editMode, setEditMode] = useState(false)

  const breadcrumbItems = [
    { label: 'Hjem', path: '/dashboard' },
    { label: 'Referater', path: '/summaries' },
  ]

  const { error, loading, data } = useQuery<
    SummaryDetailsQueryReturns,
    SummaryDetailQueryVariables
  >(SUMMARY_QUERY, {
    variables: { id: params.summaryId },
  })

  if (error) return <FullPageError />

  if (loading || !data) return <FullContentLoader />

  const { summary } = data

  if (summary === null) return <FullPage404 />

  breadcrumbItems.push({
    label: `${format(new Date(summary.date), 'yyyy.MM.dd')} - ${
      summary.displayName
    }`,
    path: `/summaries/${params.summaryId}`,
  })

  return (
    <Stack>
      <Breadcrumbs items={breadcrumbItems} />
      <Group position={'right'}>
        <PermissionGate permissions={PERMISSIONS.summaries.change.summary}>
          <ActionIcon onClick={() => setEditMode(!editMode)}>
            {!editMode ? <IconEdit color={'gray'} /> : <IconX color={'gray'} />}
          </ActionIcon>
        </PermissionGate>
      </Group>

      {editMode ? (
        <SummaryForm
          summary={summary}
          onCompletedCallback={() => setEditMode(false)}
        />
      ) : (
        <Summary summary={summary} />
      )}
    </Stack>
  )
}
