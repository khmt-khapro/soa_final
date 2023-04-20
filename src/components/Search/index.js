import React, { useState } from "react";

function Search({ placeHolder, customClass }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("search: ", search);
    }
  };

  return (
    <div className={`relative h-[40px] ${customClass}`}>
      <input
        className={`pl-3 border-gray-600 rounded-md border-[0.5px] w-full h-full focus:outline-none`}
        type="text"
        name="search"
        id="search"
        placeholder={placeHolder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      />
      <i
        onClick={() => console.log(search)}
        className="fa-solid fa-magnifying-glass absolute top-[50%] -translate-y-[50%] right-4 text-lg cursor-pointer"
      ></i>
    </div>
  );
}

export default Search;
