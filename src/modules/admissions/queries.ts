import { gql } from 'graphql-tag'

export const ACTIVE_ADMISSION_QUERY = gql`
  query ActiveAdmission {
    activeAdmission {
      id
      status
      availableInternalGroupPositionsData {
        availablePositions
        internalGroupPosition {
          id
          name
        }
      }
    }
  }
`

export const INTERVIEW_SCHEDULE_TEMPLATE = gql`
  query InterviewScheduleTemplateQuery {
    interviewScheduleTemplate {
      id
      interviewPeriodStartDate
      defaultInterviewDayStart
      interviewPeriodEndDate
      defaultInterviewDayEnd
      defaultInterviewDuration
      defaultBlockSize
      defaultPauseDuration
    }
  }
`

export const ALL_INTERVIEW_SCHEDULE_TEMPLATES_QUERY = gql`
  query AllInterviewScheduleTemplates {
    allInterviewScheduleTemplates {
      id
      interviewPeriodStartData
      interviewPeriodEndDate
      defaultInterviewDuration
      defaultBlockSize
      defaultPauseDuration
    }
  }
`

export const ALL_INTERVIEW_LOCATIONS_QUERY = gql`
  query AllInterviewLocations {
    allInterviewLocations {
      id
      name
      availability {
        id
        datetimeFrom
        datetimeTo
      }
    }
  }
`

export const INTERVIEW_CONFIG_QUERY = gql`
  query InterviewConfigQuery {
    allInterviewScheduleTemplates {
      id
      interviewPeriodStartDate
      defaultInterviewDayStart
      interviewPeriodEndDate
      defaultInterviewDayEnd
      defaultInterviewDuration
      defaultBlockSize
      defaultPauseDuration
    }
    allInterviewLocations {
      id
      name
      availability {
        id
        datetimeFrom
        datetimeTo
      }
    }
  }
`

export const INTERVIEW_OVERVIEW_QUERY = gql`
  query InterviewOverviewQuery {
    interviewOverview {
      admissionId
      interviewCount
      interviewDayGroupings {
        date
        locations {
          name
          interviews {
            id
            interviewStart
            interviewEnd
          }
        }
      }
    }
    interviewScheduleTemplate {
      id
      interviewPeriodStartDate
      defaultInterviewDayStart
      interviewPeriodEndDate
      defaultInterviewDayEnd
      defaultInterviewDuration
      defaultBlockSize
      defaultPauseDuration
    }
  }
`

// RENAME TO DETAIL QUERY
export const APPLICANT_QUERY = gql`
  query ApplicantQuery($id: ID!) {
    applicant(id: $id) {
      id
      email
      status
      firstName
      lastName
      fullName
      image
      phone
      study
      hometown
      dateOfBirth
      address
      canCommitThreeSemesters
      openForOtherPositions
      wantsDigitalInterview
      priorities {
        internalGroupPosition {
          id
          name
        }
      }
      comments {
        id
        user {
          id
          fullName
          initials
          profileImage
        }
        text
        createdAt
      }
      interview {
        id
        interviewStart
        notes
        discussion
        totalEvaluation
        location {
          id
          name
          locationDescription
        }
        booleanEvaluationAnswers {
          id
          statement {
            statement
          }
          value
        }
        additionalEvaluationAnswers {
          id
          answer
          statement {
            id
            statement
          }
        }
        interviewers {
          id
          initials
          profileImage
          fullName
        }
      }
    }
  }
`

export const INTERNAL_GROUPS_ACCEPTING_APPLICANTS = gql`
  query InternalGroupsAcceptingApplicantsQuery {
    internalGroupsAcceptingApplicants {
      id
      name
    }
  }
`

export const INTERVIEW_DETAIL_QUERY = gql`
  query Interview($id: ID!) {
    interview(id: $id) {
      id
      notes
      discussion
      applicant {
        id
        fullName
        canCommitThreeSemesters
        openForOtherPositions
        priorities {
          id
          internalGroupPosition {
            id
            name
          }
        }
      }
      booleanEvaluationAnswers {
        id
        statement {
          statement
        }
        value
      }
      additionalEvaluationAnswers {
        id
        statement {
          statement
        }
        answer
      }
    }
  }
`

// RENAME TO MATCH QUERY NAME
export const VALID_APPLICANTS_QUERY = gql`
  query CloseAdmissionQueryData {
    closeAdmissionData {
      activeAdmission {
        id
        status
      }
      applicantInterests {
        id
        applicant {
          id
          fullName
        }
        internalGroup {
          id
          name
        }
        positionToBeOffered {
          id
          name
        }
      }
      validApplicants {
        id
        fullName
        status
        willBeAdmitted
        priorities {
          id
          applicantPriority
          internalGroupPriority
          internalGroupPosition {
            name
            id
            internalGroup {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const CURRENT_APPLICANTS_QUERY = gql`
  query CurrentApplicantsQuery {
    currentApplicants {
      id
      fullName
      email
      status
      priorities {
        id
        internalGroupPosition {
          name
          id
        }
      }
    }
  }
`

const INTERNAL_GROUP_PRIORITY_FIELDS = gql`
  fragment InternalGroupPriorityFields on InternalGroupPositionPriorityNode {
    id
    applicant {
      id
      fullName
      interview {
        id
        interviewers {
          id
          fullName
          profileImage
        }
      }
    }
    internalGroupPriority
    applicantPriority
    internalGroupPosition {
      internalGroup {
        id
        name
      }
    }
  }
`
export const ALL_INTERNAL_GROUP_APPLICANT_DATA = gql`
  query AllInternalGroupApplicantData {
    allInternalGroupApplicantData {
      positionsToFill
      currentProgress
      internalGroup {
        id
        name
      }
    }
  }
`

export const INTERNAL_GROUP_DISCUSSION_DATA = gql`
  ${INTERNAL_GROUP_PRIORITY_FIELDS}
  query InternalGroupDiscussionDataQuery($internalGroupId: ID!) {
    internalGroupDiscussionData(internalGroupId: $internalGroupId) {
      internalGroup {
        id
        name
      }
      applicantsOpenForOtherPositions {
        id
        fullName
        priorities {
          ...InternalGroupPriorityFields
        }
        internalGroupInterests {
          id
          internalGroup {
            id
            name
          }
        }
      }

      applicants {
        id
        fullName
        priorities {
          id
          internalGroupPriority
          internalGroupPosition {
            id
            name
            internalGroup {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const INTERVIEWS_AVAILABLE_FOR_BOOKING_QUERY = gql`
  query InterviewsAvailableForBookingQuery($dayOffset: Int!) {
    interviewsAvailableForBooking(dayOffset: $dayOffset) {
      date
      interviewSlots {
        interviewStart
        interviewIds
      }
    }
  }
`

export const GET_APPLICATION_FROM_TOKEN = gql`
  query GetApplicantFromToken($token: String!) {
    getApplicantFromToken(token: $token) {
      id
      email
      status
      firstName
      lastName
      token
      image
      phone
      study
      hometown
      address
      gdprConsent
      priorities {
        id
        internalGroupPosition {
          id
          name
        }
      }
      interview {
        id
        interviewStart
        location {
          id
          name
          locationDescription
        }
      }
    }
  }
`

export const INTERNAL_GROUP_POSITIONS_AVAILABLE_FOR_APPLICANTS_QUERY = gql`
  query InternalGroupPositionsAvailableForApplicants {
    internalGroupPositionsAvailableForApplicants {
      id
      name
    }
  }
`

export const INTERVIEW_TEMPLATE_QUERY = gql`
  query InterviewTemplateQuery {
    interviewTemplate {
      interviewBooleanEvaluationStatements {
        id
        statement
      }
      interviewAdditionalEvaluationStatements {
        id
        statement
      }
    }
  }
`

export const EXTERNALLY_AVAILABLE_INTERNAL_GROUP_POSITIONS_QUERY = gql`
  query ExternallyAvailableInternalGroupPositionsQuery {
    externallyAvailableInternalGroupPositions {
      id
      name
    }
    currentAdmissionInternalGroupPositionData {
      id
      availablePositions
      membershipType
      internalGroupPosition {
        id
        name
      }
    }
  }
`

export const CURRENT_ADMISSION_INTERNAL_GROUP_POSITION_DATA = gql`
  query CurrentAdmissionInternalGroupPositionData {
    currentAdmissionInternalGroupPositionData {
      id
      availablePositions
      internalGroupPosition {
        id
        name
      }
    }
  }
`

export const CORE_APPLICANT_FIELDS = gql`
  fragment CoreApplicantFields on ApplicantNode {
    id
    email
    status
    fullName
    image
    phone
    study
    hometown
    address
    priorities {
      id
      internalGroupPosition {
        id
        name
      }
    }
    interviewerFromInternalGroup(internalGroupId: $internalGroup)
    interviewIsCovered(internalGroupId: $internalGroup)
    iAmAttendingInterview
    interview {
      id
      interviewStart
      interviewers {
        id
        profileImage
        initials
      }
    }
  }
`

export const INTERNAL_GROUP_APPLICANTS_DATA = gql`
  ${CORE_APPLICANT_FIELDS}
  query InternalGroupApplicantsDataQuery($internalGroup: ID!) {
    internalGroupApplicantsData(internalGroup: $internalGroup) {
      internalGroup {
        name
      }
      positionsToFill
      currentProgress
      firstPriorities {
        ...CoreApplicantFields
      }
      secondPriorities {
        ...CoreApplicantFields
      }

      thirdPriorities {
        ...CoreApplicantFields
      }
    }
  }
`

export const APPLICANT_NOTICES_QUERY = gql`
  query ApplicantNoticesQuery {
    applicantNotices {
      id
      email
      phone
      status
      fullName
      lastActivity
      lastNotice
      noticeMethod
      noticeComment
      noticeUser {
        id
        initials
        profileImage
      }
    }
  }
`

export const ALL_AVAILABLE_INTERVIEWS_QUERY = gql`
  query AllAvailableInterviewsQuery {
    allAvailableInterviews {
      id
      interviewStart
      interviewEnd
      location {
        id
        name
      }
    }
  }
`

export const ALL_APPLICANTS_AVAILABLE_FOR_REBOOKING_QUERY = gql`
  query AllApplicantsAvailableForRebookingQuery {
    allApplicantsAvailableForRebooking {
      id
      fullName
      phone
      status
      hometown
      email
    }
  }
`
