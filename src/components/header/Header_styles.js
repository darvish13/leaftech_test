import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  width: 100%;
  height: 10em;
`

export const Logo = styled.b`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 1.15em;
  font-family: 'Exo';
`

export const HeaderLinks = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  list-style: none;
`

export const HLink = styled.li`
  font-weight: bold;
  font-size: 0.9em;
  color: ${({
    theme: {
      colors: { blue, darkGray },
    },
    active,
  }) => (active ? blue : darkGray)};
`
