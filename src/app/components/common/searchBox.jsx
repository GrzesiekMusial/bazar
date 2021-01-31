import React from "react";

import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineFileSearch } from "react-icons/ai";

import config from "../../config/config.json";

const SearchBox = ({
    categories = null,
    handleSearch = null,
    handleCategorySearch = null,
    status,
    search = true,
}) => {
    const searchOpen = () => {
        document
            .getElementById("searchBox")
            .classList.toggle("searchBox--show");
    };

    return (
        <>
            {search &&
                ((status.text === 0 && (
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

            <div className="searchBox" id="searchBox">
                {categories && (
                    <>
                        <label htmlFor="categoryBox">
                            {config.info.selectCategory}
                        </label>

                        <select
                            className="searchBox--window"
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
                                categories.map((cat, index) => (
                                    <option
                                        key={`category-${index}`}
                                        value={cat._id}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                    </>
                )}
                {search && (
                    <>
                        <label htmlFor="textBox">
                            {config.info.searchText}
                        </label>

                        <input
                            id="textBox"
                            className=" searchBox--window"
                            onChange={(e) =>
                                handleSearch(e.currentTarget.value)
                            }
                        ></input>
                    </>
                )}
                <div className="searchBox--button">
                    <button className="actionBtn" onClick={() => searchOpen()}>
                        {config.buttons.search}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchBox;
