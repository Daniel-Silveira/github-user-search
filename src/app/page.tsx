'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/hooks/useSearch'
import SearchResults from '../components/SearchResults'

export default function Home() {
  const router = useRouter()
  const { searchResult, error, fetchData } = useSearch()
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      fetchData(searchQuery)
    }, 500)

    return () => clearTimeout(debouncedSearch)
  }, [searchQuery])

  const handleResultClick = (username: string) => {
    router.push(`/user/${username}`)
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      <div className="bg-gray-900 px-6 py-4 rounded-lg w-2/4 shadow-lg">
        <h1 className="text-lg font-extrabold text-white mb-4">Pesquisar no GitHub</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md focus:outline-none bg-gray-700 text-white"
            placeholder="Digite o nome do usuário no GitHub..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {searchResult ? (
          <SearchResults searchResult={searchResult} onResultClick={handleResultClick} />
        ) : (
          !!searchQuery && (
            <p className="text-center mt-4 text-gray-300">
              {error || 'Nenhum resultado encontrado.'}
            </p>
          )
        )}
      </div>
    </div>
  )
}
