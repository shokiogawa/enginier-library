import { NextPage } from 'next'
import { signInWithEmailLink } from 'firebase/auth'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { firebaseAuth } from '../../../utility/firebase'
const MeruboAuth: NextPage = () => {
  const router = useRouter()
  const email = router.query.email as string
  // メール認証
  const valifyEmailHandler = async (): Promise<void> => {
    await signInWithEmailLink(
      firebaseAuth,
      'syouki2578@icloud.com',
      location.href
    )
      .then(() => {
        console.log('認証成功')
      })
      .catch((err) => {
        console.log('認証失敗')
        console.log(err)
      })
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
              valifyEmailHandler()
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
