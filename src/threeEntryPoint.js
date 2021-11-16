import SceneManager from './SceneManager';

export default container => {
    const canvas = createCanvas(document, container);
    const sceneManager = new SceneManager(canvas);

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');     
        container.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        window.onmousedown = mouseClick
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
        sceneManager.onMouseClick(event);
    }

    function render() {
        requestAnimationFrame(render);
        sceneManager.animate();
    }

    return 'hello'
}