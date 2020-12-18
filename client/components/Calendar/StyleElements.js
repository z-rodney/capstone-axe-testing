import styled from 'styled-components';

export const CalendarStyle = styled.div`
  box-sizing: border-box;
  font-size: 1rem;
`;
export const DayNames = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
  align-items: center;
`;
export const CalendarBody = styled.div`
  border: 1px solid #43aa8b;
`;
export const Week = styled.div`
  background-color: white;
  width: calc(100% / 7);
  height: 75px;
  line-height: 75px;
  text-align: center;
  text-transform: uppercase;
  color: black;
  font-weight: 400;
`;

export const Previous = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 1rem;
  cursor: pointer;
`;

export const Next = styled.div`
  flex: 1;
  text-align: right;
  margin-right: 1rem;
  cursor: pointer;
`;
