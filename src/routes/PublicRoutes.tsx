import { ReSendApplicantTokenForm } from 'modules/admissions/components/ApplicantPortal'
import { ApplicantPortal } from 'modules/admissions/views'
import { ForgotPassword, Login } from 'modules/login/views'
import { ChangePasswordWithToken } from 'modules/login/views/ChangePasswordWithToken'
import { Route, Routes } from 'react-router-dom'

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="applicant-portal">
        <Route index element={<ReSendApplicantTokenForm />} />
        <Route path=":applicantToken" element={<ApplicantPortal />} />
      </Route>
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ChangePasswordWithToken />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default PublicRoutes
