import React from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  currentUnit: "c" | "f";
  setCurrentUnit: (unit: "c" | "f") => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  currentUnit,
  setCurrentUnit,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <header className="flex justify-between items-center py-4 mb-6 flex-wrap gap-4">
      {/* Logo */}
      <div className="logo flex items-center gap-2 text-2xl font-md text-primary">
<img width="45" height="45" src="public\logo.png" alt="logo"/>        <span>Weather Dashboard</span>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full sm:w-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search for a city..."
          className="flex-1 border-none outline-none text-base px-2"
        />
        <button
          onClick={onSearch}
          className="bg-primary text-white rounded-full w-9 h-9 flex items-center justify-center"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Unit Toggle */}
      <div className="bg-blue-200 rounded-full p-1 flex items-center">
        <button
          className={`px-4 py-2 rounded-full font-medium transition ${
            currentUnit === "c"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600"
          }`}
          onClick={() => setCurrentUnit("c")}
        >
          °C
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition ${
            currentUnit === "f"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600"
          }`}
          onClick={() => setCurrentUnit("f")}
        >
          °F
        </button>
      </div>
    </header>
  );
};

export default Header;
