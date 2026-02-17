import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import HomePage from '../pages/Home/HomePage'
import ProductsPage from '../pages/Products/ProductsPage'
import ProductCollectionPage from '../pages/Products/ProductCollectionPage'
import ProductDetailPage from '../pages/Products/ProductDetailPage'
import UseCasesPage from '../pages/UseCases/UseCasesPage'
import UseCasesDetailPage from '../pages/UseCases/UseCasesDetailPage'
import SoftwareServicesPage from '../pages/SoftwareServices/SoftwareServicesPage'
import SupportHubPage from '../pages/Support/SupportHubPage'
import KnowledgeBasePage from '../pages/Support/KnowledgeBasePage'
import ProductUpdatesPage from '../pages/Support/ProductUpdatesPage'
import RequestHelpPage from '../pages/Support/RequestHelpPage'
import ResourcesPage from '../pages/Resources/ResourcesPage'
import ResourceArticlePage from '../pages/Resources/ResourceArticlePage'
import WhitepapersPage from '../pages/Resources/WhitepapersPage'
import CaseStudiesPage from '../pages/Resources/CaseStudiesPage'
import PressReleasesPage from '../pages/Resources/PressReleasesPage'
import CompanyPage from '../pages/Company/CompanyPage'
import AboutUsPage from '../pages/Company/AboutUsPage'
import CareersPage from '../pages/Company/CareersPage'
import ContactPage from '../pages/Contact/ContactPage'
import PrivacyPolicyPage from '../pages/Legal/PrivacyPolicyPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },

        { path: 'products', element: <ProductsPage /> },
        { path: 'products/collections/:collectionSlug', element: <ProductCollectionPage /> },
        { path: 'products/:productSlug', element: <ProductDetailPage /> },

        { path: 'use-cases', element: <UseCasesPage /> },
        { path: 'use-cases/:slug', element: <UseCasesDetailPage /> },

        { path: 'software-services', element: <SoftwareServicesPage /> },

        { path: 'support', element: <SupportHubPage /> },
        { path: 'support/knowledge-base', element: <KnowledgeBasePage /> },
        { path: 'support/product-updates', element: <ProductUpdatesPage /> },
        { path: 'support/request-help', element: <RequestHelpPage /> },

        { path: 'resources', element: <ResourcesPage /> },
        { path: 'resources/:articleSlug', element: <ResourceArticlePage /> },
        { path: 'resources/whitepapers', element: <WhitepapersPage /> },
        { path: 'resources/case-studies', element: <CaseStudiesPage /> },
        { path: 'resources/press-releases', element: <PressReleasesPage /> },

        { path: 'company', element: <CompanyPage /> },
        { path: 'company/about-us', element: <AboutUsPage /> },
        { path: 'company/careers', element: <CareersPage /> },

        { path: 'contact', element: <ContactPage /> },

        { path: 'legal/privacy-policy', element: <PrivacyPolicyPage /> },

        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

export default router
