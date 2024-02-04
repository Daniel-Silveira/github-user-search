import { User } from '@/types/User'
import { useState } from 'react'

export const useSearch = () => {
  const [searchResult, setSearchResult] = useState<User | undefined>()
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (searchQuery: string) => {
    if (!searchQuery) return setSearchResult(undefined)

    try {
      const response = await fetch(`https://api.github.com/users/${searchQuery}`)
      if (!response.ok) {
        throw new Error('Usuário não encontrado no GitHub')
      }

      const userData: User = await response.json()
      setSearchResult(userData)
      setError(null)
    } catch {
      setSearchResult(undefined)
      setError('Usuário não encontrado no GitHub')
    }
  }
  return { searchResult, error, fetchData }
}
