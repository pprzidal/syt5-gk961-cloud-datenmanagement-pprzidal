# Fragestellungen

## Welche grundlegenden Elemente müssen bei einer REST Schnittstelle zur Verfügung gestellt werden?

CRUD - Create, Read, Update, Delete

## Wie stehen diese mit den HTTP-Befehlen in Verbindung?

PUT, GET, PATCH, DELETE

## Welche Datenbasis bietet sich für einen solchen Use-Case an?

Eine Relationale bzw. eine dokumentorientierte wie z.b. MongoDB

## Welche Erfordernisse bezüglich der Datenbasis sollten hier bedacht werden?

Die Konsistenz eines RDBMS ist hier von zentraler Bedeutung. Da wie ja z.b. für die email Adresse eine "einzigartigkeit" wollen also einen Constraint.

## Verschiedene Frameworks bieten schnelle Umsetzungsmöglichkeiten, welche Eckpunkte müssen jedoch bei einer öffentlichen Bereitstellung (Production) von solchen Services beachtet werden?

* Wenn es um Authentifizierung geht wäre es wichtig das die Kommunikation verschlüsselt ist (HTTPS).
* Außerdem sind SQL Injections zu verhindern.
* Weiters sind Passwörter immer als Hash oder Salted Hash zu speichern.