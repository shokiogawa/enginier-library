import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="l-footer">
      <div className="area1">
        <span>プライバシーポリシー</span>
      </div>
      <div className="area2">
        <small>&copy; 2021-2022 エンジニア図書館</small>
      </div>
    </footer>
  )
}

export const MeruboFooter = () => {
  return (
    <footer className="l-footer-merubo">
      <div className="menu">
        <ul>
          <li>
            <Link href={'/merubo/terms'}>
              <a>利用規約</a>
            </Link>
          </li>
          <li>
            <Link href={'/merubo/privacy-policy'}>
              <a>プライバシーポリシー</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="title">
        <p className="text">Merubo ~オンライン寄せ書きアプリ~</p>
      </div>
    </footer>
  )
}
