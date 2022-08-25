import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Menu, Modal, Table } from '@mantine/core'
import { PermissionGate } from 'components/PermissionGate'
import { useApplicantMutations } from 'modules/admissions/mutations.hooks'
import { parseApplicantPriorityInternalGroupPosition } from 'modules/admissions/parsing'
import { CoreApplicantNode } from 'modules/admissions/types.graphql'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ApplicantStatusBadge } from '../ApplicantStatusBadge'
import { DeleteApplicantModal } from './DeleteApplicantModal'

export const ApplicantsTable: React.FC<{
  applicants: CoreApplicantNode[]
}> = ({ applicants }) => {
  const history = useHistory()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [applicantToDelete, setApplicantToDelete] =
    useState<CoreApplicantNode | null>(null)

  const handleMoreInfo = (applicantId: string) => {
    history.push(`/admissions/applicants/${applicantId}`)
  }

  const { deleteApplicant } = useApplicantMutations()

  async function handleDeleteApplicant() {
    if (applicantToDelete === null) return
    return deleteApplicant({
      variables: {
        id: applicantToDelete.id,
      },
      refetchQueries: ['CurrentApplicantsQuery'],
    })
  }

  const rows = applicants.map(applicant => (
    <tr key={applicant.id}>
      <td>{applicant.fullName}</td>
      <td>{applicant.email}</td>
      <td>
        <ApplicantStatusBadge applicantStatus={applicant.status} />
      </td>
      <td>
        {parseApplicantPriorityInternalGroupPosition(applicant.priorities[0])}
      </td>
      <td>
        {parseApplicantPriorityInternalGroupPosition(applicant.priorities[1])}
      </td>
      <td>
        {parseApplicantPriorityInternalGroupPosition(applicant.priorities[2])}
      </td>

      <td>
        <Menu position="left-start">
          <Menu.Target>
            <Button variant="outline">
              <FontAwesomeIcon icon="ellipsis-h" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Valg</Menu.Label>
            <Menu.Item
              icon={<FontAwesomeIcon icon="eye" />}
              onClick={() => handleMoreInfo(applicant.id)}
            >
              Mer info
            </Menu.Item>

            <PermissionGate permissions={'admissions.delete_applicant'}>
              <Menu.Label>Admin</Menu.Label>
              <Menu.Item
                icon={<FontAwesomeIcon icon="trash" />}
                color="red"
                onClick={() => {
                  setApplicantToDelete(applicant)
                  setDeleteModalOpen(true)
                }}
              >
                Slett søker
              </Menu.Item>
            </PermissionGate>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ))

  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Epost</th>
            <th>Status</th>
            <th>Prio 1</th>
            <th>Prio 2</th>
            <th>Prio 3</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Slett søker"
      >
        <DeleteApplicantModal
          applicant={applicantToDelete}
          deleteApplicantCallback={handleDeleteApplicant}
          closeModalCallback={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </Card>
  )
}
