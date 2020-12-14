const dataFilter = (filterData, category = "WSZYSTKIE", text = "") => {
    const result = filterData.filter(
        (card) =>
            (category.toUpperCase() === "WSZYSTKIE" ||
                card.category.toUpperCase() === category.toUpperCase()) &&
            (text === "" ||
                card.title.toUpperCase().includes(text.toUpperCase()) ||
                card.text.toUpperCase().includes(text.toUpperCase()))
    );

    return result;
};

export { dataFilter };
