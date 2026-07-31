import { Filter as FilterIcon } from 'lucide-react';

const Filter = () => {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-[#1e1e2d] hover:bg-gray-50 dark:hover:bg-[#2a2a3b] text-gray-700 dark:text-gray-300 font-semibold text-sm transition-colors duration-200">
      <FilterIcon size={18} />
      <span>Filter</span>
    </button>
  );
};

export default Filter;
