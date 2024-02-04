'use client'

import { RepositoriesList } from '@/components/RepositoriesList'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'

const UserDetailsPage = ({ params: { username } }: { params: { username: string } }) => {
  const { userDetails, sortedRepositories, sortOrder, fetchUserDetails, handleToggleSortOrder } =
    useUser()

  useEffect(() => {
    if (username) {
      fetchUserDetails(username)
    }
  }, [username])

  if (!username || !userDetails) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center sm:py-6">
      <div className="bg-gray-900 w-full px-8 py-4 sm:w-3/4 sm:rounded-lg">
        <h1 className="text-lg font-extrabold text-white mb-4 text-center sm:text-left">
          Detalhes do Usuário
        </h1>
        <img
          src={userDetails.avatar_url}
          alt="Avatar do usuário"
          className="w-16 h-16 rounded-full mb-4 mx-auto"
        />
        <h3 className="text-xl font-semibold text-white mb-1 text-center">{userDetails.login}</h3>
        <div className="flex justify-center gap-4">
          <p className="text-gray-300 text-center mb-2">Seguidores: {userDetails.followers}</p>
          <p className="text-gray-300 text-center mb-2">Seguindo: {userDetails.following}</p>
        </div>
        {userDetails.email && (
          <p className="text-gray-300 text-center mb-2">E-mail: {userDetails.email}</p>
        )}
        {userDetails.bio && (
          <div className="flex justify-center">
            <p className="text-gray-300 text-center mb-4 sm:w-2/4">Bio: {userDetails.bio}</p>
          </div>
        )}

        {userDetails.repositories && userDetails.repositories.length > 0 && (
          <RepositoriesList
            repositories={sortedRepositories}
            sortOrder={sortOrder}
            onToggleSortOrder={handleToggleSortOrder}
          />
        )}
      </div>
    </div>
  )
}

export default UserDetailsPage
