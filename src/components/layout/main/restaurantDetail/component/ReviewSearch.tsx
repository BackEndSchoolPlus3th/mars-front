import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';

interface ReviewSearchProps {
  onSearch: (keyword: string) => void;
}

const ReviewSearch: React.FC<ReviewSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="리뷰 검색..."
        className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default ReviewSearch;