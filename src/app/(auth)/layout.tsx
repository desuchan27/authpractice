const layout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex justify-center items-center h-full bg-sky-500">
            {children}
        </div>
    )
}

export default layout