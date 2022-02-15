import cx from 'classnames'

interface buttonTabProps {
  title: string,
  filter: string,
  active?: boolean,
  onClick: () => void
}

export default function ButtonTab(props: Partial<buttonTabProps>) {
  const {title, active, filter, onClick} = props
  const btnClass = cx({
    'btn btn-status rounded-pill text-sm me-3': true,
    'btn-active': active
  })
  return (
    <button onClick={onClick} className={btnClass}>{title}</button>
  )
}
