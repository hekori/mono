export const Container: React.FC = ({ children }) => {
  return (
    <div className="max-w-screen-xl container mx-auto mt-8 px-6 pt-6 pb-12 min-h-screen text-center">
      {children}
    </div>
  )
}
