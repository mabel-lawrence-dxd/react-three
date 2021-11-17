import SceneManager from './SceneManager';

export default (container) => {
    const canvas = createCanvas(document, container);
    const sceneManager = new SceneManager(canvas);
    let clickedPic;

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');     
        container.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        window.onmousedown = mouseClick;
        resizeCanvas();	
    }

    function resizeCanvas() {        
        canvas.style.width = '100%';
        canvas.style.height= '100%';
        
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        sceneManager.onWindowResize()
    }

    function mouseClick(event) {
        clickedPic = sceneManager.onMouseClick(event);
        console.log('three entry point clicked pic: ', clickedPic)
    }

    function render() {
        requestAnimationFrame(render);
        sceneManager.animate();
    }
}