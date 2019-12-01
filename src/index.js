import 'main.css';
import Application from 'components/Application';

const main = async () => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode('Hello World!');
    div.className = 'main';
    h1.appendChild(h1Text);
    document.body.appendChild(div);
    div.appendChild(h1);
    const canvas = document.createElement('canvas');
    canvas.id = 'surface';
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);

    Application();
}

main().then(() => console.log('Started'));