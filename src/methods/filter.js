const dataFilter = (filterData, category = "0", text = "") => {
    if (!filterData) return [];

    const result = filterData.filter(
        (card) =>
            (category === "0" || card.category._id === category) &&
            (text === "" ||
                card.title.includes(text) ||
                card.text.includes(text))
    );
    return result.reverse();
};

export { dataFilter };
