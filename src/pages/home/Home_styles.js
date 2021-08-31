import styled from 'styled-components'

export const HomeSection = styled.section`
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

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    padding: 0 2.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      max-width: 50vw;
      text-align: center;
    }
  }
`

export const LeftColSecA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const TitleSecA = styled.b`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Exo';
`

export const ImageSecA = styled.img`
  margin-right: 7em;
  width: 37em;
  margin-bottom: -0.45em;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    margin-right: 0;
    margin-top: 3em;
    width: 30em;
    margin-bottom: -0.4em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    margin-top: 3em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    width: 85vw;
    margin-bottom: -0.3em;
  }
`

/**************************************
 ******** Section B Styles
 *************************************/
export const SecB = styled.div`
  padding: 5em 1em;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    padding: 5em 2.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    padding: 2.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    padding: 1em;
  }
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
  margin-right: 1em;
  margin-top: 0.4em;
`

export const LogoSecB = styled.img``

export const DualColSecB = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 6em auto;

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    margin: 3em auto;
  }
`

export const ImageSecB = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 7em;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    margin-right: 3em;
  }

  img {
    @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
      width: 16em;
    }

    @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
      margin-left: 3em;
      margin-bottom: 2em;
    }
  }
`

export const RightColSecB = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 28em;

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
    }
  }
`

export const TitleSecB = styled.b`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Exo';

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    font-size: 1.75em;
  }
`

export const Title2SecB = styled.b`
  font-size: 1.35em;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Exo';

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    text-align: center;
  }
`

export const FooterRowSecB = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 1em;
    margin: 0;
    margin-bottom: 0.5em;

    @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
      font-size: 0.9em;
      text-align: center;
    }
  }

  a {
    p {
      margin: 0;
      color: ${({ theme }) => theme.colors.blue};
      font-size: 1em;
      text-decoration: underline;

      @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
        font-size: 0.9em;
        text-align: center;
      }
    }
  }
`
