import 'main.css';
import Application from 'components/Application';
import cat from  "resources/cat.jpg";

const main = async () => {
    const div = document.createElement('div');
    div.className = 'main';
    document.body.appendChild(div);
    const canvas = document.createElement('canvas');
    canvas.id = 'surface';
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    const img = document.createElement('img');
    img.src = cat;
    img.id = 'texture-image';
    img.width = 0;
    img.height = 0;
    document.body.appendChild(img);

    Application();
}

main().then(() => console.log('Started'));