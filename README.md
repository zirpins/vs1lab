# VS1lab - Laborübungen Verteilte Systeme 1 (Sommer 2017)
Ziel des Labors ist die praktische Anwendung verschiedener Web Technologien aus der Vorlesung. Dazu wird in mehreren Schritten eine komplette Web Anwendung erstellt. In jedem Schritt wird jeweils eine Technik genauer betrachtet.

## Die Geo Tagging App (GTA)
In der Übung konstruieren wir die *Geo Tagging App*: eine Social Sharing App für interessante Orte. Die App verwaltet dabei *GeoTags* (= Locations mit Hashtags). Dies beinhaltet zwei wesentliche Aktivitäten: das Anlegen (*Tagging*) und die Suche (*Discovery*) von GeoTags die wie folgt umgesetzt werden:

- Über ein *Tagging Widget* (Formular) kann jederzeit der Name sowie ein Hashtag für den aktuellen Ort des Browsers (oder manuell eingegebene Koordinaten) registriert werden.

- In einer *Discovery Liste* werden die GeoTags der aktuellen Umgebung angezeigt. GeoTags der Umgebung können zudem über Name oder Hashtag gefiltert werden.

## Entwicklungsumgebung
Auf ihrem Entwicklungsrechner brauchen sie zur Lösung der Aufgaben verschiedene Tools und Frameworks. Für die ersten zwei Aufgaben sind folgende Komponenten nötig:

- Eine **IDE** oder einen **Editor** ([Webstorm](https://www.jetbrains.com/webstorm/), [Nodeclipse](http://www.nodeclipse.org), [Atom](https://atom.io) etc.)
- Einen **Browser** (nach Belieben Chrome, Firefox, Safari etc.)
- Möglichst [**git**](https://help.github.com/articles/set-up-git/) als **Version Control System** (VCS)

Ab der dritten Aufgabe kommen folgende Frameworks hinzu:

- [**Node.js Plattform**](https://nodejs.org) (inkl. npm)
- [**Express Framework**](http://expressjs.com) (inkl. Express-Generator)

Alle Komponenten sind auf den Poolrechnern (LI 137) vorhanden.
