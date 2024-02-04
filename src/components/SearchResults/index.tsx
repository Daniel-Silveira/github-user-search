import { User } from '@/types/User'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  searchResult: User
  onResultClick: (username: string) => void
}

const SearchResults: FC<Props> = ({ searchResult, onResultClick }) => (
  <div>
    <div
      key={searchResult.login}
      className="border border-gray-600 rounded p-2 flex items-start hover:cursor-pointer hover:border-slate-500"
      onClick={() => onResultClick(searchResult.login)}
    >
      <Image
        src={searchResult.avatar_url}
        alt="Image profile"
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="ml-4">
        <p className="font-bold">
          {searchResult.name}
          <span className="ml-1 text-xs font-thin">({searchResult.location})</span>
        </p>
        <span className="text-xs">{searchResult.bio}</span>
      </div>
    </div>
  </div>
)

export default SearchResults
