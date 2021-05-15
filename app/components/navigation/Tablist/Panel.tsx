const Panel = ({
  children,
  index,
  isSelectedTab,
  ...className
}: {
  children: React.ReactNode
  index: number
  isSelectedTab: boolean
}): JSX.Element => (
  <section
    id={`panel-${index}`}
    role='tabpanel'
    tabIndex={0}
    aria-labelledby={`tab-${index}`}
    hidden={!isSelectedTab}
    {...className}
  >
    {children}
  </section>
)

export default Panel
