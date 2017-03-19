# VS1lab - Laborübungen Verteilte Systeme 1 (Sommer 2017)
Ziel des Labors ist die praktische Anwendung verschiedener Web Technologien aus der Vorlesung. Dazu wird in mehreren Schritten eine komplette Web Anwendung erstellt. In jedem Schritt wird jeweils ein Bereich von Web Technologien genauer betrachtet.

## Die Geo Tagging App (GTA)
In der Übung Entwickeln wir die **Geo Tagging App** (kurz GT-App oder GTA): eine Social Sharing App für interessante Orte. Die App verwaltet dabei *GeoTags* (= Locations mit Hashtags). Dies beinhaltet zwei wesentliche Aktivitäten: das Anlegen (*Tagging*) und die Suche (*Discovery*) von GeoTags die wie folgt umgesetzt werden:

- Über ein *Tagging Widget* (Formular) kann jederzeit der Name sowie ein Hashtag für den aktuellen Ort des Browsers (oder manuell eingegebene Koordinaten) registriert werden.

- In einer *Discovery Liste* werden die GeoTags der aktuellen Umgebung angezeigt. GeoTags der Umgebung können zudem über Name oder Hashtag gefiltert werden.

![Screenshot](https://github.com/zirpins/vs1lab/blob/master/gta-screen.png)

## Entwicklungsumgebung
Auf ihrem Entwicklungsrechner brauchen sie zur Lösung der Aufgaben verschiedene Tools und Frameworks. Für die ersten zwei Aufgaben sind folgende Komponenten nötig:

- Eine **IDE** oder einen **Editor** ([Webstorm](https://www.jetbrains.com/webstorm/), [Nodeclipse](http://www.nodeclipse.org), [Atom](https://atom.io) etc.)
- Einen **Browser** (nach Belieben Chrome, Firefox, Safari etc.)
- Möglichst [**git**](https://help.github.com/articles/set-up-git/) als **Version Control System** (VCS)

Ab der dritten Aufgabe kommen folgende Frameworks hinzu:

- [**Node.js Plattform**](https://nodejs.org) (inkl. npm)
- [**Express Framework**](http://expressjs.com) (inkl. Express-Generator)

Alle Komponenten sind auf den Poolrechnern (LI 137) vorhanden. Sie können aber auch leicht selbst auf dem eigenen Rechner installiert werden. Alle Werkzeuge sind natürlich kostenfrei erhältlich.

## Aufgaben
Die Laborübungen umfassen dieses Semester vier Teilaufgaben:

1. [Web Apps strukturieren (HTML5) und gestalten (CSS3) ](Aufgabe1)
2. [Clientseitige Programmierung mit JavaScript / HTML5 APIs](Aufgabe2)
3. [Serverseitige Anwendung mit Node.js / Express / EJS erstellen](Aufgabe3)
4. [Interaktion per REST API und AJAX Aufrufen](Aufgabe4)

## Beispiele
Für einige weitere Vorlesungsthemen gibt es [praktische Code-Beispiele](Beispiele)
