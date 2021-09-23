import styled from 'styled-components'

export const Main = styled.div`
  min-height: 50vh;
  position: relative;

  .div-root-59 {
    width: 1em;
    height: 1em;
    border-radius: 100%;
    border: 8px solid white;
  }
`

export const DebugWrapper = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
`

export const DebugCard = styled.div`
  opacity: 0.5;
  border-radius: 4px;
  background-color: white;
  padding: 0.5em;
  color: black;
  width: 40vw;
  margin: 0.5em 0;

  p {
    font-size: 0.75em;
    margin: 0.5em 0;
  }
`

export const CaptureButton = styled.div`
  background-color: #3087df;
  border-radius: 4px;
  margin: 0 auto;
  height: 4em;
  padding: 1em 4em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;

  img {
    width: 3em;
    height: 3em;
  }
`

export const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CameraNames = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 2.5em;

  span {
    margin: 0.5em;
    font-weight: bold;
    font-size: 0.35em;
    color: black;
    background-color: lightgray;
    padding: 2em 0.85em;
    border-radius: 5px;
    user-select: none;
  }
`
