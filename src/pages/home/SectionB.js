import { MaxWidth } from '../../styles/globalStyles'
import {
  HomeSection,
  LogoSecB,
  P,
  SecB,
  SubtitleRowSecB,
  SubtitleSecB,
  TitleRowSecB,
  TitleSecA,
  VSpace,
} from './Home_styles'

const SectionB = () => (
  <>
    <HomeSection>
      <MaxWidth>
        <SecB>
          <TitleRowSecB>
            <TitleSecA>Shading automation</TitleSecA>

            <SubtitleRowSecB>
              <SubtitleSecB>SERVICE LAUNCHED</SubtitleSecB>
              <LogoSecB src='images/Logo_WAGO_2020.svg' />
            </SubtitleRowSecB>
          </TitleRowSecB>
        </SecB>
      </MaxWidth>
    </HomeSection>
  </>
)

export default SectionB
