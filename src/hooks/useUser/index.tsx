import { Repository, User } from '@/types/User'
import { useState } from 'react'

export const useUser = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [sortedRepositories, setSortedRepositories] = useState<Repository[]>([])

  const fetchUserDetails = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) {
        throw new Error('Usuário não encontrado no GitHub')
      }

      const userData: User = await response.json()

      const reposResponse = await fetch(userData.repos_url)
      const reposData: Repository[] = await reposResponse.json()

      const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count)

      setUserDetails({ ...userData, repositories: sortedRepos })
      setSortedRepositories(sortedRepos)
    } catch {
      setUserDetails(null)
    }
  }

  const handleToggleSortOrder = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc'
    setSortOrder(newSortOrder)

    const sortedRepos = [...sortedRepositories].sort((a, b) =>
      newSortOrder === 'desc'
        ? b.stargazers_count - a.stargazers_count
        : a.stargazers_count - b.stargazers_count
    )

    setSortedRepositories(sortedRepos)
  }

  return {
    userDetails,
    sortedRepositories,
    sortOrder,
    fetchUserDetails,
    handleToggleSortOrder,
  }
}
