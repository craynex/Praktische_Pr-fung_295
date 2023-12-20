# Task Endpnkte auf Local Host

Das Projekt macht einen Localhost auf port 3000 auf dem mehrere Endpunkte existieren die nur Zugänglich sind mit einer Authentifizierung mit Bearer Token. Den Token kann erhalten werden durch den Endpunkt /Login und dann mit der richtigen Email und Passwort.

## Inhalt

- [Installation](#installation)
- [Verwendung](#verwendung)
- [API-Dokumentation](#api-dokumentation)
- [Beitrag](#beitrag)
- [Lizenz](#lizenz)

## Installation

Installiere Node.js auf https://nodejs.org/en

```bash
# Installation von Abhängigkeiten
npm install express
npm install body-parser
npm install jsonwebtoken
npm install swagger-ui-express
npm install ./swagger_output.json
npm install swagger-autogen

```

## Verwendung

Starte Programm.js und navigiere danach auf http://localhost:3000/swagger-ui/#/

```bash
# Ausführung der Anwendung
node start Programm.js
```

Navigiere jetzt auf Postman und importiere die Cristian-Martin-295.postman_collection.json. Ändere den Request zu POST. Gebe diese Json eingabe im body ein: 
```json
{
    "email": "cristian.martin@zli.com",
    "password": "Halloballo123"
}
```
Danach sende einen Request zu http://localhost:3000/login und du wirst einen Token bekommen der kann so aussehen "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY3Jpc3RpYW4ubWFydGluQHpsaS5jb20iLCJpYXQiOjE3MDMwNzgwNjB9.WckEMLzw8d1A5h_hNQDyxdgnWi1Dt-5FFXkJxQ8i9zI". Speichere den Token da du ihn noch brauchen wirst. Bei jedem Request (ausser bei /login) ist es jetzt erforderlich dass du zu authentification gehst, die Authentifizierung auf Bearer Token stellst und den Token einfügst. Jetzt kannst du auf http://localhost:3000/tasks gehen. Mit GET kannst du alle einträge sehen, mit POST kannst du einen neuen Eintrag in JSON format schreiben. Auf http://localhost:3000/tasks/1 kannst du mit GET den ersten eintrag sehen, mit PUT den ersten Eintrag bearbeiten und mit DELETE den ersten eintrag löschen. Mit http://localhost:3000/logout auf DELETE kannst du dich ausloggen.