import { useEffect, useState } from 'react'
import PrivacyPolicyContentSection from '../../components/legal/PrivacyPolicyContentSection'
import privacyPolicyMarkdown from '../../content/legal/privacy-policy.md?raw'
import { fetchPrivacyPolicyFromApi } from '../../api/catalogApi'

const PrivacyPolicyPage = () => {
  const [markdown, setMarkdown] = useState(privacyPolicyMarkdown)

  useEffect(() => {
    let isCancelled = false

    const load = async () => {
      try {
        const response = await fetchPrivacyPolicyFromApi()
        const nextMarkdown = response?.privacyPolicy?.markdown
        if (isCancelled) return
        if (typeof nextMarkdown === 'string' && nextMarkdown.trim().length > 0) {
          setMarkdown(nextMarkdown)
        }
      } catch {
        // keep static markdown fallback
      }
    }

    load()
    return () => {
      isCancelled = true
    }
  }, [])

  return <PrivacyPolicyContentSection markdown={markdown} />
}

export default PrivacyPolicyPage
