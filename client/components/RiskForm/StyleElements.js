import styled from 'styled-components'
import { Container, CenteredContainer } from '../styledComponents'
import { mainOrange } from '../styledComponents/globalStyles'

export const CenterWrapper = styled(CenteredContainer)`
  display: flex;
  flex-flow: column nowrap;
`

export const FormCard = styled(Container)`
  flex-flow: column wrap;
  font-weight: 300;
  & #submit-btn {
    align-self: center;
    background-color: ${mainOrange};
    color: white;
    padding: 0.5rem;
    font-family: 'Roboto Mono', monospace;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #A83310;
    font-size: .8rem;
  }

  & #submit-btn: hover {
    background: #A83310;
  }
`
export const RadioContainer = styled(Container) `
  justify-content: space-evenly;
`
