# Git Workflow

Im Branch **dev_total** ist aktueller Stand, daher als erstes ein pull request durchführen um den aktuellen stand von dev_total auch lokal zu haben
```
git checkout dev_total
git pull
```

Eigenen Branch machen, falls man noch keinen hat ("name" natürlich durch eigenen Namen ersetzen) 
```
git branch dev_name
```

Eigenen Branch auf den aktuellen Stand von **dev_total** bringen
```
git chekout dev_name
git merge dev_total
```

Code in eigener Branch schreiben und versionieren
```
git add * 
// "*" fügt alle geänderten Dateien hinzu
git commit -m"hier Kommentar schreiben"
// updated den eigenen branch lokal
```

Lokale Änderungen global auf gitHub pushen
```
git push
``` 

Wenn man mit seinem Branch zufrieden ist und die Änderungen commited hat, dev_total updaten und wieder auf den eigenen Branch wechseln
```
git chekout dev_total
git merge dev_name
git push
git checkout dev_name
```
 
Ab jetzt beginnt der Kreislauf von Neuem :)


Sidenote: 
```
git branch
```
zeigt an auf welchem Branch man sich gerade befindet


