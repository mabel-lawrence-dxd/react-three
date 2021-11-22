let clickedSearch = undefined;

export default (position = clickedSearch) => {
    clickedSearch = {x:position.x, y:position.y};
    return clickedSearch
}