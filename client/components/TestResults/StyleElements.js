import styled from 'styled-components'
import { Card, RowContainer } from '../styledComponents'

export const Submit = styled.input`
  align-self: center;
  font-size: 1rem;
  width: 40%;
  border-radius: 12px;
  margin-top: 16px;
  background: #f6f6f3;
  box-shadow: none;
  border: 1px solid #e4e4dc;
  font-weight: 300;
   &:hover {
    background: #e4e4dc;
  }
`
export const OuterWrapper = styled(RowContainer)`
  padding: 0;
`
export const FormQuestion = styled.p`
  margin: 0;
  font-weight: 500;
`

export const TestCard = styled(Card)`
  background: #fff;
  color: #000;
  box-shadow: 4px 4px 3px #BB3911;
`
