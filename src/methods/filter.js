const dataFilter = (filterData, category = null, text = null, user = null) => {
    if (!filterData) return [];

    if (user)
        filterData = filterData.filter(
            (card) => user === (card.author && card.author._id)
        );

    if (category !== 0) {
        filterData = filterData.filter(
            (card) => category === (card.category && card.category._id)
        );
    }

    if (text !== 0)
        filterData = filterData.filter(
            (card) =>
                card.title.toLowerCase().includes(text.toLowerCase()) ||
                card.text.toLowerCase().includes(text.toLowerCase())
        );

    return filterData;
};

export { dataFilter };
