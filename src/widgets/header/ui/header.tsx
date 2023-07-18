import Link from 'next/link'

export const Header = () => {
  return (
    <header className="top-0 mb-4 flex w-full items-center justify-between bg-gray-100 px-12 py-1">
      <h1>CryptoTest</h1>
      <div className="flex gap-x-4 text-xs">
        <Link href="/">Converter</Link>
        <Link href="/cryptos">Crypto Currencies</Link>
      </div>
    </header>
  )
}
