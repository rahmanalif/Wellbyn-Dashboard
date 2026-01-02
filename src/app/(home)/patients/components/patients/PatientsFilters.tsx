import { Search } from "lucide-react";
import { FilterDropdown } from "./FilterDropdown";

interface PatientsFiltersProps {
  onGenderChange: (value: string) => void;
  onVisitTypeChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  selectedGender: string;
  selectedVisitType: string;
  selectedSortBy: string;
}

export function PatientsFilters({
  onGenderChange,
  onVisitTypeChange,
  onSortByChange,
  onSearchChange,
  selectedGender,
  selectedVisitType,
  selectedSortBy,
}: PatientsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 lg:gap-6 px-3">
      <FilterDropdown
        title="Gender"
        options={["Male", "Female", "Other"]}
        onSelect={onGenderChange}
        selected={selectedGender}
      />
      <FilterDropdown
        title="Visit Type"
        options={["In-person", "Virtual", "Follow-up", "Urgent Care", "Other"]}
        onSelect={onVisitTypeChange}
        selected={selectedVisitType}
      />
      <FilterDropdown
        title="Sort by"
        options={["name_asc", "name_desc", "lastVisit_asc", "lastVisit_desc"]}
        onSelect={onSortByChange}
        selected={selectedSortBy}
      />

      <div className="relative flex-1 min-w-[300px] max-w-md ml-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Look for patient name"
          className="w-full shadow-sm rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}