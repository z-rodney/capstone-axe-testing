import styled from 'styled-components'
import { Card } from '../styledComponents'
import { mainLightGreen } from '../styledComponents/globalStyles'

export const RiskCard = styled(Card)`
  background: ${mainLightGreen};
  color: white;
  box-shadow: 4px 4px 6px rbga(0,0,0,.25);
  border: none;
  margin-top: 28px;
`
