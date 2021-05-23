export const Card: React.FC = ({ children }) => {
  return (
    <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
      {children}
    </div>
  );
};
