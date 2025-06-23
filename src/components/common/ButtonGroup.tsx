type ButtonGroupProps = {
  children?: React.ReactNode
}

function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="group/button-group flex">
      {children}
    </div>
  )
}

export default ButtonGroup
