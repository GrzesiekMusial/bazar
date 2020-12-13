import { BsFilterLeft } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

const SearchBox = ({
    categories = null,
    handleSearch = null,
    handleCategorySearch = null,
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
            {filtr && (
                <BsFilterLeft
                    className="icon icon--category"
                    onClick={CategoryOpen}
                />
            )}
            {search && (
                <BiSearchAlt
                    className="icon icon--search"
                    onClick={searchOpen}
                />
            )}
            {filtr && (
                <select
                    className="searchBox searchBox--select"
                    id="categoryBox"
                    onChange={(e) =>
                        handleCategorySearch(e.currentTarget.value)
                    }
                    defaultValue={"WSZYSTKIE"}
                    onSelect={() =>
                        document.getElementById("searchBox").focus()
                    }
                >
                    {["WSZYSTKIE", ...categories].map((cat) => (
                        <option value={cat}>{cat}</option>
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
