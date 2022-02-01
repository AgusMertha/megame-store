interface HomeTitleProps {
  desc1: string
  desc2: string
  classList: string
}

export default function HomeSectionTitle(props: HomeTitleProps) {
  const {desc1, desc2, classList} = props
  return (
    <h2 className={classList}>
          {desc1}
      <br />
          {desc2}
    </h2>
  )
}
