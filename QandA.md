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

*Aber wieso soll man es in einem Salted Hash speichern?*

Das Problem welches auftritt wenn man ein Password nicht salted bevor man es hashed ist das man dann sehr einfach sehen kann welche User das selbe Password haben ein Salt verhindert das. Wobei bcrypt folgendes Schema für seinen "Output" hat:

```
$[algorithm]$[cost]$[salt][hash]
```

Hier sind die einzelnen Bestandteile des "output strings" beschrieben.

*    algorithm: 2 chars hash algorithm identifier prefix. "``$2a$``" or "``$2b$``" indicates BCrypt
*    cost: Cost-factor (n). Represents the exponent used to determine how many iterations 2^n
*    salt: 16-byte (128-bit) salt, base64 encoded to 22 characters
*    hash: 24-byte (192-bit) hash, base64 encoded to 31 characters
[1]

# Quellen

[1]     "npm bcrypt";[Link](https://www.npmjs.com/package/bcrypt); 14.10.2021