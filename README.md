# ONVYRA

Sito vetrina statico per uno studio che progetta e pubblica siti web classici e immersivi.

## Pubblicazione su GitHub Pages

1. Crea un repository GitHub vuoto.
2. Carica **il contenuto di questa cartella** nella radice del repository: `index.html`, `assets`, `.nojekyll` e questo file.
3. In GitHub apri **Settings → Pages**.
4. In **Build and deployment** scegli **Deploy from a branch**.
5. Seleziona il branch `main`, cartella `/(root)`, quindi salva.

Il sito non richiede compilazione, npm o servizi esterni. Tutte le risorse usate dalla pagina sono incluse nel progetto.

## Personalizzazione rapida

Apri `assets/config.js` e compila i dati disponibili:

```js
window.ONVYRA_CONFIG = {
  contactEmail: "ciao@tuodominio.it",
  legalName: "Ragione sociale",
  vatNumber: "IT00000000000",
  address: "Città, Italia",
  portfolio: []
};
```

Se `contactEmail` rimane vuoto, il modulo non spedisce dati: genera una richiesta che l'utente può copiare o scaricare. Se lo compili, compare anche il pulsante che apre il programma di posta con oggetto e testo già preparati.

### Aggiungere un sito pubblicato al portfolio

Inserisci un oggetto nell'array `portfolio`:

```js
portfolio: [
  {
    name: "Nome cliente",
    category: "Hospitality",
    description: "Breve descrizione del progetto.",
    style: "immersivo",
    url: "https://www.esempio.it",
    image: "assets/cliente.webp"
  }
]
```

Valori ammessi per `style`: `classico` oppure `immersivo`. Copia l'immagine nella cartella `assets`; se `image` è vuoto, la scheda funziona comunque. I due progetti presenti nella sezione concept sono dimostrazioni con identità immaginarie.

## Struttura

- `index.html` — contenuti e struttura della pagina
- `assets/style.css` — grafica responsive, layout ed effetti
- `assets/app.js` — animazioni su scroll, meteoriti, filtri e modulo
- `assets/scene.js` — movimento della mascotte, occhi interattivi e risposta allo scroll
- `assets/onvyra-jellyfish.webp` — mascotte originale ONVYRA con sfondo trasparente
- `assets/config.js` — contatti, dati legali e progetti pubblicati

## Controlli inclusi

- navigazione tastiera e focus visibile
- testi alternativi e dialog accessibili
- modalità “Riduci movimento” nel footer
- rispetto automatico di `prefers-reduced-motion`
- animazione leggera senza dipendenze esterne
- layout adattato a desktop, tablet e smartphone

## Nota privacy

Il sito non include analytics, cookie di profilazione o invio automatico di dati. Prima di pubblicarlo per un'attività reale, completa i dati del titolare e fai verificare l'informativa privacy in base agli strumenti che aggiungerai.
