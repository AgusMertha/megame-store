import cx from 'classnames'

interface buttonTabProps {
  title: string,
  filter: string,
  active?: boolean
}

export default function ButtonTab(props: Partial<buttonTabProps>) {
  const {title, active, filter} = props
  const btnClass = cx({
    'btn btn-status rounded-pill text-sm me-3': true,
    'btn-active': active
  })
  return (
    <a data-filter={filter} href="#" className={btnClass}>{title}</a>
  )
}
