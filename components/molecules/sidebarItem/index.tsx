import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface sidebarItemProps {
  title: string
  active?: boolean,
  icon: string,
  href?: string
  onClick?: () => void
}

export default function SidebarItem(props: Partial<sidebarItemProps>) {
  const { title, active, icon, href='', onClick} = props
  const classTitle = cx({
    'item': true,
    active,
    'mb-30': true
  })
  return (
    <div className={classTitle} onClick={onClick} style={{cursor: 'pointer'}}>
      <Image src={`${icon}`} width={25} height={25}/>
      <div className="me-3">
      </div>
      <p className="item-title m-0">
        {onClick ? (
          <a className="text-lg text-decoration-none">{title}</a>
        ): (
        <Link href={href}>
          <a className="text-lg text-decoration-none">{title}</a>
        </Link>
        )}
      </p>
    </div>
  )
}
