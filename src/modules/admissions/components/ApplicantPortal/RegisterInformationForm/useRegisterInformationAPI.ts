import { format } from 'date-fns'
import { ApplicantStatusValues } from 'modules/admissions/consts'
import { useApplicantMutations } from 'modules/admissions/mutations.hooks'
import { GET_APPLICATION_FROM_TOKEN } from 'modules/admissions/queries'
import { ApplicantNode } from 'modules/admissions/types.graphql'
import { RegisterInformationFormData } from './useRegisterInformationLogic'

interface UseRegisterInformationAPIInput {
  applicant: ApplicantNode
  nextStepCallback: () => void
}

export function useRegisterInformationAPI({
  applicant,
  nextStepCallback,
}: UseRegisterInformationAPIInput) {
  const { patchApplicant } = useApplicantMutations()

  async function handleSubmit(data: RegisterInformationFormData) {
    const { id } = applicant
    const input = {
      ...data,
      image: data.image,
      dateOfBirth: format(new Date(data.dateOfBirth), 'yyyy-MM-dd'),
      status: ApplicantStatusValues.HAS_REGISTERED_PROFILE,
      lastActivity: new Date(),
    }

    return patchApplicant({
      variables: {
        id: id,
        input: input,
      },
      refetchQueries: [GET_APPLICATION_FROM_TOKEN],
    })
  }

  const defaultValues = {
    firstName: applicant?.firstName ?? '',
    lastName: applicant?.lastName ?? '',
    address: applicant?.address ?? '',
    hometown: applicant?.hometown ?? '',
    study: applicant?.study ?? '',
    dateOfBirth: new Date(),
    phone: applicant?.phone ?? '',
    wantsDigitalInterview: applicant?.wantsDigitalInterview ?? false,
  }
  return {
    defaultValues,
    nextStepCallback,
    onSubmit: handleSubmit,
  }
}
