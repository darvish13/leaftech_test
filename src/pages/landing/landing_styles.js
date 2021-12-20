import styled from 'styled-components'

export const MaxWidth = styled.div`
  max-width: 800px;
`

export const Main = styled.main`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const Img = styled.img`
  width: 18em;
`

export const Title = styled.b`
  font-family: Exo;
  font-size: 600;
  font-size: 1.6em;
  margin-top: 2em;
  margin-bottom: 0.5em;
  color: #2f2f2f;
`

export const P = styled.p`
  font-family: Nunito Sans;
  color: #778aa3;
  font-size: 0.95em;
  margin-top: 0;
  margin-bottom: 2em;
`

export const Button = styled.button`
  box-shadow: none;
  border: none;
  border-radius: 1px;
  padding: 1.5em 5em;
  background-color: #0087FF;
  margin: 3em auto;
  cursor: pointer;

  span {
    font-size: 1.25em;
    color: white;
  }
`
