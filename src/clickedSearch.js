let clickedSearch = {x:undefined, y:undefined};

export default (position = clickedSearch) => {
    clickedSearch = {x:position.x, y:position.y};
    return clickedSearch
}