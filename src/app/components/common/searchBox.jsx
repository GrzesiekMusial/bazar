import React from "react";

import { BsFilterLeft } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { IoFilterCircleOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";

const SearchBox = ({
    categories = null,
    handleSearch = null,
    handleCategorySearch = null,
    status,
    filtr = true,
    search = true,
}) => {
    const searchOpen = () => {
        document.getElementById("searchBox").focus();
    };

    const CategoryOpen = () => {
        document.getElementById("categoryBox").focus();
    };

    return (
        <>
            {filtr &&
                ((status.category === "0" && (
                    <BsFilterLeft
                        className="icon icon--category"
                        onClick={CategoryOpen}
                    />
                )) || (
                    <IoFilterCircleOutline
                        className="icon icon--category"
                        onClick={CategoryOpen}
                    />
                ))}

            {search &&
                ((status.text === "" && (
                    <BiSearchAlt
                        className="icon icon--search"
                        onClick={searchOpen}
                    />
                )) || (
                    <AiOutlineFileSearch
                        className="icon icon--search"
                        onClick={searchOpen}
                    />
                ))}

            {filtr && (
                <select
                    className="searchBox searchBox--select"
                    id="categoryBox"
                    onChange={(e) =>
                        handleCategorySearch(e.currentTarget.value)
                    }
                    defaultValue={"0"}
                    onSelect={() =>
                        document.getElementById("searchBox").focus()
                    }
                >
                    {categories &&
                        categories.map((cat) => (
                            <option value={cat._id}>{cat.name}</option>
                        ))}
                </select>
            )}

            {search && (
                <input
                    id="searchBox"
                    className="searchBox searchBox--select"
                    onChange={(e) => handleSearch(e.currentTarget.value)}
                ></input>
            )}
        </>
    );
};

export default SearchBox;
