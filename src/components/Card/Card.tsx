import styled from 'styled-components'

interface WrapperProps {
  width: string
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadow.default};
  width: ${props => props.width};
`

interface CardProps {
  width?: string
}

export const Card: React.FC<CardProps> = ({ children, width = 'auto' }) => {
  return <Wrapper width={width}>{children}</Wrapper>
}
