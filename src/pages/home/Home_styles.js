import styled from 'styled-components'

export const HomeSection = styled.section`
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
`

export const HSpace = styled.div`
  width: ${({ space }) => space || '1em'};
`

export const VSpace = styled.div`
  height: ${({ space }) => space || '1em'};
`

export const P = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 0.9em;
  line-height: 1.43;
`

export const Button = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.95em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 44px;
  cursor: pointer;
`

/**************************************
 ******** Section A Styles
 *************************************/
export const SecA = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 1em;
`

export const LeftColSecA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const TitleSecA = styled.b`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Exo';
`

export const ImageSecA = styled.img`
  margin-right: 7em;
  width: 37em;
  margin-bottom: -0.5em;
`

/**************************************
 ******** Section B Styles
 *************************************/
export const SecB = styled.div`
  padding: 5em 1em;
`

export const TitleRowSecB = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SubtitleRowSecB = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SubtitleSecB = styled.span`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.blue};
  line-height: 1.86;
  letter-spacing: 1.75px;
  font-weight: 600px;
  margin-right:  1em;
  margin-top: 0.4em;
`

export const LogoSecB = styled.img``
