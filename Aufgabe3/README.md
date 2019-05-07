# 3. Aufgabe - serverseitige Anwendung erstellen

Die dritte Aufgabe beschäftigt sich mit dem **GTA-Server**. Der GTA-Server
verwaltet die GeoTags und bietet dem Client Funktionen zum Abfragen und
Hinzufügen. Dabei kann der Server das HTML-Gerüst der App dynamisch aus einem
**EJS-Template** erzeugen, um darin die aktuellen GeoTags und Koordinaten
einzubetten. Daneben stellt der Server **statische Dateien** zum Abruf per HTTP
zur Verfügung. Dazu gehören z.B. Bilder und das clientseitige Skript.

Die Aufgabe übt die Programmierung von **Konstruktoren** sowie **Modulen**,
**Funktionen** und **Arrays** mit **JavaScript** ein. Zudem werden serverseitige
JavaScript-Technologien - insbesondere der Aufbau von **Express Apps**, die
Erstellung einfacher **Express Routen**, sowie die Verwendung von **EJS
Templates** - vertieft.

## 3.1. Vorbereitung

Aktualisieren Sie zunächst das Github Repository
[https://github.com/zirpins/vs1lab](https://github.com/zirpins/vs1lab). Dann
gehen Sie wie folgt vor:

### 3.1.1 Vorherige Lösungen übernehmen

1. Kopieren Sie die Datei `Aufgabe1/gta_v1/public/stylesheets/style.css` aus
   Aufgabe 1 nach `Aufgabe3/gta_v3/public/stylesheets/style.css`.
2. Kopieren Sie die Datei `Aufgabe2/gta_v2/public/javascripts/geotagging.js` aus
   Aufgabe 2 nach `Aufgabe3/gta_v3/public/javascripts/geotagging.js`.

### 3.1.2 EJS Template aus HTML-Dokument ableiten

1. Öffnen sie `Aufgabe3/gta_v3/views/gta.ejs` in ihrem **Editor**.
2. Kopieren sie den Inhalt `Aufgabe2/gta_v2/public/index.html` in die EJS-Datei
   und **ersetzen** sie die **Beispieleinträge der Discovery-Liste** mit den
   folgenden Zeilen:

```HTML
    <% if (taglist !== undefined) taglist.forEach(function(gtag) { %>
        <li><%= gtag.name %> ( <%= gtag.latitude %>,<%= gtag.longitude %>) <%= gtag.hashtag %> </li>
    <% }); %>
```

### 3.1.3 Node-js vorbereiten

1. Führen sie `npm install` im Verzeichnis `Aufgabe3/gta_v3/` aus, um die
   nötigen Module zu laden und zu installieren.
2. Um die App später zu starten, führen sie `npm start` im Verzeichnis
   `Aufgabe3/gta_v3/` aus und öffnen sie
   [http://localhost:3000](http://localhost:3000) im **Browser**.

## 3.2. Teilaufgaben

Die Aufgabe besteht nun in der Entwicklung der Serverskripte. Die Clientseite
(Browserskript) muss nur leicht angepasst werden. Optional erfordert die
Darstellung einer Karte mit Markern noch eine Erweiterung.

### 3.2.1 Implementierung des Servers

Der Server besteht in dieser Aufgabe aus einem **Express.js** Serverskript zur
Verarbeitung von HTTP-Requests und einem **EJS Template** zur dynamischen
Erzeugung von neuen HTML-Seitendarstellungen.

#### 3.2.1.a Serverskript fertigstellen

Die erste (und umfangreichste) Teilaufgabe besteht in der Vervollständigung
einzelner Teile im Serverskript `Aufgabe3/gta_v3/gta-server.js`. Die
Anforderungen stehen jeweils als Kommentare im Sourcecode. Hier sind auch
Hinweise auf relevante Stellen in der Express Dokumentation enthalten. Im
einzelnen gibt es folgende Teilaufgaben:

- Backend Funktionen zur Verwaltung von GeoTags
  - Einen **Konstruktor für GeoTag Objekte** erstellen
  - Ein Modul für die **Speicherung und Suche von GeoTag Objekten** erstellen
- Server Endpunkte
  - **Statische Dateien** bereitstellen
  - Die **1. Route** `/` zur **Erzeugung der Einstiegsseite** ist vorgegeben
    (hier sieht man, wie mit EJS eine HTML-Seite erzeugt wird)
  - Eine **2. Route** `/tagging` zur **Speicherung von GeoTags** erstellen
  - Eine **3. Route** `/discovery` zur **Abfrage von GeoTags** erstellen

#### 3.2.1.a Server Template erweitern

Die Routen im Serverskript verwenden das EJS-Template
`Aufgabe3/gta_v3/views/gta.ejs`, um die nächste Sicht der Browser-GUI als
HTML-Dokument zu erstellen. EJS-Direktiven zur Füllung der Ergebnisliste haben
wir darin schon vorbereitet (siehe 3.1.2).

**Aufgabe:** Ergänzen sie nun noch EJS-Direktiven, um in die entsprechenden
Eingabefelder im Tagging- und Filter-Formular `value`-Attribute für die
aktuellen Koordinatenwerte einzusetzen. Die Koordinatenwerte müssen sie dazu aus
dem Skript an das Template übergeben (Bei der Anfrage liefert der Client seine
aktuellen Koordinaten immer als Formularfelder mit).

### 3.2.2 Anpassung des Clients

Wir wollen nun die Client-Implementierung noch etwas optimieren: Die Abfrage der
GeoLocation API (jedes Mal nach dem Laden einer Seite) erzeugt eine erhebliche
Latenz und stört damit bei wiederholtem Aufruf den Interaktionsfluss. Wir wollen
daher die einmal abgerufenen Koordinaten wiederverwenden.

Die Lösung haben wir in der letzten Teilaufgabe schon vorbereitet: Der Server
schreibt die Koordinaten, die er beim Aufruf aus den Formularfeldern ausliest,
wieder zurück, so dass diese beim nächsten Seitenaufbau im Client schon
eingetragen sind. Wir brauchen also in der `updateLocation`-Funktion im
`gtaLocator`-Modul nur noch zu testen, ob schon Koordinaten in den
Formularfeldern stehen und nur wenn dies *nicht* der Fall ist die GeoLocation
API aufrufen.

**Aufgabe:** Erweitern Sie die `updateLocation`-Funktion im `gtaLocator`-Modul
des Client-Skripts `Aufgabe3/gta_v3/public/javascripts/geotagging.js`. Lesen sie
dort die geeigneten Formularfelder im DOM aus und testen sie, ob schon
Koordinaten eingetragen sind. Rufen sie die `tryLocate`-Funktion nur dann auf,
wenn es die Situation erfordert.

### 3.2.3 `data-*`-Attribute und Map Marker

Die `getLocationMapSrc`-Funktion im `gtaLocator`-Modul besitzt einen Parameter,
dem man einen Array von GeoTag Objekten übergeben kann. Wenn dieser vorliegt,
werden an den Positionen der GeoTags Marker in die Karte eingetragen, d.h. die
Tags werden auf der Karte sichtbar.

Das Problem ist nun, im Client Skript das Array mit GeoTag Objekten verfügbar zu
machen. Diese Information liegt im Server schon vor. Wie aber kommen die Daten
zum Client? In der nächsten Aufgabe werden wir zu diesem Zweck AJAX-Abfragen
einführen. An dieser Stelle wollen wir noch eine andere Variante kennenlernen:

Der Server kann das Array mit GeoTag Objekten als `data-*`-Attribut einem
geeigneten Element beifügen. Erweitern sie dazu das EJS-Template derart, dass es
dem `img`-Element der Karte ein `data-tags`-Attribut beifügt. In das Attribut
schreiben sie das Array mit GeoTag Objekten als JSON-String. Für ein Array
`taglist` erzeugt der Aufruf `JSON.stringify(taglist)` den JSON-String.

Auf der Clientseite können sie dann das Attribut aus dem DOM lesen und den
string wieder in ein Array Objekt umwandeln. Für einen JSON-String
`taglist_json` erzeugt der Aufruf `JSON.parse(taglist_json)` das
korrespondierende JavaScript Array Objekt. Dieses Array Objekt können sie der
`getLocationMapSrc`-Funktion als Parameter übergeben.

**Aufgabe:** Erweitern Sie den Aufruf von der `getLocationMapSrc`-Funktion und
übergeben sie neben der aktuellen Position des CLients zusätzlich einen Array
von GeoTag Objekten des aktuellen Suchergebnisses im Discovery Widget.