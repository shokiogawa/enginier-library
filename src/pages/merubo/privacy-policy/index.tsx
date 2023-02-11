import { GetStaticProps, NextPage } from 'next'
import { fetchPrivacyPolicy } from '../../../api/merubo/api'
import { Article } from '../../../types/Article'

type Props = {
  staticPrivacyPolicy: Article
}

const MeruboPrivacyPolicy: NextPage<Props> = ({ staticPrivacyPolicy }) => {
  return (
    <>
      <section className="merubo-other-area">
        <div
          dangerouslySetInnerHTML={{ __html: staticPrivacyPolicy.content }}
        ></div>
      </section>
    </>
  )
}

export default MeruboPrivacyPolicy

export const getStaticProps: GetStaticProps = async () => {
  const privacyPolicy = await fetchPrivacyPolicy()
  return {
    props: {
      staticPrivacyPolicy: privacyPolicy,
    },
  }
}
