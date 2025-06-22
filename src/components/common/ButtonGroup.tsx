function ButtonGroup({ children }: { children: React.ReactElement[] }) {
  return (
    <div className="group/button-group flex transition-all duration-200">
      {children}
    </div>
  )
}

export default ButtonGroup
