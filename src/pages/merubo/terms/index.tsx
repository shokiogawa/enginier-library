import { fetchPrivacyPolicy, fetchTerms } from '../../../api/merubo/api'
import { Article } from '../../../types/Article'
import { GetStaticProps, NextPage } from 'next'

type Props = {
  staticTerms: Article
}

const MeruboTerms: NextPage<Props> = ({ staticTerms }) => {
  return (
    <>
      <section className="merubo-other-area">
        <div dangerouslySetInnerHTML={{ __html: staticTerms.content }}></div>
      </section>
    </>
  )
}

export default MeruboTerms

export const getStaticProps: GetStaticProps = async () => {
  const terms = await fetchTerms()
  return {
    props: {
      staticTerms: terms,
    },
  }
}
