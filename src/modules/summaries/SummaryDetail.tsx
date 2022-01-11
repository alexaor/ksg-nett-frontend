import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserThumbnail } from 'modules/users'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'
import { SummaryDetailsQueryReturns, SummaryDetailsQueryVariables } from '.'
import { SUMMARY_QUERY } from './queries'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding: 16px;
  overflow-y: scroll;
`

const ParticipantsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;
  ${props => props.theme.media.mobile} {
    margin: 15px 0;
  }
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: space-between;
`

const SummaryTitle = styled.h1`
  margin: 0;
`

interface ParamProps {
  summaryId: string
}

export const SummaryDetail = () => {
  const params = useParams<ParamProps>()
  const history = useHistory()

  const { error, loading, data } = useQuery<
    SummaryDetailsQueryReturns,
    SummaryDetailsQueryVariables
  >(SUMMARY_QUERY, {
    variables: { id: params.summaryId },
  })

  if (error) {
    return <h2>Ops noe gikk galt</h2>
  }

  if (loading || data === undefined) {
    return <span>Loading...</span>
  }
  const { summary } = data

  if (summary === null) return <span>Not here</span>
  return (
    <Wrapper>
      <TitleSection>
        <SummaryTitle>{summary.type}</SummaryTitle>
        <FontAwesomeIcon
          icon="edit"
          cursor="pointer"
          size="lg"
          onClick={() => {
            history.push(`/summaries/${summary.id}/edit`)
          }}
        />
      </TitleSection>
      <ParticipantsRow>
        Tilestede:
        {summary.participants.map((user, i) => (
          <UserThumbnail user={user} size="small" key={i} />
        ))}
      </ParticipantsRow>
      <ParticipantsRow>
        Referent
        <UserThumbnail user={summary.reporter} size="small" />
      </ParticipantsRow>

      <ReactMarkdown plugins={[remarkGfm]}>{summary.contents}</ReactMarkdown>
    </Wrapper>
  )
}
