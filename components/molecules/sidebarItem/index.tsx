import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface sidebarItemProps {
  title: string
  active?: boolean,
  icon: string,
  href: string
}

export default function SidebarItem(props: Partial<sidebarItemProps>) {
  const { title, active, icon, href="/member" } = props
  const classTitle = cx({
    'item': true,
    active,
    'mb-30': true
  })
  return (
    <div className={classTitle}>
      <Image src={`${icon}`} width={25} height={25}/>
      <div className="me-3">
      </div>
      <p className="item-title m-0">
      <Link href={href}>
        <a className="text-lg text-decoration-none">{title}</a>
      </Link>
      </p>
    </div>
  )
}
