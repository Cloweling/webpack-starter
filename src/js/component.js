import '../css/component.css';

const component = () => {
    const root = document.getElementsByTagName('root')[0];
    const span = document.createElement('span');

    span.innerHTML = `I'm Component`;
    root.append(span);
}

export default component;