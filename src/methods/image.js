export function add(e, arr) {
    return URL.createObjectURL(e.target.files[0]);
}

export function wipe(i, arr) {
    if (arr.length === 1) return [];
    const newImage = arr.filter((img) => img !== i);

    return newImage;
}
