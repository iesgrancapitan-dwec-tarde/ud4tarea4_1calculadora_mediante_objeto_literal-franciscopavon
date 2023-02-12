const buttons = [
    ["CE",
        "⬅",
        "%",
        "+"],
    ["7",
        "8",
        "9",
        "-"],
    ["4",
        "5",
        "6",
        "x"],
    ["1",
        "2",
        "3",
        "÷"],
    ["0",
        "±",
        ".",
        "="]
];

init();
let currentInputArray = [ 0 ];

function init() {
    let div = createHTMLNode("form", [
        { name: "style", value: "background-color: rgb(236, 236, 234); width: fit-content; padding: 1em; border: 3px solid rgb(204, 204, 204);" }
    ]);

    let input = createHTMLNode("input", [
        { name: "type", value: "text" },
        { name: "value", value: "0" },
        { name: "style", value: "width: 100%; font-size: 2em; text-align: right;" },
        { name: "disabled", value: "true" }
    ]);

    div.appendChild(input);
    buttons.forEach(caja => {
        let divRow = createHTMLNode("div");
        caja.forEach(boton => {
            let buttonNode = createHTMLNode("button", [
                { name: "style", value: "width: 5em; height: 3.5em;margin: 0.5em;font-size: 1em;padding: 0" }
            ], boton);
            buttonNode.addEventListener("click", event => {
                event.preventDefault();
                console.log(obtenerValorDeBoton(event));
                procesarValor(obtenerValorDeBoton(event));
            });
            divRow.appendChild(buttonNode);
        });
        div.appendChild(divRow);
    });
    document.body.appendChild(div);
}

function createHTMLNode(type, attributes = [], textContent = "") {
    let element = document.createElement(type);
    attributes.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
    });
    element.textContent = textContent;
    return element;
}

function obtenerValorDeBoton(event) {
    return event.target.textContent;
}

function procesarValor(valor) {
    let currentInputElement = document.querySelector("input");

    if (valor == "CE") {
        currentInputArray = [ 0 ];
        currentInputElement.value = "0";
        return;
    }

    if (valor == "=") {
        //Se realizará en el futuro
        currentInputArray = [ 0 ];
        currentInputElement.value = "0";
        return;
    }

    if (valor == "⬅") {
        if (isNaN(currentInputArray[currentInputArray.length - 1])) {
            currentInputArray.pop();
        }
        else {
            let ultimoElemento = currentInputArray[currentInputArray.length - 1];
            if (ultimoElemento.length == 1) {
                currentInputArray.pop();
            } else {
                currentInputArray[currentInputArray.length - 1] = ultimoElemento.substring(0, ultimoElemento.length - 1);
            }
        }
        currentInputElement.value = currentInputArray.join("");
        return;
    }

    if (currentInputArray.length == 1 && currentInputArray[0] == "0") {
        if (valor == ".") {
            currentInputArray[0] = "0.";
        } else if (!isNaN(valor)) {
            currentInputArray[0] = valor;
        } else {
            currentInputArray.push(valor);
        }
    } else {
        let ultimoElemento = currentInputArray[currentInputArray.length - 1];
        if (!isNaN(ultimoElemento)) {
            if (!isNaN(valor)) {
                currentInputArray[currentInputArray.length - 1] = ultimoElemento + valor;
            }
            else if (valor == "." && !ultimoElemento.includes(".")) {
                currentInputArray[currentInputArray.length - 1] = ultimoElemento + valor;
            }
            else {
                currentInputArray.push(valor);
            }
        } else {
            currentInputArray.push(valor);
        }
    }

    currentInputElement.value = currentInputArray.join("");
}