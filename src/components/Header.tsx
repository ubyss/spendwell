import Link from 'next/link';

export default function Header({ title, backLink, centered }) {
  return (
    <header className="w-full bg-[#E8EDF2] p-4 flex justify-between items-center">
      {backLink && (
        <Link href={backLink}>
          <button className="text-[#0D141C] bg-[#E8EDF2] px-4 py-2 rounded-md shadow-sm transition hover:bg-[#cdd5df]">
            &larr; Voltar
          </button>
        </Link>
      )}
      <div className={`text-2xl font-bold ${centered ? 'flex-1 text-center' : ''}`}>{title}</div>
      {centered && backLink && <div className="w-24"></div>}
    </header>
  );
}
