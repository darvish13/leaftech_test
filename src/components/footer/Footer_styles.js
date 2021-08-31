import styled from 'styled-components'

export const FooterSection = styled.footer`
  box-shadow: 0 1px 2px 0 #778aa3;
  padding: 2em 1em;
`

export const FooterMaxWidth = styled.main`
  max-width: 900px;
  margin: auto;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    max-width: 768px;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    max-width: 660px;
  }
`

export const FooterContent = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`

export const Logo = styled.b`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 1.15em;
  font-family: 'Exo';

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    margin-left: 1.25em;
  }
`

export const FooterLinks = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  justify-content: center;
  grid-gap: 5em;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    grid-gap: 2.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    grid-gap: 1.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;
    padding: 0 1.5em;
  }
`

export const LinksCol = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const MainLink = styled.b`
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.65em;
  margin-bottom: 1em;
  cursor: pointer;
`

export const SubLink = styled.span`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 0.65em;
  margin: 0.3em 0;
  cursor: pointer;
`

export const Logos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  img {
    width: 1.35em;
    cursor: pointer;
    margin-right: 0.5em;
  }
`

export const CopyrightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    justify-content: center;
  }
`

export const Copyright = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: flex-end;
  align-items: center;
  grid-gap: 4.5em;
  padding: 2em 0;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    grid-gap: 2em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    grid-gap: 1em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 1em 2.5em;
  }

  span {
    font-size: 0.5em;
    color: ${({ theme }) => theme.colors.black};

    @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
      margin-right: 2em;
    }
  }
`
