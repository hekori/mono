export const TextNormal: React.FC = ({ children }) => {
  return <span className="text-base text-primary">{children}</span>
}

export const TextSmall: React.FC = ({ children }) => {
  return <h1 className="text-sm font-bold mb-8 text-primary">{children}</h1>
}

export const TextTitle: React.FC = ({ children }) => {
  return <h1 className="text-2xl font-bold mb-8 text-primary">{children}</h1>
}

export const TextSubtitle: React.FC = ({ children }) => {
  return <h1 className="text-2xl font-bold mb-8 text-primary">{children}</h1>
}
