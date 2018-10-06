# 1. Aufgabe - Web App strukturieren und gestalten
In der ersten Aufgabe soll die Web-Oberfläche der GT-App entstehen. Dazu gehört ein HTML-Dokument zur Strukturierung der Inhalte und ein CSS-Stylesheet für Layout und Gestaltung.

Die Aufgabe vertieft den Umgang mit **HTML** und besonders mit **HTML-Formularen** und zeigt deren Zusammenhang mit **CSS3** durch verschiedene **Selektoren** sowie die Funktionsweise von **Flexbox**.

## Vorbereitung
Für die Aufgabe existieren schon Templates auf github: [https://github.com/zirpins/vs1lab](https://github.com/zirpins/vs1lab). Laden sie das ganze Repository von **github** herunter oder aktualisieren sie es bei Bedarf. Die Dateien der Aufgabe befinden sich im Ordner `vs1lab/Aufgabe1/`.

## Teil A - Struktur einer Webanwendung mit HTML5 erstellen
In Teil A soll die Struktur der Oberfläche als HTML-Seite entstehen.

- Die App soll alle Funktionen auf *einer* Seite kombinieren (**Single Page App**) und sich in **Header-**, **Main-** und **Footer-Bereich** gliedern. Im Hauptteil soll ein **Tagging Widget** und ein **Discovery Widget** enthalten sein.
- Das Tagging Widget fragt über ein	**Formular** die Attribute `latitude`, `longitude`, `name` und `hashtag` eines neuen GeoTags ab.
- Das Discovery Widget zeigt in einer **Tabelle** und einer **Karte** die GeoTags der Umgebung an. Über ein **Formular** kann ein `searchterm` eingegeben werden, um die Locations zu filtern. Damit auch in der Nähe der aktuellen Position gesucht werden kann, soll das Formular auch die Koordinaten (`latitude`, `longitude`) als **versteckte Eingaben** beinhalten.

### A.1. Vorbereitung
Ein Template der Seite liegt im Ordner `Aufgabe1` des Repositories. Öffnen sie `Aufgabe1/gta_v1/public/index.html` in ihrem **Editor** und in Ihrem **Browser**.

### A.2. Teilaufgaben
#### Formularstruktur
Im Template fehlen noch die Formulare. Diese sollen nun erstellt werden.

- Ergänzen sie geeignete `Input` Elemente im Tagging-Formular und im Discovery-Formular.
- Vergeben sie eindeutige `id` Attribute für die Felder, um sie später in JavaScript finden zu können.
- Deklarieren sie für alle Felder jeweils ein `label`.
- Verwenden sie `fieldset` und `legend` zur Begrenzung des Formulars.
- Deklarieren sie für jedes Formular einen `button` zum Submit.
- Fügen sie als Hilfe für die Benutzer *Beispiel Platzhalter* in die Felder ein.

#### Formularvalidierung
Für die Formulare soll nun noch eine Validierung definiert werden. Diese Validierung soll *nur HTML5-Attribute* verwenden .

Setzen sie folgende Regeln um:

- Alle Felder bis auf Suchbegriff und Hashtag müssen in den Formularen ausgefüllt werden.
- Namen dürfen 10 Buchstaben lang sein.
- Hashtags müssen mit `#` beginnen und dürfen dann noch 10 Buchstaben haben.

## Teil B - Webanwendung mit CSS3 und Bootstrap gestalten
Teil B dreht sich um die Gestaltung der GT-App und dabei insbesondere um das Layout der GUI. Hierfür verwenden wir einen einfachen Ansatz ausschließlich auf Basis von CSS3. Just for Fun lernen wir das Bootstrap Framework kennen.

### B.1. Vorbereitung
Templates für Seite und Stylesheet liegen im Ordner `Aufgabe1` des Repositories. Öffnen sie `Aufgabe1/gta_v1/public/index.html` in ihrem **Editor** und in Ihrem **Browser**. Öffnen Sie zusätzlich die Datei `Aufgabe1/gta_v1/public/stylesheets/style.css` in ihrem **Editor**.

### B.2 Aufgabe (Responsive Grid Layout)
Die Komponenten einer Web-GUI werden oft als **Grid Layout** angeordnet. Hierbei werden mehrere Reihen und Spalten vorgegeben, die über den Screen verteilt sind und die Position für Elementen der Webseite vorgeben.

#### Grid Layout mit Flexbox

Eine moderne Umsetzung eines solchen Grid Layouts funktioniert mit einer **Flexbox**. Hierbei ordnet man verschiedene 'Child'-Elemente innerhalb eines Containers (der Flexbox) an, welche nun dynamisch und sehr spezifisch angeordnet werden können. Dies kann entweder über "normale" CSS-Eigenschaften (width, height, margin, padding, etc...) definiert werden oder mit den extra dafür vorgesehen Flex-Eigenschaften. Eine gute Übersicht dazu finden Sie unter [https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). 

Wir haben auf diese Weise schon die Deklaration einfacher Grid Layouts in der Vorlesung behandelt, die sich im Sinne eines Responsive Designs an die Größe des Browserfensters anpassen. In der Aufgabe werden wir den Ansatz für verschachtelte Grids mit unterschiedlicher Spaltenbreite erweitern.

#### Rsponsives Verhalten mit Media Queries

Um die Seite auf kleineren Endgeräten zu simulieren können Sie einfach Ihr Browser-Fenster minimieren und entsprechend klein/groß ziehen. Wenn Sie eine gewisse Breite unterschreiten, werden Sie feststellen, dass die einzelnen Spalten des Grids zu schmal werden. 

Auf mobilen Geräten wäre es also besser, die Spalten wären untereinander positioniert. Hier können Sie - wie in der Vorlesung behandelt - **Media Queries** benutzen. 

Messen Sie eine geeignet Breite aus, ab wann Spalten untereinander klappen sollen (in Chrome öffnen Sie dazu die Entwicklertools, markieren den html-Tag und dann sehen Sie in der rechten oberen Ecke des Browsers die Viewport-Abmessungen; ein geeigneter Wert könnten z.B. 850px sein). Nun müssen Sie innerhalb der Media Queries lediglich definieren, dass Spalten untereinander positioniert werden und eine Breite von 100% haben sollen. Eine Ausführliche Erläuterung zur Verwendung von media queries finden Sie unter [https://wiki.selfhtml.org/wiki/CSS/Media_Queries](https://wiki.selfhtml.org/wiki/CSS/Media_Queries).

Wenn Sie die Seite auf Ihrem Smartphone testen wollen, werden Sie feststellen, dass sie nicht der "Simulation" entspricht. Das liegt an der Standart-Viewport Konfiguration, welche Sie ebenfalls ändern müssen. Das geht aber ganz einfach mit einem HTML-Tag, den Sie im HEAD unterbringen müssen: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

#### Aufgabenstellung
Gestalten Sie das Layout der GT-App als **verschachteltes zweispaltiges Grid**: Die erste Spalte enthält das Tagging-Widget mit dem Tagging-Formular. Die zweite Spalte enthält das Discovery-Widget. Dies beginnt mit dem Filter Formular. Darunter sollen zwei weitere verschachtelte Spalten für die Ergebnisliste und für die Karte folgen.

Bezüglich **Responsive Design** soll die Breite der Spalten sich relativ zur verfügbaren Bildchirmbreite bei gleichbleibendem Verhältnis der Spalten untereinander anpassen. Ab einer minimalen Bildschirmbreite sollen alle Spalten "untereinander klappen". Es gibt dann also nur noch eine Spalte mit vielen Reihen.

Setzen Sie weitere **gestalterische Ziele** um:
- Farbig abgesetzte Header- und Footer-Bereiche
- Vertikale Anordnung der Eingaben im Tagging Formular
- Größere Boxen für die Eingaben aller Formulare
- Discovery Ergebnisliste mit farbigen Boxen

Das Ergebnis könnte wie folgt aussehen:

![Screenshot](https://github.com/zirpins/vs1lab/blob/master/gta-screen.png)

##### Allgemeine Hinweise

- Nutzen sie das `display` Property um die Positionierung von Elementen zu beeinflussen (in CSS `display:block` statt in HTML `<br>`)
- Verwenden sie verschiedene Arten von Selektoren (`element`, `id`, `class`).

##### Implementierung des Grid Layouts

- Bei Grids mit unterschiedlich breiten Spalten wird gerne eine Aufteilung der Screen-Breite in 12 gleiche Teile vorgenommen. Spalten werden dann nach der Zahl ihrer Teile ausgewählt, so dass am Ende wieder 12 Teile resultieren (z.B. 3 Spalten mit 2, 4 und 6 Teilen). 
- Als Vorlage zur Implementierung so eines Layouts über `float` Properties dient [http://www.w3schools.com/css/css_rwd_grid.asp](http://www.w3schools.com/css/css_rwd_grid.asp).
- Übernehmen sie die dort deklarierten Regelmengen für `.row` und `.col-x` aber ändern Sie die Realisierung, so dass **Flexboxen** verwendet werden.
- Deklarieren Sie das `box-sizing` generell als `border-box` und achten Sie auf eine genaue Ausrichtung der Spalten.

##### Implementierung des Responsive Design

- Deklarieren Sie eine **Media Query**, um bei geringer Breite Spalten untereinander zu klappen.

### B.3 Zusatzaufgabe bei Interesse: Bootstrap verwenden
Für die Nutzung von **Bootsrap** gibt es je eine alternative HTML und CSS Datei mit `-bs` Postfix. Das Framework gibt schon praktisch alle benötigten CSS-Regelsätze vor. 

Schauen Sie sich die Dokumentation unter [http://holdirbootstrap.de/css/](http://holdirbootstrap.de/css/) an und dort vor allem *Raster* und *Formulare*. Wenden Sie die beschriebenen Regelmengen auf das alternative HTML-Dokument an. 

Seit Bootstrap 4 verwendet das Framework ebenfalls Flexboxen, anstatt float. Eine kleine Einführung zu Flexboxen in Bootstrap unter [https://www.w3schools.com/bootstrap4/bootstrap_flex.asp](https://www.w3schools.com/bootstrap4/bootstrap_flex.asp)