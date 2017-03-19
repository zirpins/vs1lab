# 4. Aufgabe - Interaktion per REST und AJAX
In der vierten Aufgabe wird die Geotagging App aus Aufgabe 3 weiterentwickelt. Konkret sollen die Speicherung und Filterung von Geotags nun aus dem Browser mittels Ajax erfolgen (statt dem Formularmechanismus) und auf der Serverseite durch eine REST-API realisiert werden.

Am Ende soll die Funktionalität der Anwendung identisch erhalten bleiben, nur dass die Interaktion mit dem Server per Ajax wesentlich schneller und ohne störenden Aufbau einer neuen Seite abläuft.

## 4.1. Vorbereitung
Auch für diese Aufgabe existiert ein Grundgerüst auf Github: [https://github.com/zirpins/vs1lab/](https://github.com/zirpins/vs1lab/). Aktualisieren Sie zunächst das Repository auf ihrem Entwicklungsrechner. Die Dateien der Aufgabe liegen im Ordner `Aufgabe4`.

### 4.1.1 Vorherige Lösungen übernehmen
1. Kopieren Sie das Stylesheet `Aufgabe1/gta_v1/public/stylesheets/style.css` aus Aufgabe 1 nach `Aufgabe4/gta_v4/public/stylesheets/style.css`.
2. Kopieren Sie das Client Skript `Aufgabe3/gta_v3/public/javascripts/geotagging.js` aus Aufgabe 3 nach `Aufgabe4/gta_v4/public/javascripts/geotagging.js`.
3. Kopieren Sie das Server Skript `Aufgabe3/gta_v3/gta-server.js` aus Aufgabe 3 nach `Aufgabe4/gta_v4/gta-server.js`.

### 4.1.2 Node-js vorbereiten
1. Führen sie `npm install` im Verzeichnis `Aufgabe4/gta_v4/` aus, um die nötigen Module zu laden und zu installieren.
2. Um die App später zu starten führen sie `npm start` im Verzeichnis `Aufgabe4/gta_v4/` aus und öffnen sie [http://localhost:3000](http://localhost:3000).

## 4.2. Teilaufgaben
Die Umstellung auf Ajax Aufrufe und REST Schnittstelle betrifft Client- und Serverseite.

### 4.2.1 Clientseite (Browser)
Für den Ajax Aufruf im Browser müssen Sie ihr Javascript `Aufgabe4/gta_v4/public/javascripts/geotagging.js` weiter anpassen.

#### Auswertung der Formulare ändern
Die Formulare für die Eingabe und das Filtern von Tags können grundsätzlich beibehalten werden, jedoch soll jeweils beim Klicken des Buttons ein Ajax Aufruf erfolgen. Hierzu müssen Sie beim Laden der Seite Event Listener erstellen und registrieren. 

Um das standardmäßige Absenden der Formulare zu verhindern, kann ein anderer Typ verwendet werden (im EJS-Template für die `button`- Elemente `type`-Attribut `submit` durch `button` ersetzen).

#### Ajax Aufrufe hinzufügen
Der Ajax Aufruf soll mit dem XMLHttpRequest Objekt realisiert werden (siehe entsprechende Folien). Für das Tagging Formular soll der Aufruf asynchron ablaufen und die Daten per HTTP POST in JSON Format an den Server senden (Tipp: spezifizieren sie hierbei den MIME-Typ im HTTP-Header `Content-Type`, damit der Server diesen erkennt). Für das Filter Formular soll der Aufruf auch asynchron ablaufen aber pe HTTP GET mit Query Parametern erfolgen. 

#### Weitere Funktionen
Auf der Clientseite muss noch eine Funktion zur Aktualisierung der Darstellung im DIscovery Widget erstellt werden. Diese soll die Ergebnisliste und optional die Karte aktualisieren. Die Aktualisierung soll sowohl beim Anlegen eines neuen Filters als auch eines neuen GeoTags erfolgen.

### 4.2.2 Serverseite (Node.js)
Für die REST-Schnittstelle auf der Serverseite kann das Skript `gta-server.js` weiterentwickelt werden. Hier müssen neue Routen für die Ajax Aufrufe erstellt werden (die bisherigen Routen können beibehalten werden). 

#### Neue Routen der REST Schnittstelle
In einer REST-konformen API besitzen Ressourcen eines Typs (also z.B. Geotag) oft eine sog. *Container-Ressource*, die im URI-Pfad nach dem Plural der Ressource benannt ist (also z.b. `/geotags`). Das Erzeugen einer neuen Ressourcen-Instanz erfolgt dann per HTTP POST auf die Container Ressource. Das Auslesen aller Ressourcen-Instanzen erfolgt durch HTTP GET auf die Container Ressource. Realisieren sie zwei entsprechende Routen.

Einzelne Ressourcen-Instanzen sind in einer REST-API über eine individuelle URI direkt zugreifbar. Diese Adresse folgt oft dem Schema `<Container-Ressource>/<Ressourcen-ID>` (also z.B. `geotags/123`). Beim Erzeugen einer neuen Ressourcen-Instanz per HTTP POST sollte am Ende deren URI im `Location` HTTP-Header zurückgesendet werden. Der HTTP Response Code ist `201`.

Sie sollten auch noch eine Route hinzufügen, die das Auslesen **einzelner** Geotag Ressourcen per HTTP GET ermöglicht.

#### Verarbeitung von JSON
Die Vorverarbeitung des HTTP Requests erfolgt mit dem Modul *Bodyparser*. Stellen Sie sicher, das der Bodyparser (auch) für die Verarbeitung von JSON-Inhalten konfiguriert ist. Der JSON-Inhalte lässt sich dann aus dem [Body des Request Objekts](http://expressjs.com/de/4x/api.html#req.body) entnehmen.
