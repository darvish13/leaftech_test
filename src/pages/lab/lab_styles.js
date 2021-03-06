import styled from 'styled-components'

export const Relative = styled.div`
  position: relative;
`

export const Main = styled.div`
  min-height: 50vh;

  .div-root-59 {
    width: 1em;
    height: 1em;
    border-radius: 100%;
    border: 8px solid white;
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

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2em;
`

export const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3em;
  font-weight: bold;
  color: #8f8f8f;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  ${({ active }) =>
    active &&
    `
    color: #3087df; 
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  `}
`

export const SmallImage = styled.img`
  width: 5em;
  border-radius: 5px;
`

export const LargeImage = styled.img`
  width: 100%;
  border-radius: 5px;
`

export const NameInput = styled.div`
  padding: 2em 1em;
  margin-bottom: 2em;
  border-bottom: 1px solid lightgray;

  .MuiButton-contained {
    color: white;
    background-color: #3087df;
  }
`
export const P = styled.p`
  font-size: 1.1em;
  font-weight: 500;
  color: gray;
  margin-bottom: 2em;
  padding: 0 1em;
`

export const TableWrapper = styled.div`
  .MuiTypography-h6 {
    font-size: 1.25em;
    color: #3087df;
  }

  .MuiToolbar-root {
    display: grid;
    grid-gap: 1em;
  }
`

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;

  p {
    margin: 3em auto;
    line-height: 1.5em;
    font-weight: bold;
    font-size: 0.85em;
    color: #3087df;
    text-align: center;
  }
`
