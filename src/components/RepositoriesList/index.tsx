import { Repository } from '@/types/User'
import { StarIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'

interface Props {
  repositories: Repository[]
  sortOrder: 'asc' | 'desc'
  onToggleSortOrder: () => void
}

export const RepositoriesList: FC<Props> = ({ repositories, sortOrder, onToggleSortOrder }) => (
  <div className="">
    <div className="flex justify-between items-center">
      <h2 className="text-md font-semibold text-white mb-2">Repositórios</h2>
      <div className="flex gap-2">
        <p className="text-xs font-bold">Ordernar por:</p>
        <button
          className="text-gray-300 cursor-pointer text-xs underline"
          onClick={onToggleSortOrder}
        >
          {sortOrder === 'desc' ? 'Mais populares' : 'Menos populares'}
        </button>
      </div>
    </div>
    <div className="text-gray-300 grid gap-4 sm:grid-cols-2">
      {repositories.map(repo => (
        <a
          key={repo.id}
          className="border border-gray-800 p-2"
          href={repo.html_url}
          target="_blank"
        >
          <div className="flex justify-between mb-2">
            <p className="text-sm font-bold">{repo.name}</p>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1">
                <StarIcon className="w-4" />
                <p className="text-sm">{repo.stargazers_count}</p>
              </div>
              {repo.language && (
                <div className="bg-indigo-800 px-2 rounded flex items-center">
                  <p className="text-sm">{repo.language}</p>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs">{repo.description}</p>
        </a>
      ))}
    </div>
  </div>
)
