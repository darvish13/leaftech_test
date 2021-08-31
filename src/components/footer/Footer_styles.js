import styled from 'styled-components'

export const FooterSection = styled.footer`
  box-shadow: 0 1px 2px 0 #778aa3;
  padding: 2em 1em;
`

export const FooterMaxWidth = styled.main`
  max-width: 1100px;
  margin: auto;
`

export const FooterContent = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const Logo = styled.b`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 1.15em;
  font-family: 'Exo';
`

export const FooterLinks = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8em;
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
  justify-content: space-between;
  align-items: center;
`

export const Copyright = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: flex-end;
  align-items: center;
  grid-gap: 7.5em;
  padding: 2em 0;

  span {
    font-size: 0.5em;
    color: ${({ theme }) => theme.colors.black};
  }
`
