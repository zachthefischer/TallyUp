export default function Header() {
    return (
        <header className="fixed bg-white shadow-md w-full top-0 z-50">
            <div className="max-w-full px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-semibold text-indigo-600">Club Finance Manager</div>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">Emperor of ACM</span>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                A
                </div>
            </div>
            </div>
        </header>
    )
}