import jacket from "../../../assets/media/jacket.png";
import krawat from "../../../assets/media/krawat.png";
import opony from "../../../assets/media/opony.png";

const data = {
    products: [
        {
            id: 0,
            title: "Czerwona kurtka na sprzedaż!",
            image: [jacket],
            text:
                "Ta kurtka może być Twoja!!!!! ma świetne kieszenie każdy się w nią wzmieści",
            nick: "monica",
            price: 200,
            category: "MODA",
        },
        {
            id: 1,
            title: "Oddam",
            image: [krawat],
            text: "oddam za darmo",
            nick: "monica",
            price: 200,
            category: "MODA",
        },
        {
            id: 2,
            title: "TITLE: OPONY",
            image: [opony, opony, jacket, krawat, jacket, opony, opony],
            text: "OPIS: stare opony",
            price: "150",
            nick: "monica",
            data: "19:30",
            category: "INNE",
        },
        {
            id: 3,
            title: "TITLE: OPONY",
            text: "OPIS: stare opony",
            nick: "monica",
            data: "19:30",
            category: "INNE",
        },
    ],
    board: [
        {
            id: 0,
            title:
                "TITLE: Red Jsdasda  sdaasd sadas dsad  as asasd asd asd asdacket for for FREE!",
            user: "John",
            text:
                "Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę! Znaleziono zieloną kurtkę!",
        },
        {
            id: 1,

            title: "PROSZE SPRZAATAC PO PSIE!",
            user: "Monica",
            text: "Trawa podeptana...",
        },
        {
            id: 2,

            title: "znalazłem opony przy drodze!",
            user: "Lei",
            image: [opony],
            text: "dfsfs",
        },
    ],
    categories: ["INNE", "SPIŻARNIA", "MODA", "ELEKTRONIKA", "DOMOWE"],
};

export function loadProducts() {
    return data.products;
}

export function loadBoards() {
    return data.board;
}

export function loadCategories() {
    return data.categories;
}

export function deleteBoard(id, props = null, redirect = null) {
    const newData = data.board.filter((card) => card.id !== id);
    data.board = newData;
    if (props) return props.history.push(redirect);
    return newData;
}

export function deleteProduct(id, props = null, redirect = null) {
    const newData = data.products.filter((card) => card.id !== id);
    data.products = newData;
    if (props) return props.history.push(redirect);
    return newData;
}

export function addBoard(item, props = null) {
    item.id = data.board.length;
    data.board.push(item);
    if (props) return props.history.push("/board");
    return data.board;
}

export function addProduct(item, props = null) {
    item.id = data.products.length;
    data.products.push(item);
    if (props) return props.history.push(`/bazar/product/${item.id}`);
    return data.products;
}
