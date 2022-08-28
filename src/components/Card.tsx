import { NextPage } from 'next'
import Image from 'next/image'
import { changeFormatDate } from '../utility/DateFormat'

type Props = {
  thumnail: string
  title: string
  createdAt: string
  category: string
}
export const Card: NextPage<Props> = ({
  thumnail,
  title,
  createdAt,
  category,
}) => {
  return (
    <div className="c-card">
      <Image
        src={thumnail}
        width={300}
        height={150}
        layout={'responsive'}
        alt="thumnail"
        className="c-card__thumnail"
      />
      <h2 className="c-card__title">{title}</h2>
      <p className="c-card__createdAt">{changeFormatDate(createdAt, 'YYYY年MM月DD日')}</p>
    </div>
  )
}
