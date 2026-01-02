import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterDropdownProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  selected?: string;
}

export function FilterDropdown({ title, options, onSelect, selected }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Display selected value or title
  const displayText = selected || title;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg shadow-sm bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        {displayText} <ChevronDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 rounded-lg bg-white shadow-sm border border-gray-200">
          <div className="py-1">
            {/* Clear filter option */}
            {selected && (
              <button
                className="block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition-colors text-gray-500"
                onClick={() => {
                  onSelect("");
                  setIsOpen(false);
                }}
              >
                Clear filter
              </button>
            )}
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition-colors ${
                  selected === option ? "bg-blue-50 text-blue-600 font-medium" : ""
                }`}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}