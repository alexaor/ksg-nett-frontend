import { useQuery } from '@apollo/client'
import { Center } from '@mantine/core'
import { FullContentLoader } from 'components/Loading'

import {
  AdmissionDashboard,
  ApplicantDetails,
  ApplicantNotices,
  ApplicantsOverview,
  AssignInterview,
  CloseAdmission,
  ConfigurationWizard,
  DiscussionDashboard,
  EditInterview,
  InternalGroupApplicants,
  InternalGroupDiscussion,
  MyInterviews,
} from 'modules/admissions/views'
import {
  BarTabCustomers,
  BarTabDashboard,
  PreviousBarTabs,
} from 'modules/barTab/views'
import { Dashboard } from 'modules/dashboard/Dashboard'
import {
  CreateDeposit,
  Deposits,
  MyEconomy,
  PrintLists,
  PrintWorkingToday,
  SociSessionDetail,
  SosiSessions,
} from 'modules/economy/views'
import {
  InternalGroupDetail,
  InternalGroups,
  ManageInternalGroup,
} from 'modules/organization/views'
import {
  CreateQuote,
  PopularQuotes,
  QuotesList,
  ReviewQuotes,
} from 'modules/quotes/views'
import {
  AllMyShifts,
  AllShifts,
  MyAvailability,
  MyUpcomingShifts,
  ScheduleDetails,
  Schedules,
  ScheduleTemplateDetails,
  ScheduleTemplates,
} from 'modules/schedules/views'
import { CreateSummary, Summaries, SummaryDetail } from 'modules/summaries'
import { ME_QUERY } from 'modules/users/queries'
import { MeQueryReturns } from 'modules/users/types'
import {
  MigrationWizard,
  UserProfile,
  UserTypeDetail,
  UserTypes,
} from 'modules/users/views'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useStore } from 'store'
import { PERMISSIONS } from 'util/permissions'
import PublicRoutes from './PublicRoutes'
import { RestrictedRoute } from './RestrictedRoute'

const FullPage404 = React.lazy(
  () => import('components/FullPageComponents/FullPage404')
)

const MainContent = React.lazy(() => import('routes/MainContent'))

export const AppRoutes: React.FC = () => {
  const { loading, error, data } = useQuery<MeQueryReturns>(ME_QUERY)
  const setUser = useStore(state => state.setUser)

  if (error) return <span>Error {error.message}</span>

  if (loading || data === undefined)
    return (
      <Center>
        <FullContentLoader />
      </Center>
    )

  const { me } = data

  if (me == null || me === undefined) {
    return <PublicRoutes />
  }

  if (me.requiresMigrationWizard) {
    return (
      <Routes>
        <Route path="migration-wizard" element={<MigrationWizard />} />
        <Route path="*" element={<Navigate to="/migration-wizard" />} />
      </Routes>
    )
  }

  setUser(me)

  return (
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events" element={<p>Hello Events</p>} />
        <Route path="*" element={<FullPage404 />} />

        <Route path="bar-tab">
          <Route
            index
            element={
              <RestrictedRoute permissions={PERMISSIONS.barTab.view.barTab}>
                <BarTabDashboard />
              </RestrictedRoute>
            }
          />

          <Route
            path="previous"
            element={
              <RestrictedRoute permissions={PERMISSIONS.barTab.view.barTab}>
                <PreviousBarTabs />
              </RestrictedRoute>
            }
          />
          <Route
            path="customers"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.barTab.view.barTabCustomer}
              >
                <BarTabCustomers />
              </RestrictedRoute>
            }
          />
        </Route>
        <Route path="summaries">
          <Route index element={<Summaries />} />
          <Route
            path="create"
            element={
              <RestrictedRoute permissions={PERMISSIONS.summaries.add.summary}>
                <CreateSummary />
              </RestrictedRoute>
            }
          />
          <Route path=":summaryId">
            <Route index element={<SummaryDetail />} />
          </Route>
          <Route path="*" element={<FullPage404 />} />
        </Route>

        <Route path="internal-groups">
          <Route index element={<InternalGroups />} />
          <Route path=":internalGroupId">
            <Route index element={<InternalGroupDetail />} />
            <Route
              path="manage"
              element={
                <RestrictedRoute
                  permissions={
                    PERMISSIONS.organization.change
                      .internalGroupPositionMembership
                  }
                >
                  <ManageInternalGroup />
                </RestrictedRoute>
              }
            />
          </Route>
        </Route>

        <Route path="quotes">
          <Route path="popular" element={<PopularQuotes />} />
          <Route index element={<QuotesList />} />
          <Route
            path="review"
            element={
              <RestrictedRoute permissions={PERMISSIONS.quotes.approve.quote}>
                <ReviewQuotes />
              </RestrictedRoute>
            }
          />
          <Route path="popular" element={<PopularQuotes />} />
          <Route path="create" element={<CreateQuote />} />
        </Route>

        <Route path="users">
          <Route path=":userId" element={<UserProfile />} />
          <Route path="user-types">
            <Route
              index
              element={
                <RestrictedRoute permissions={PERMISSIONS.users.view.userType}>
                  <UserTypes />
                </RestrictedRoute>
              }
            />
            <Route
              path=":userTypeId"
              element={
                <RestrictedRoute permissions={PERMISSIONS.users.view.userType}>
                  <UserTypeDetail />
                </RestrictedRoute>
              }
            />
          </Route>
        </Route>

        <Route path="gallery">
          <Route index element={<p>Hello Gallery</p>} />
        </Route>

        <Route path="quiz">
          <Route index element={<p>Hello Quiz</p>} />
        </Route>

        <Route path="admissions">
          <Route
            index
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.admissions.view.admission}
              >
                <AdmissionDashboard />
              </RestrictedRoute>
            }
          />
          <Route
            path="configure"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.admissions.change.admission}
              >
                <ConfigurationWizard />
              </RestrictedRoute>
            }
          />
          <Route
            path="my-interviews"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.admissions.view.admission}
              >
                <MyInterviews />
              </RestrictedRoute>
            }
          />

          <Route
            path="applicants-overview"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.admissions.view.admission}
              >
                <ApplicantsOverview />
              </RestrictedRoute>
            }
          />
          <Route
            path="applicant-notices"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.admissions.view.admission}
              >
                <ApplicantNotices />
              </RestrictedRoute>
            }
          />

          <Route
            path="assign-interview"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.admissions.view.admission}
              >
                <AssignInterview />
              </RestrictedRoute>
            }
          />
          <Route path="close" element={<CloseAdmission />} />

          <Route path="internal-group-applicants">
            <Route
              path=":internalGroupId"
              element={<InternalGroupApplicants />}
            />
          </Route>

          <Route path="discussion-dashboard">
            <Route
              index
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.admissions.view.admission}
                >
                  <DiscussionDashboard />
                </RestrictedRoute>
              }
            />
            <Route
              path=":internalGroupId"
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.admissions.view.admission}
                >
                  <InternalGroupDiscussion />
                </RestrictedRoute>
              }
            />
          </Route>

          <Route path="applicants">
            <Route
              path=":applicantId"
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.admissions.view.admission}
                >
                  <ApplicantDetails />
                </RestrictedRoute>
              }
            />
          </Route>

          <Route path="interviews">
            <Route path=":interviewId">
              <Route
                path="edit"
                element={
                  <RestrictedRoute
                    permissions={PERMISSIONS.admissions.view.admission}
                  >
                    <EditInterview />
                  </RestrictedRoute>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route path="economy">
          <Route path="deposits/create" element={<CreateDeposit />} />
          <Route
            path="deposits"
            element={
              <RestrictedRoute permissions={PERMISSIONS.economy.change.deposit}>
                <Deposits />
              </RestrictedRoute>
            }
          />
          <Route path="me" element={<MyEconomy />} />
          <Route path="soci-products" element={<h2>Suh duh</h2>} />
          <Route path="print">
            <Route
              index
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.economy.view.sociSession}
                >
                  <PrintLists />
                </RestrictedRoute>
              }
            />
            <Route
              path="working-today"
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.economy.view.sociSession}
                >
                  <PrintWorkingToday />
                </RestrictedRoute>
              }
            />
          </Route>

          <Route path="soci-sessions">
            <Route
              index
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.economy.view.sociSession}
                >
                  <SosiSessions />
                </RestrictedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.economy.view.sociSession}
                >
                  <SociSessionDetail />
                </RestrictedRoute>
              }
            />
          </Route>
          <Route path="*" element={<FullPage404 />} />
        </Route>

        {/* ==== SCHEDULES MODULE ==== */}
        <Route path="schedules">
          <Route
            index
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.schedules.change.schedule}
              >
                <Schedules />
              </RestrictedRoute>
            }
          />
          <Route path="me">
            <Route index element={<MyUpcomingShifts />} />
            <Route path="history" element={<AllMyShifts />} />
            <Route path="availability" element={<MyAvailability />} />
          </Route>
          <Route path="all-shifts" element={<AllShifts />} />

          <Route path="templates">
            <Route
              index
              element={
                <RestrictedRoute
                  permissions={PERMISSIONS.schedules.view.scheduleTemplate}
                >
                  <ScheduleTemplates />
                </RestrictedRoute>
              }
            />
            <Route path=":templateId">
              <Route
                index
                element={
                  <RestrictedRoute
                    permissions={PERMISSIONS.schedules.view.scheduleTemplate}
                  >
                    <ScheduleTemplateDetails />
                  </RestrictedRoute>
                }
              />
            </Route>
          </Route>

          <Route
            path=":id"
            element={
              <RestrictedRoute
                permissions={PERMISSIONS.schedules.change.schedule}
              >
                <ScheduleDetails />
              </RestrictedRoute>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
