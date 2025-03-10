import { useMutation, useQuery } from '@apollo/client'
import { Button, Group, Stack, Title } from '@mantine/core'
import { IconClock } from '@tabler/icons'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { FullPageError } from 'components/FullPageComponents'
import { FullContentLoader } from 'components/Loading'
import { PermissionGate } from 'components/PermissionGate'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { PatchMutationVariables } from 'types/graphql'
import { PERMISSIONS } from 'util/permissions'
import {
  InternalGroupsNav,
  MyUpcomingInterviews,
} from '../components/AdmissionDashboard'
import { AdmissionsShortcutPanel } from '../components/AdmissionDashboard/AdmissionsShortcutPanel'
import { AdmissionStatusValues } from '../consts'
import { PATCH_ADMISSION } from '../mutations'
import {
  ACTIVE_ADMISSION_QUERY,
  ALL_INTERNAL_GROUP_APPLICANT_DATA,
} from '../queries'
import {
  ActiveAdmissioneturns,
  PatchAdmissionInput,
  PatchAdmissionReturns,
} from '../types.graphql'

const breadcrumbsItems = [
  { label: 'Hjem', path: '/dashboard' },
  { label: 'Opptak', path: '/admissions' },
]

export const AdmissionDashboard: React.FC = () => {
  const { data, loading, error } = useQuery<ActiveAdmissioneturns>(
    ACTIVE_ADMISSION_QUERY,
    {
      fetchPolicy: 'network-only',
    }
  )

  const [admissionNextPhase, { loading: nextPhaseLoading }] = useMutation<
    PatchAdmissionReturns,
    PatchMutationVariables<PatchAdmissionInput>
  >(PATCH_ADMISSION)

  if (error) return <FullPageError />

  if (loading || !data) return <FullContentLoader />

  const handleAdmissionNextPhase = (admissionId: string) => {
    toast.promise(
      admissionNextPhase({
        variables: {
          id: admissionId,
          input: { status: AdmissionStatusValues.IN_SESSION },
        },
        refetchQueries: [ALL_INTERNAL_GROUP_APPLICANT_DATA],
      }),
      {
        error: 'Noe gikk galt',
        loading: 'Avslutter intervjuperioden',
        success: 'Intervjuperiode stengt!',
      }
    )
  }

  const { activeAdmission } = data

  if (activeAdmission === null || activeAdmission.status === 'CONFIGURATION')
    return <Navigate to="/admissions/configure" />

  if (activeAdmission.status === 'IN_SESSION') {
    return <Navigate to="/admissions/discussion-dashboard" />
  }

  if (activeAdmission.status === 'LOCKED') {
    return <Navigate to="/admissions/close" />
  }

  return (
    <Stack>
      <Breadcrumbs items={breadcrumbsItems} />
      <Group position="apart">
        <Title>Kontrollpanel opptak</Title>
        <PermissionGate permissions={PERMISSIONS.admissions.change.admission}>
          <Button
            leftIcon={<IconClock />}
            disabled={nextPhaseLoading}
            color="samfundet-red"
            onClick={() => {
              handleAdmissionNextPhase(activeAdmission.id)
            }}
          >
            Intervjuperioden er over
          </Button>
        </PermissionGate>
      </Group>
      <AdmissionsShortcutPanel />
      <InternalGroupsNav />
      <MyUpcomingInterviews />
    </Stack>
  )
}
