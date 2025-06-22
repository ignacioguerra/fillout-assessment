function ButtonGroup({ children }: { children: React.ReactElement[] }) {
  return (
    <div className="group/button-group flex">
      {children}
    </div>
  )
}

export default ButtonGroup
