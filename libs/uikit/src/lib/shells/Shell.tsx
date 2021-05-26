export const Shell: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden border-secondary pt-6">
        {children}
      </div>
    </div>
  )
}
