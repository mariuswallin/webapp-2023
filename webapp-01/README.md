For å starte applikasjonen trenger vi et fundament å jobbe med. Rammen for applikasjonen er basert på HTML og CSS.

Ideelt sett bør vi ha et design å arbeide etter, ha gjennomført brukerundersøkelser, identifisert brukerbehov og utfordringer, opprettet "jobs to be done" med mer.

I dette kurset fokuserer vi på selve prosessen med å lage applikasjonen. Vi begynner med en enkel wireframe og noen akseptansekriterier. Disse kriteriene vil veilede oss gjennom hele applikasjonsutviklingen og er høy-nivå retningslinjer for hva brukeren skal kunne gjøre i applikasjonen. Etter hvert som vi bygger videre på applikasjonen, vil vi også inkludere modelltegninger og flytdiagrammer for å bedre forstå hvordan applikasjonen er satt sammen.

## **Wireframe**

Som nevnt tidligere, er en skisse eller et design viktig å ha. Dette gjør det mulig for ulike interessenter å diskutere hva som skal utvikles, samtidig som de får et inntrykk av innholdet som må inkluderes. Det er viktig å merke seg at denne skissen ikke nødvendigvis er endelig, da den kan endre seg i løpet av prosessen. Skissen bør være enkel for å unngå at visuelle elementer som farger og fonter tar mer oppmerksomhet enn selve løsningen.

**TODO: Legg til skisse av wireframe**

## **Akseptansekriterier**

**TODO: Fyll inn akseptansekriterier**

## **Startmal**

For å komme i gang, kan det være nyttig å ha en startmal som inkluderer grunnleggende elementer en applikasjon trenger. Hvis vi jobbet med en ren terminalapplikasjon, ville malen vært enklere. Men ettersom vi utvikler en nettapplikasjon, er det noen ekstra filer og oppsett som er nødvendige. Startmalen inkluderer følgende:

- Eslint-konfigurasjon for å sikre at koden er skrevet korrekt.
- Prettier for formatering av koden, noe som gjør den mer lesbar og forståelig.
- Konfigurasjon for pnpm for å håndtere pakker og konflikter mellom dem.
- Tsconfig for TypeScript.
- Vite-konfigurasjon for bygging og utvikling.
- Mapper: "src" for JavaScript og stiler, "tests" for tester.

## **HTML**

Basert på wireframen trenger vi:

- Navigasjon
  - Hjemmeside
  - Side for å opprette en applikasjon
  - Side for å vise applikasjoner
  - Side for å vise svar på søknader
  - Side for å vise en enkelt søknad
  - Side for å "svare" på en søknad
  - Side for å opprette bruker
- Nødvendige elementer
  - Kort
  - Tabell
  - Knapp
  - Skjema for å hente data

I begynnelsen fokuserer vi bare på siden der en søknad skal opprettes, samt hvilke felt som er påkrevd. De andre sidene vil bli prioritert senere for å unngå at prosjektomfanget blir for stort. Navigasjonen blir også foreløpig utelatt, da den ikke alltid er like enkel å håndtere i nettapplikasjoner.

# Skallet på applikasjonen for “lage søknad”

Grundig strukturering av nettsiden begynner med HTML-koden. Det finnes ulike tilnærminger til dette, og koden jeg presenterer her er en start. Under oppsettet støtte jeg på utfordringen med bruk av en rekke **`div`**-elementer. Selv om **`<div>`**-elementet ikke har en spesifikk semantikk, er det passende når koden/strukturen mangler klar semantikk. I tillegg til **`<div>`** benyttes følgende HTML-elementer:

- **`<main>`** for hovedinnholdet.
- **`<nav>`** for navigasjon.
- Overskriftselementer (**`<h1>`**, **`<h2>`**, osv.) for titler.
- **`<section>`** for å organisere innholdet.
- **`<footer>`** for bunntekst.
- **`<aside>`** for tilleggsinformasjon.
- **`<button>`** for knapper.
- Listeelementer (**`<ul>`**, **`<ol>`**, **`<li>`**) for lister.
- **`<form>`** for skjemaer.
- Inndatapunktelementer (**`<input>`**, **`<select>`**, **`<label>`**) for inndatafelt.
- **`<img>`** for bilder.

For å holde koden ren i denne fasen, vil deler av HTML-en ikke bli gjentatt. Kommentarene nedenfor forklarer begrunnelsen bak markupen slik den foreligger nå.

# CSS

For å oppnå det ønskede utseendet på nettsiden, må vi benytte oss av styling. Når vi skal style en webapplikasjon som er bygget opp med den tidligere nevnte HTML-koden, er det viktig å vurdere strukturen på CSS-en. Selv om det har gått en stund siden jeg sist måtte tenke på dette (jeg vil utdype dette nærmere i delen om Tailwind), er det fremdeles mange prosjekter som krever tradisjonell CSS.

En måte å strukturere CSS-en på er ved å opprette filer som beskriver hva de stiliserer, for eksempel "Button". I tillegg kan vi ha filer som tar for seg større deler av applikasjonen, som for eksempel "Panel" (dette kan være sidefeltene i applikasjonen).

Det kan også være en god idé å opprette egne mapper som tar for seg ulike funksjoner eller egenskaper. Dette innebærer å ha CSS som styler en bestemt funksjon i applikasjonen, for eksempel "form-create" som håndterer alt relatert til spørsmålene.

Generelt sett er jeg en tilhenger av prinsippene fra Atomic Design, som handler om å gruppere applikasjonen i ulike komponenter. Vi vil utforske dette konseptet nærmere når vi begynner å jobbe med rammeverket for frontend.

### Atomic design

Atomic Design er en metode som beskriver struktureringen av designsystemer. Denne tilnærmingen ble utviklet av designeren og utvikleren Brad Frost, som lot seg inspirere av kjemien. Målet var å skape strukturerte og koherente designsystemer ved å sammenligne grensesnittstrukturer med atomer og molekyler. Atomene fungerer som byggesteiner i materie, og de kan kombineres for å danne molekyler. På samme måte kan designelementer som knapper og typografi kombineres for å danne mer komplekse grensesnitt og komponenter.

Metoden anbefaler å dele designsystemer inn i fem nivåer:

- **Atomer:** Enkle byggeklosser som tilsvarer HTML-tagene, som input-felt eller knapper.
- **Molekyler:** Grupper av atomer som danner gjenbrukbare komponenter, for eksempel en kombinasjon av et input-felt og en søkeknapp.
- **Organismer:** Sammensetninger av molekyler som utgjør deler av brukergrensesnittet, som for eksempel en navigasjonslinje øverst på en nettside.
- **Maler:** Inkluderer organismer som settes sammen for å danne sider, med mulighet for å bruke plassholdertekst og -bilder.
- **Sider:** Konkrete eksempler på maler hvor plassholdertekst og -bilder erstattes med faktisk innhold.

Gjennom å følge disse prinsippene kan designere skape fleksible og skalerbare designsystemer. På samme måte som atomer og molekyler kan kombineres for å danne en utallig mengde forbindelser med varierte egenskaper, kan designelementer kombineres på ulike måter for å skape mangfoldige og effektive brukergrensesnitt.
