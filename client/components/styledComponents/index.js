import styled from 'styled-components'
import { mainOrange } from './globalStyles'

export const Card = styled.div`
  box-shadow: 4px 4px 3px #f6f6f3;
  border-radius: 16px;
  border: 1px solid #e4e4dc;
  padding: 10px;
`

export const ResultsCard = styled(Card)`
  background: ${mainOrange};
  margin-top: 28px;
  color: white;
  box-shadow: 4px 4px 6px rbga(0,0,0,.25);
  border: none;
`

export const Container = styled.div`
  display: flex;
  padding: 8px;
`

export const ThreeQuartContainer = styled(Container)`
  width: 85%;
  align-self: center;
`

export const RowContainer = styled(Container)`
  flex-flow: row wrap;
`

export const ColumnContainer = styled(Container)`
  flex-flow: column nowrap;
  flex: 0 1 50%;
`

export const CenteredContainer = styled(Container)`
  width: 50%;
  align-self: center;
  margin-left: 25%;
  margin-right: 25%;
`

export const Sidebar = styled(ColumnContainer)`
  flex: 0 2 25%;
  padding-right: 30px;
`

export const SidebarRight = styled(Sidebar)`
  padding-left: 50px;
  padding-right 10px;
`

export const FormButton = styled.button`
  margin: 5px 0;
  font-size: 1rem;
  font-family: "Roboto Mono";
  border: 1px solid #D3D3C5;
  background: #DCDCD0;
  box-shadow: none;
  border-radius: 4px;
  color: #8A886A;
  transition: all ease .75s;
  &:hover {
    background: #8A886A;
    color: #DCDCD0;
  }
`
