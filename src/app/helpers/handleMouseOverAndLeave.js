export function handleMouseOver(index, hoveredItems, setHoveredItems) {
    const newHoveredItems = [...hoveredItems];
    newHoveredItems[index] = true;
    setHoveredItems(newHoveredItems);
}

export function handleMouseLeave(index, hoveredItems, setHoveredItems) {
    const newHoveredItems = [...hoveredItems];
    newHoveredItems[index] = false;
    setHoveredItems(newHoveredItems);
}
