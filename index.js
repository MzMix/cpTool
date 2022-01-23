const codePreview = {
    linesShown: 0,
    lines: [],
    target: {},
    length: 0
}

function previewFile() {
    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        codePreview.lines = reader.result.split(/\r\n|\n/); //Stworzenie listy z linijkami z pliku
        codePreview.length = codePreview.lines.length - 1;
        codePreview.target = document.getElementById('codeHere'); //Wybranie pola z kodem
        codePreview.target.innerHTML = ""; //Czyszczenie pola z kodem

        showNextLine(); //Wyswietlenie pierwszej linijki
    }, false);

    if (file) {
        reader.readAsText(file);
    }
}

function showNextLine() {

    if (codePreview.linesShown < codePreview.length) {

        let code = document.createElement('CODE');
        code.id = `line${codePreview.linesShown}`;
        code.classList.add('language-py');
        if (codePreview.lines[codePreview.linesShown] == "") {
            code.innerHTML = "\n";
        } else {
            code.innerHTML = codePreview.lines[codePreview.linesShown];
            code.innerHTML += '\n';
        }
        codePreview.target.append(code);

        Prism.highlightAll();
        codePreview.linesShown++;
    }
}

function showLastLine() {
    if (codePreview.linesShown > 0) {

        let lastElement = document.getElementById(`line${codePreview.linesShown-1}`);
        codePreview.target.removeChild(lastElement);

        // Prism.highlightAll();
        codePreview.linesShown--;
    }
}