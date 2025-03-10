import { Button, Group, Stack, Textarea, Title } from '@mantine/core'
import { IconFileUpload, IconPlane } from '@tabler/icons'
import { MessageBox } from 'components/MessageBox'
import { useApplicantMutations } from 'modules/admissions/mutations.hooks'
import { CURRENT_APPLICANTS_QUERY } from 'modules/admissions/queries'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { UploadAdmissionCSVModal } from './UploadAdmissionCSVModal'

export const AddApplicantsArea: React.FC = () => {
  const [emails, setEmails] = useState('')
  const [open, setOpen] = useState(false)

  const { createApplicants, createApplicantsLoading } = useApplicantMutations()

  const handleCreateApplicants = () => {
    const parsedEmails = emails
      .split('\n')
      .filter(emailString => emailString !== '')
      .map(emailString => emailString.trim())

    toast.promise(
      createApplicants({
        variables: { emails: parsedEmails },
        refetchQueries: [CURRENT_APPLICANTS_QUERY],
      }),
      {
        loading: 'Oppretter søknader',
        error: 'Noe gikk galt',
        success: 'søknader opprettet',
      }
    )
    setEmails('')
  }
  return (
    <Stack>
      <Title mt="md" order={2}>
        Legg til søkere
      </Title>
      <MessageBox type="info">
        Her kan du legge inn søkere sin epost. Hver epost på hver sin linje.
      </MessageBox>
      <Textarea
        minRows={12}
        placeholder="søker1@epost.com&#10;søker2@epost.com&#10;..."
        value={emails}
        onChange={e => setEmails(e.target.value)}
      />
      <Group>
        <Button
          color="samfundet-red"
          leftIcon={<IconPlane />}
          onClick={handleCreateApplicants}
          disabled={createApplicantsLoading}
        >
          Legg til søkere
        </Button>
        <Button
          color="samfundet-red"
          leftIcon={<IconFileUpload />}
          onClick={() => setOpen(true)}
        >
          Last opp fil
        </Button>
        <UploadAdmissionCSVModal opened={open} onClose={() => setOpen(false)} />
      </Group>
    </Stack>
  )
}
