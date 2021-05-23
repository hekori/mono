export const Shell: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen">
            <div className="relative overflow-hidden bg-gray-900 pt-6">
                {children}
            </div>
        </div>
    )
}
