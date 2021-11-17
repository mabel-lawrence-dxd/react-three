let clickedMessage = '';

export default (msg = clickedMessage) => {
    console.log('IN CLICKED MESSAGE: ',msg)
    clickedMessage = msg;
    return clickedMessage
}