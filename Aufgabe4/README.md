# 4. Aufgabe - Interaktion per REST und AJAX

In der vierten Aufgabe sollen...

1. Aufrufe zur Speicherung und Filterung von GeoTags aus dem Browser mittels
   **Ajax** erfolgen (statt dem Form-Mechanismus) und
2. auf der Serverseite über eine **REST-API** realisiert werden.
3. Als freiwillige Zusatzaufgabe soll eine Seitennummerierung (Pagination) für die GeoTag Liste ergänzt werden.

Grundsätzlich soll die Funktionalität der Anwendung identisch erhalten bleiben, nur
dass die Interaktion mit dem Server per Ajax wesentlich schneller und ohne
störenden Aufbau einer neuen Seite abläuft. Die Seitennummerierung der 
GeoTag Liste ermöglicht den Umgang mit umfangreichen Ergebnismengen.

Die Aufgabe vertieft die **Event-Listener**-Programmierung sowie die Verwendung
der **XMLHttpRequest API** in Javascript. Zudem wird die **Struktur von REST
APIs** sowie deren Umsetzung mit dem **HTTP-Protokoll** über **Express Routen**
in Javascript eingeübt.

## 4.1. Vorbereitung

Aktualisieren Sie zunächst das Repository auf ihrem Entwicklungsrechner. Die
Dateien der Aufgabe liegen im Ordner `Aufgabe4`.

### 4.1.1 Vorherige Lösungen übernehmen

1. Kopieren Sie das Stylesheet `Aufgabe1/gta_v1/public/stylesheets/style.css`
   aus Aufgabe 1 nach `Aufgabe4/gta_v4/public/stylesheets/style.css`.
2. Kopieren Sie das Client Skript
   `Aufgabe3/gta_v3/public/javascripts/geotagging.js` aus Aufgabe 3 nach
   `Aufgabe4/gta_v4/public/javascripts/geotagging.js`.
3. Kopieren Sie das Server Skript `Aufgabe3/gta_v3/gta-server.js` aus Aufgabe 3
   nach `Aufgabe4/gta_v4/gta-server.js`.
4. Kopieren Sie die Datei `Aufgabe3/gta_v3/package.json` aus Aufgabe 3
   nach `Aufgabe4/gta_v4/package.json`.
5. Kopieren Sie das EJS-Template `Aufgabe3/gta_v3/views/gta.ejs` aus Aufgabe 3
   nach `Aufgabe4/gta_v4/views/gta.ejs`.

### 4.1.2 Node-js vorbereiten

1. Führen sie `npm install` im Verzeichnis `Aufgabe4/gta_v4/` aus, um die
   nötigen Module zu laden und zu installieren.
2. Um die App später zu starten führen sie `npm start` im Verzeichnis
   `Aufgabe4/gta_v4/` aus und öffnen sie
   [http://localhost:3000](http://localhost:3000) im **Browser**.

## 4.2. Teilaufgaben

Die Umstellung auf Ajax Aufrufe und REST Schnittstelle betrifft Client- und
Serverseite.

### 4.2.1 Clientseite (Browser)

Für den Ajax Aufruf im Browser müssen Sie ihr Javascript
`Aufgabe4/gta_v4/public/javascripts/geotagging.js` weiter anpassen.

#### Auswertung der Formulare ändern

Die Formulare für die Eingabe und das Filtern von Tags können grundsätzlich
beibehalten werden, jedoch soll jeweils beim Klicken des Buttons ein Ajax Aufruf
erfolgen. Hierzu müssen Sie beim Laden der Seite Event-Listener erstellen und
registrieren. Dies sollte direkt nach dem Laden einer Seite erfolgen. Daneben
muss noch das standardmäßige Absenden der Formulare verhindert werden. Eine
Möglichkeit hierzu wurde in der Vorlesung gezeigt.

#### Ajax Aufrufe hinzufügen

Der Ajax Aufruf soll mit dem **XMLHttpRequest** Objekt realisiert werden (siehe
entsprechende Folien). Verwenden Sie kein JQuery.

- Für das **Tagging Formular** soll der Aufruf *asynchron* ablaufen und die Daten per
  *HTTP POST* in *JSON Format* an den Server senden.
  - Tipp 1: Sie können hier den serverseitigen *GeoTag Konstruktor* aus Aufgabe 3
    im Client Skript wiederverwenden.
  - Tipp 2: spezifizieren sie einen geeigneten *MIME-Type* für JSON im
    HTTP-Header `Content-Type`, damit der Server den Inhalt erkennt.
- Für das **Filterformular** soll der Aufruf auch *asynchron* ablaufen aber per *HTTP
  GET* mit *Query Parametern* erfolgen.

#### Weitere Funktionen

Auf der Clientseite muss noch eine Funktion zur Aktualisierung der Darstellung
im Discovery-Widget erstellt werden. Diese soll die Ergebnisliste und die Karte
aktualisieren. Die Aktualisierung soll sowohl beim Anlegen eines neuen Filters
als auch eines neuen GeoTags erfolgen.

### 4.2.2 Serverseite (Node.js)

Für die REST-Schnittstelle auf der Serverseite kann das Skript `gta-server.js`
weiterentwickelt werden. Hier müssen neue Routen für die Ajax Aufrufe erstellt
werden (die bisherigen Routen können dabei beibehalten werden).

#### Neue Routen der REST Schnittstelle

`tl;dr` Erstellen Sie eine komplette REST API für GeoTags. Realisieren Sie zwei
Routen zum Anlegen neuer Ressourcen und zur Suche auf einer Container Ressource
mit URI `geotags/` sowie drei Routen für das Lesen, Ändern und Löschen einzelner
Ressourcen mit URI `geotags/<id>`. Demonstrieren Sie alle Routen mit einem
generischen REST Client.

In einer *REST-konformen API* besitzen Ressourcen eines Typs (also z.B. GeoTag)
oft eine sog. *Container-Ressource*, die im URI-Pfad nach dem Plural der
Ressource benannt ist (also z.b. `/geotags`). Das Erzeugen einer neuen
Ressourcen-Instanz erfolgt dann per HTTP POST auf die Adresse der Container
Ressource, wobei eine Beschreibung der neuen Ressource als JSON mitgesendet
wird. Das Auslesen aller Ressourcen-Instanzen als JSON Liste erfolgt durch HTTP
GET auf die Adresse der Container Ressource. Durch Übergabe eines Filters (z.B.
Suchbegriff oder Radius) als URL-Parameter kann eine Suche repräsentiert werden.
Realisieren sie zwei entsprechende Routen.

Einzelne Ressourcen-Instanzen sind in einer REST-API über eine individuelle URI
direkt zugreifbar. Diese Adresse folgt oft dem Schema
`<Container-Ressource>/<Ressourcen-ID>` (also z.B. `geotags/123`). Beim Erzeugen
einer neuen Ressourcen-Instanz per HTTP POST sollte am Ende deren URI im
`Location` HTTP-Header zurückgesendet werden. Der HTTP Response Code ist `201`
(Created).

In einer REST API können einzelne Ressourcen-Instanzen über Ihre individuelle
URI gelesen, geändert oder gelöscht werden. Dazu werden die HTTP Operationen
GET, PUT und DELETE verwendet. GET liefert die einzelne Ressource als JSON
zurück, mit PUT wird eine Beschreibung der geänderten Ressource mitgeschickt und
bei DELETE werden keine Ressourcenbeschreibungen ausgetauscht. Realisieren sie
drei entsprechende Routen im Server.

Für das Testen der REST API stehen generische Clients zur Verfügung. Damit
können beliebige HTTP Aufrufe spezifiziert und durchgeführt werden. Solche
Clients sind in den meisten IDEs, als Browser Plugins oder eigenständige Tools
verfügbar. Beliebte Beispiele sind:

- **curl** für die Konsole [https://curl.haxx.se](https://curl.haxx.se)
- **rest-client** für ATOM [https://atom.io/packages/rest-client](https://atom.io/packages/rest-client)
- **HTTP Client** für WebStorm [https://www.jetbrains.com/help/webstorm/testing-restful-web-services.html](https://www.jetbrains.com/help/webstorm/testing-restful-web-services.html)
- **insomnia** [https://insomnia.rest](https://insomnia.rest)
- **Postman** [https://www.getpostman.com](https://www.getpostman.com)
- **REST Client** für Visual Studio Code [https://marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Demonstrieren Sie alle Routen Ihrer REST API mit einem REST Client Ihrer Wahl.

#### Tipps zur Verarbeitung von JSON im Express Server

Die Vorverarbeitung des HTTP Requests erfolgt mit dem Modul *Bodyparser*.
Stellen Sie sicher, dass der Bodyparser (auch) für die Verarbeitung von
JSON-Inhalten konfiguriert ist. Der JSON-Inhalt lässt sich dann aus dem [Body
des Request Objekts](http://expressjs.com/de/4x/api.html#req.body) entnehmen.

## 4.3. Zusatzaufgabe

Die Zusatzaufgabe besteht darin, die vorhandene Ergebnisliste für GeoTags im
Discovery Widget mit einer Funktion für die Seitennummerierung
([Pagination](https://en.wikipedia.org/wiki/Pagination)) zu ergänzen. Längere
Ergebnislisten sollen auf mehrere nummerierte Seiten aufgeteilt werden, zwischen
denen über Links gewechselt werden kann.

Ein Beispiel wie dies aussehen könnte, zeigt die folgende Abbildung:

![Screenshot](../gta-pagination.png)

Wie die Seitennummerierung gestaltet wird, ist ihnen überlassen.

### 4.3.1. Teilschritte

Die Umsetzung der Aufgabe könnte nach folgender Methode erfolgen:

1. Überlegen Sie, wie sich die nummerierte Liste verhalten soll, wie sie dargestellt wird und wie die Bedienung erfolgt. Legen Sie auch Details fest, wie z.B. die Anzahl der Einträge pro Seite.
2. Planen Sie die nötigen Änderungen der aktuellen GeoTagging App für die Umsetzung der nummerierten Liste im Client und Server.
3. Erstellen Sie die neue Seitenstruktur (HTML).
4. Gestalten Sie die Strukturelemente der Seitennummerierung (CSS).
5. Führen Sie die nötigen Änderungen an den bestehenden HTTP-Endpunkten durch und fügen Sie nach Bedarf neue Endpunkte hinzu (Server).
6. Koppeln Sie das Client Script mit den neuen/geänderten Endpunkten (Client).

### 4.3.2. Anforderungen

Bei der Erstellung soll darauf geachtet werden, dass nur die GeoTags für die
aktuell benötigte Seite geladen werden. Es sollen also **nicht** alle GeoTags
angefragt, aber nur die aktuell sichtbaren (z.B. 10) angezeigt werden!

Ist man (wie in obiger Abbildung) auf der ersten Seite und möchte per Pfeil nach
links eine Seite zurück blättern, dann soll nichts geschehen. Dasselbe gilt für
die letzte Seite mit Pfeil nach rechts.

Die Bedienelemente der Liste sollen neben Pfeilen zum Vor- und Zurückblättern
auch einige Seitennummern enthalten, die man direkt anspringen kann. Klickt man
ein Bedienfeld an, sollen die GeoTags der Seite vom Server geladen und angezeigt
werden.
