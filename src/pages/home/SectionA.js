import { MaxWidth } from '../../styles/globalStyles'
import {
  Button,
  HomeSection,
  ImageSecA,
  LeftColSecA,
  P,
  SecA,
  TitleSecA,
  VSpace,
} from './Home_styles'

const SectionA = () => (
  <>
    <HomeSection>
      <MaxWidth>
        <SecA>
          <LeftColSecA>
            <VSpace space='2em' />

            <TitleSecA>Powerful alone.</TitleSecA>
            <TitleSecA>Better together.</TitleSecA>

            <VSpace space='1em' />

            <P>
              Leaftech’s services are potent on their own,
              <br /> They deliver even more potential when combined.
            </P>

            <VSpace space='1em' />

            <Button>Get in touch</Button>
          </LeftColSecA>

          <ImageSecA src='images/orchestra.webp' />
        </SecA>
      </MaxWidth>
    </HomeSection>
  </>
)

export default SectionA
