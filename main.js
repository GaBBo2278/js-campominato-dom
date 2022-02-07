//Far selezionare la difficoltà all'utente e in base
//alla sua scelta generare la griglia con i quadrati
//(EASY -> 100, MEDIUM -> 81 e HARD -> 49)
//e quando l'utente clicca il quadrato colorarlo di azzuro


document.getElementById('play').addEventListener('click', gioco);

//dichiarazione variabile
function gioco() {
    //Salvo la scelta della difficoltà
    const difficolta = document.getElementById('selettore-difficolta').value;
    
    //Definisco delle variabili utili per la creazione della griglia
    let numeroCelle = 0;

    //In base alla difficoltà definisco il numero dei quadrati
    if (difficolta == "easy") {
        numeroCelle = 100;
    } else if (difficolta == "medium") {
        numeroCelle = 81;
    } else if (difficolta == "hard") {
        numeroCelle = 49;
    }

    //Dichiarazione di una variabile e al suo interno salvo il campo di gioco
    const gridContainer = document.getElementById('grid');

    //Reset del campo di gioco
    gridContainer.innerHTML = "";

    let cellePerRiga = Math.sqrt(numeroCelle);

    for (let i = 1; i <= numeroCelle; i++) {
        //Dichiarazione di una variabile e creazione di un DIV al suo interno
        const nodo = document.createElement("div");
        //Al DIV aggiungo la classe quadrato
        nodo.classList.add('quadrato');
        //e dentro il quadrato aggiungo il numero
        nodo.textContent = i;
        //Dichiarazione della variabile e aggiungo il calcolo per la dimensione del campo
        let dimensioneCampo = `calc(100% / ${cellePerRiga})`;
        //Aggiungo la dimensione del campo al CSS del quadrato
        nodo.style.width = dimensioneCampo;
        nodo.style.height = dimensioneCampo;
        //All'evento di click richiamo funzione
        nodo.addEventListener('click', gestioneGriglia);
        //Al campo di gioco aggiungo il quadrato  
        gridContainer.appendChild(nodo);
    }
    //Dichiarazione della variabile e salvo al suo interno il return delle funzione GENERA BOMBE
    const bombe = generaBombe(numeroCelle);
    console.log(bombe);
    //Dichiarazione array vuoto
    const tentativi = [];
    //Dichiarazione della funzione
    function gestioneGriglia() {
        //Aggiungo classe clicked 
        this.classList.add('clicked');
        //Rimuovo la possibilità di cliccare ancora su un quadrato selezionato
        this.removeEventListener('click', gestioneGriglia);
        //Dichiarazione della variabie e salvo il contenuto del quadrato convertito in numero
        const cella = parseInt(this.innerText);
        //Controllo se tra i quadrati selezionati esistono le bombe generate  
        if (bombe.includes(cella)) {
            //Richiamo funzione TERMINA
            termina();
        } else {
            //Salvo nel array precedentemente dichiarato i quadrati selezionati
            tentativi.push(cella);
        }
    }
    //Dichiarazione funzione
    function generaBombe(numeroCelle) {
        //Dichiarazione array vuoto
        const bombeGenerate = [];
        //Dichiarazione ciclo 
        while (bombeGenerate.length < 16) {
            //Dichiarazione variabile e salvo al suo interno un numero che va da 1 al massimo dei quadrati
            const bomba = generaNumeriCasuali(1, numeroCelle);
            //Controllo se nel array delle bombe esiste la bomba generata casualmente 
            if (!bombeGenerate.includes(bomba)) {
                //Aggiungo al array delle bombe la controllata e generata casualmente
                bombeGenerate.push(bomba);
            }
        }
        
        return bombeGenerate;
        
    }
    //Dichiarazione della funzione
    function termina() {
        //Dichiarazione della variavile e salvo al suo interno i quadrati
        const quadrati = document.getElementsByClassName('quadrato');
        //Dichiarazione cicle
        for (let i = 0; i < quadrati.length; i++) {
            //Controllo quali bombe sono presenti nei quadrati
            if (bombe.includes(parseInt(quadrati[i].innerText))) {
                quadrati[i].classList.add('bomb');
            }
        }
    }
    
}
//Dichiarazione funzione
function generaNumeriCasuali(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}