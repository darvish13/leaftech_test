/* eslint-disable jsx-a11y/anchor-is-valid */
import { MaxWidth } from '../../styles/globalStyles'
import {
  DualColSecB,
  FooterRowSecB,
  HomeSection,
  ImageSecB,
  LogoSecB,
  P,
  RightColSecB,
  SecB,
  SubtitleRowSecB,
  SubtitleSecB,
  TitleRowSecB,
  TitleSecA,
  Title2SecB,
  VSpace,
  TitleSecB,
} from './Home_styles'

const SectionB = () => (
  <>
    <HomeSection>
      <MaxWidth>
        <SecB>
          <TitleRowSecB>
            <TitleSecB>Shading automation</TitleSecB>

            <SubtitleRowSecB>
              <SubtitleSecB>SERVICE LAUNCHED</SubtitleSecB>
              <LogoSecB src='images/Logo_WAGO_2020.svg' />
            </SubtitleRowSecB>
          </TitleRowSecB>

          <DualColSecB>
            <ImageSecB>
              <img src='images/window.webp' alt='' />
            </ImageSecB>

            <RightColSecB>
              <Title2SecB>Every window is unique</Title2SecB>
              <P>
                Light intake differ from one window to another due to
                surrounding structures, architecture, local weather conditions,
                and solar position.
                <br />
                <br />
                Hardware sensors only approximate the shading pattern on a
                building. Leaftech's virtual sensors capture the acutal pattern.
              </P>

              <VSpace space='1em' />

              <Title2SecB>
                Match the real shading conditions with virtual sensors
              </Title2SecB>
              <P>
                In order to monitor every window in your building, Leaftech sets
                up a digital twin of the building and assembles all influence
                factors. On each modelled window we generate a grid of virtual
                sensors and link them to current and future weather conditions
              </P>
            </RightColSecB>
          </DualColSecB>

          <FooterRowSecB>
            <p>Looking to upgrade your sensor solutions?</p>
            <a href='#'>
              <p>Request more information about our data services</p>
            </a>
          </FooterRowSecB>

          <VSpace space='2em' />
        </SecB>
      </MaxWidth>
    </HomeSection>
  </>
)

export default SectionB
