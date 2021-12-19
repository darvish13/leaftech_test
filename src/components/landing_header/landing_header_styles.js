import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10em;
  padding: 1em;

  @media (max-width: ${({ theme }) => theme.brkPoints.large}) {
    padding: 1em 2.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    padding: 1em 1.5em;
  }

  @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    padding: 0.5em 1.5em;
    height: 7em;
  }
`

export const Logo = styled.b`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 1.15em;
  font-family: 'Exo';
`

export const MenuIcon = styled.img`
  display: none;

  /* @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    display: initial;
  } */
`

export const HeaderLinks = styled.ul`
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.brkPoints.medium}) {
    width: 75%;
  }

  /* @media (max-width: ${({ theme }) => theme.brkPoints.small}) {
    display: none;
  } */
`

export const HLink = styled.li`
  font-weight: bold;
  font-size: 0.9em;
  margin: 0 1em;
  color: ${({
    theme: {
      colors: { blue, darkGray },
    },
    active,
  }) => (active ? blue : darkGray)};
`
