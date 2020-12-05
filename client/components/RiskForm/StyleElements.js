import styled from 'styled-components'
import { Container } from '../styledComponents'

export const FormCard = styled(Container)`
  flex-flow: column wrap;
  font-weight: 300;
  & #submit-btn {
    align-self: center;
  }
`
export const RadioContainer = styled(Container) `
  justify-content: space-evenly;
`
