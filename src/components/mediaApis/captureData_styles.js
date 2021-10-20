import styled from 'styled-components'

export const Main = styled.div`
  max-width: 1200px;
  margin: auto;
  min-height: 50vh;
  border: 1px solid #94a7c044;
`

export const Title = styled.b`
  font-size: 1.2em;
  margin-bottom: 2em;
  color: gray;
`

export const Video = styled.video`
  max-width: 100%;
`

export const CamerasRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CameraBtn = styled.button`
  box-shadow: none;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;
  ${({ active, theme }) =>
    active &&
    `
  background-color: ${theme.colors.blue}; 
  color: white;
  `}
`

export const CaptureBtn = styled.button`
  border: none;
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  width: 100%;
  margin: 2em 0;
  border-radius: 5px;
  height: 4em;
  text-transform: uppercase;
  display: block;
`

export const Image = styled.img`
  max-width: 100%;
`

export const Canvas = styled.canvas`
  display: none;
`

export const Button = styled.button`
  width: 100%;
  border: none;
  box-shadow: none;
  height: 4em;
  border-radius: 5px;
  background: ${({ color: { background } }) => background};
  color: ${({ color: { text } }) => text};
  text-transform: uppercase;
`
