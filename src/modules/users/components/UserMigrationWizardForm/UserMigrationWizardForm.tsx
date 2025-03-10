import { Button, createStyles, SimpleGrid, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconSignature } from '@tabler/icons'
import { UserWizardData } from './types'
import { useUserMigrationWizardFormAPI } from './useUserMigrationWizardFormAPI'
import { useUserMigrationWizardFormLogic } from './useUserMigrationWizardFormLogic'

interface UserMigrationWizardFormProps {
  user: UserWizardData
}

export const UserMigrationWizardForm: React.FC<
  UserMigrationWizardFormProps
> = ({ user }) => {
  const { form, onSubmit } = useUserMigrationWizardFormLogic(
    useUserMigrationWizardFormAPI({ user })
  )
  const { classes } = useUserMigrationWizardFormStyles()
  const { formState, register, handleSubmit, getValues, setValue } = form
  const { errors, isSubmitting } = formState

  console.log(formState.errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
      >
        <TextInput
          error={errors?.firstName?.message}
          label="Fornavn"
          {...register('firstName')}
        />
        <TextInput
          error={errors?.nickname?.message}
          label="Kallenavn"
          {...register('nickname')}
        />

        <TextInput
          error={errors?.lastName?.message}
          label="Etternavn"
          {...register('lastName')}
        />
        <TextInput
          label="Hjemby"
          error={errors?.homeTown?.message}
          {...register('homeTown')}
        />
        <TextInput
          label="Adresse"
          error={errors?.studyAddress?.message}
          {...register('studyAddress')}
        />
        <TextInput
          label="Studie"
          error={errors?.study?.message}
          {...register('study')}
        />
        <DatePicker
          label="Fødselsdato"
          placeholder="Velg en dato"
          error={errors?.dateOfBirth?.message}
          defaultValue={getValues('dateOfBirth')}
          onChange={date => date && setValue('dateOfBirth', new Date(date))}
          allowFreeInput
        />
        <TextInput
          label="Telefon"
          error={errors?.phone?.message}
          {...register('phone')}
        />
        <TextInput
          label="Kortnummer"
          description="Nummeret på det hvite kortet ditt"
          error={errors?.cardUuid?.message}
          {...register('cardUuid')}
        />
        <div></div>
        <Button type="submit" color="samfundet-red" loading={isSubmitting}>
          Lagre informasjon
        </Button>
      </SimpleGrid>
    </form>
  )
}

const useUserMigrationWizardFormStyles = createStyles(theme => ({
  container: {},
  title: {},
}))
