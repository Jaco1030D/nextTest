
import CompanyTrustUs from '@/Components/Layout/CompanyTrustUs';
import EvaluatedProjects from '@/Components/Layout/EvaluatedProjects';
import ExampleTraduction from '@/Components/Layout/ExampleTraduction';
import ExpertiseSection from '@/Components/Layout/ExpertiseSection';
import FeedBack from '@/Components/Layout/FeedBack';
import FooterCompany from '@/Components/Layout/FooterCommunity';
import HeroSectionCompany from '@/Components/Layout/HeroSectionCompany';
import ServicesOffered from '@/Components/Layout/ServicesOffered';
import { icons, textsEvaluatedProjectssecond, textsExampleTraduction, textsExpert, textsFeedBack, textsFooterCompany, textsHomeCompany, textsServiceOffered } from '@/constants';

const Company = () => {
  return (
    <div>
      <HeroSectionCompany text={textsHomeCompany} />
      <EvaluatedProjects type={2} text={textsEvaluatedProjectssecond} action={'/caseStudy/zf'} />
      <CompanyTrustUs gradient text={icons.text} icons={icons.iconsImg} />
      <ServicesOffered text={textsServiceOffered} />
      <ExpertiseSection text={textsExpert} />
      <FeedBack alternative text={textsFeedBack} />
      <ExampleTraduction text={textsExampleTraduction} />
      <FooterCompany text={textsFooterCompany} />
      </div>
  )
}

export default Company