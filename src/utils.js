function generateID(items) {
    const lastID = items.length > 0 ? items.at(-1).id : 0;
    return lastID + 1
}

export { generateID };