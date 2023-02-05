import { NextPage } from 'next'
import { firebaseAuth } from '../../merubo'
import { signInWithEmailLink } from 'firebase/auth'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const MeruboAuth: NextPage = () => {
  const router = useRouter()
  const email = router.query.email as string
  // const search = useLocation().search
  // const query = new URLSearchParams(search)
  // const email = query.get('email')
  // メール認証
  const valifyEmailHandler = async (): Promise<void> => {
    // const url = new URL(location.href)
    // const params = url.searchParams
    // console.log(params)
    // params.delete('email')
    // console.log(params)
    // console.log(email)
    // console.log(location.href)
    // // TODO hrefからemalを取得
    await signInWithEmailLink(firebaseAuth, email, location.href)
  }

  useEffect(() => {
    console.log(email)
    return () => {}
  }, [])

  return (
    <>
      <section className="auth-merubo-section">
        <div>
          <h2 className="description">
            以下のボタンを押した後、再度アプリからログインしてください。
          </h2>
          <Button
            className="button"
            onClick={() => {
              if (email != null) {
                valifyEmailHandler()
              }
            }}
          >
            認証
          </Button>
        </div>
      </section>
    </>
  )
}

export default MeruboAuth
