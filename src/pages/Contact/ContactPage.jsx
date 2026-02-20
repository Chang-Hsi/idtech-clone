import { useEffect, useMemo, useState } from 'react'
import { fetchContactPageFromApi, submitContactInquiryToApi } from '../../api/contactApi'
import ContactAddressInfoSection from '../../components/contact/ContactAddressInfoSection'
import ContactFormSection from '../../components/contact/ContactFormSection'
import ContactHeroSection from '../../components/contact/ContactHeroSection'
import {
  contactAddressSection,
  contactFormContent,
  contactHero,
  contactRegionalCards,
} from '../../data/contact/contactContent'
import { inquiryOptions, productOptions, regionOptions } from '../../data/contact/contactFormOptions'

const ContactPage = () => {
  const [contactPageFromApi, setContactPageFromApi] = useState(null)

  useEffect(() => {
    let isActive = true

    const loadContactPage = async () => {
      try {
        const response = await fetchContactPageFromApi()
        if (!isActive || !response.contactPage) return
        setContactPageFromApi(response.contactPage)
      } catch (error) {
        console.warn('Failed to load contact page from API. Fallback to local data.', error)
      }
    }

    loadContactPage()

    return () => {
      isActive = false
    }
  }, [])

  const contactData = useMemo(
    () => ({
      hero: contactPageFromApi?.hero ?? contactHero,
      addressSection: contactPageFromApi?.addressSection ?? contactAddressSection,
      regionalCards: contactPageFromApi?.regionalCards ?? contactRegionalCards,
      formContent: contactPageFromApi?.formContent ?? contactFormContent,
      inquiryOptions: contactPageFromApi?.inquiryOptions ?? inquiryOptions,
      regionOptions: contactPageFromApi?.regionOptions ?? regionOptions,
      productOptions: contactPageFromApi?.productOptions ?? productOptions,
    }),
    [contactPageFromApi]
  )

  return (
    <>
      <ContactHeroSection hero={contactData.hero} />
      <ContactAddressInfoSection content={contactData.addressSection} cards={contactData.regionalCards} />
      <ContactFormSection
        content={contactData.formContent}
        inquiryOptions={contactData.inquiryOptions}
        regionOptions={contactData.regionOptions}
        productOptions={contactData.productOptions}
        onSubmitInquiry={submitContactInquiryToApi}
      />
    </>
  )
}

export default ContactPage
