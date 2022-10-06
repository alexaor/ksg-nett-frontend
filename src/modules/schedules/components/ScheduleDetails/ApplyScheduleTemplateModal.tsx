import { gql, useMutation } from '@apollo/client'
import { Button, Group, Modal, NumberInput, Text } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { add } from 'date-fns'
import { NORMALIZED_SHIFTS_FROM_RANGE_QUERY } from 'modules/schedules/queries'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'util/date-fns'
import { ScheduleTemplateSelect } from '../ScheduleTemplateSelect'

const TEMP_GENERATE = gql`
  mutation Generate($scheduleId: ID!, $startDate: Date!, $numberOfWeeks: Int!) {
    generate(
      scheduleTemplateId: $scheduleId
      startDate: $startDate
      numberOfWeeks: $numberOfWeeks
    ) {
      shiftsCreated
    }
  }
`

function getMondayOfWeekFromDate(date: Date) {
  date = new Date(date)
  const first = date.getDate() - date.getDay() + 1

  const monday = new Date(date.setDate(first))
  return monday
}

function getSundayOfWeekFromDate(date: Date) {
  date = new Date(date)

  const first = date.getDate() - date.getDay() + 1
  const last = first + 6

  const sunday = new Date(date.setDate(last))

  return sunday
}

function useShiftMutations() {
  const [generate, { loading }] = useMutation(TEMP_GENERATE)

  return { generate, loading }
}

interface ApplyScheduleTemplateModalProps {
  isOpen: boolean
  onCloseCallback: () => void
}

export const ApplyScheduleTemplateModal: React.FC<
  ApplyScheduleTemplateModalProps
> = ({ isOpen, onCloseCallback }) => {
  const { generate, loading } = useShiftMutations()
  const [scheduleTemplateId, setScheduleTemplateId] = useState('')
  const [numberOfWeeks, setNumberOfWeeks] = useState(1)
  const [shiftsFrom, setShiftsFrom] = useState<Date | null>(new Date())

  function handleGenerate() {
    if (!shiftsFrom) return
    generate({
      variables: {
        scheduleId: scheduleTemplateId,
        startDate: format(shiftsFrom, 'yyyy-MM-dd'),
        numberOfWeeks: numberOfWeeks,
      },
      refetchQueries: [NORMALIZED_SHIFTS_FROM_RANGE_QUERY],
      onCompleted: () => {
        toast.success('Generated shifts')
        onCloseCallback()
      },
      onError: err => {
        toast.error(err.message)
      },
    })
  }

  console.log(shiftsFrom)

  return (
    <Modal
      opened={isOpen}
      onClose={onCloseCallback}
      title="Generer vaktplan fra mal"
    >
      <ScheduleTemplateSelect
        value={scheduleTemplateId}
        onChange={setScheduleTemplateId}
      />
      <DatePicker
        label="Startdato"
        value={shiftsFrom}
        onChange={setShiftsFrom}
      />
      <NumberInput
        label="Antall uker"
        value={numberOfWeeks}
        onChange={val => val && setNumberOfWeeks(val)}
      />

      <Text>
        Første vakt genererert fra{' '}
        {shiftsFrom &&
          format(getMondayOfWeekFromDate(shiftsFrom), 'EEEE dd.MMM')}
      </Text>
      <Text>
        Siste vakt generert til{' '}
        {shiftsFrom &&
          format(
            getSundayOfWeekFromDate(add(shiftsFrom, { weeks: numberOfWeeks })),
            'EEE dd.MMM'
          )}
      </Text>
      <Group my="md" position="right">
        <Button color={'gray'} onClick={onCloseCallback}>
          Avbryt
        </Button>
        <Button disabled={loading} loading={loading} onClick={handleGenerate}>
          Generer
        </Button>
      </Group>
    </Modal>
  )
}
