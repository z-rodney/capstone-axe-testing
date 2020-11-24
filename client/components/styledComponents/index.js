import styled from 'styled-components'

export const Card = styled.div`
  box-shadow: 4px 4px 3px #f6f6f3;
  border-radius: 16px;
  border: 1px solid #e4e4dc;
  padding: 10px;
`

export const FriendCard = styled(Card)`
  background: #e5eafa;
  box-shadow: 4px 4px 6px rbga(0,0,0,.25);
`

export const RiskCard = styled(Card)`
  background: #43aa8b;
  color: white;
  box-shadow: 4px 4px 6px rbga(0,0,0,.25);
  border: none;
`

export const Container = styled.div`
  display: flex;
  padding: 10px;
`

export const RowContainer = styled(Container)`
  flex-flow: row wrap;
`

export const ColumnContainer = styled(Container)`
  flex-flow: column nowrap;
  flex: 1 1 65%;
`

export const Sidebar = styled(ColumnContainer)`
  flex: 0 1 25%;
`


