import styled from 'styled-components'

export const Button = styled.button`
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

export const LocationFormStyle = styled.form`
  margin: 7px;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  & button, & > input {
    box-sizing: border-box;
    font-size: 15px;
    font-family: "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 300;
    padding: 6px 35px;
    width: 240px;
    border-radius: 4px;
    border: solid 1px #EBEBEB;
  }
`

export const LocationButton = styled.button`
  background: #f6f6f3;
  &:hover {
    background: #e4e4dc;
  }
`

export const LocationFormInput = styled.input`
  height: 36px;
  margin: 6px 0;
`

export const DetailCard = styled.div`
  background: #F7F7F7;
  border-radius: 9px;
  box-sizing: border-box;
  padding: 7px;
  margin: 0 5px;

  & p:not(:first-child) {
    margin-bottom: 0;
    margin-top: 5px;
  }
`

export const Title = styled.p`
  color: #ec4e20;
  margin-bottom: 0;
  text-align: center;
  font-weight: 500;
`
