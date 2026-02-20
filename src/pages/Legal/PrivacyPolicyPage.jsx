import PrivacyPolicyContentSection from '../../components/legal/PrivacyPolicyContentSection'
import privacyPolicyMarkdown from '../../content/legal/privacy-policy.md?raw'

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyContentSection markdown={privacyPolicyMarkdown} />
}

export default PrivacyPolicyPage
