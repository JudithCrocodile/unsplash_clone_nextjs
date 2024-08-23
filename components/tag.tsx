export default function Tag({ name }: { name: string }) {
    return (
        <span key={name} className="px-2 py-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-slate-600 font-light rounded transition-all">{name}</span>
    )
}