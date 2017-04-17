# Izenda Angular2Starterkit

## Overview
The Angular2Starterkit illustrates the concepts of integrating Izenda into Angular2 applications.

 :warning: **The Angular2Starterkit is designed for demonstration purposes and should not be used as an “as-is” fully-integrated solution. You can use the kit for reference or a baseline but ensure that security and customization meet the standards of your company.**
 
## Installation 
 Download the v1.24.0 (https://downloads.izenda.com/v1.24.0/) of the API and EmbeddedUI and copy the following:
 
### Deploying the Izenda API & Database

- Deploy the <a href="https://downloads.izenda.com/v1.24.0/API.zip">Izenda API</a> to IIS.
- Create a database named 'IzendaAngular2' (This is the database for the Izenda configuration. It contains report definitions, dashboards,etc.). You may use any name of your choosing, just be sure to modify the script below to use the new database name.
- Download and execute the <a href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/DbScripts/Izenda.sql">Izenda.sql</a> script.  
- Download a copy of the <a href="https://github.com/Izenda7Series/Mvc5StarterKit/blob/master/Mvc5StarterKit/izendadb.config">izendadb.config</a> file and copy it to the root of your API deployment. Then modify the file with a valid connection string to this new database.

### Deploying the WebAPI & Database
- Create a database named 'IzendaAngular2_WebApi'. This is the database for the WebApi application. It contains the users, roles, tenants used to login. You may use any name of your choosing, just be sure to modify the script below to use the new database name.
- Download the <a href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/DbScripts/Starterkit_Api.sql">Starterkit_Api.sql</a> script.
- Modify the <a  href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/WebApi2StarterKit/WebApi2StarterKit/Web.config">web.config (Line 75)</a> file with a valid connection string to this new database.

```xml
  <connectionStrings>
    <add name="DefaultConnection" connectionString="[your connection string here]" providerName="System.Data.SqlClient" />
  </connectionStrings>
``` 
- Modify the 'IzendaApiUrl' value in the <a  href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/WebApi2StarterKit/WebApi2StarterKit/Web.config">web.config (Line 80)</a> file with the url of the Izenda API.
```xml
<add key="IzendaApiUrl" value="http://localhost:9999/api/" />
```

### Deploying the Retail Database (optional)
Create the Retail database with the <a  href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/DbScripts/RetailDbScript.sql">RetailDbScript.sql</a> file.

### Configuring Angular2StarterKitWeb
- Change the 'WebApiUrl' value in the  <a  href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/Angular2StarterKitWeb/app/_helpers/izendaintegrate.js">izendaintegrate.js (Line 16)</a> file with the URL for the Izenda API.

```javascript
"WebApiUrl": "http://localhost:9999/api",
``` 
- Open the <a href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/Angular2StarterKitWeb/app/config.ts">config.ts (Line 4)</a> file and ensure 'apiEndPoint' is set. This will default to http://localhost:3358/ and can be left as is. 

```javascript
let apiEndPoint = "http://localhost:3358/";
``` 
- Download the <a href="https://downloads.izenda.com/v1.24.0/EmbeddedUI.zip">Izenda Embedded UI</a> and extract the files to the <a href="https://github.com/Izenda7Series/Angular2Starterkit/tree/master/Angular2StarterKitWeb/app/izenda">Angular2StarterKitWeb/app/izenda</a> folder.

- Open a command-line window at root folder Angular2StarterKitWeb and run the following commands:
```bash
npm install
``` 
```bash
npm start
``` 

### Run WebApi2StarterKit in Visual Studio
- Build and run the WebApi2StarterKit project and login with the System Admin ccount below:
   Tenant: 
   Username: IzendaAdmin@system.com
   Password: Izenda@123

- Once you have logged in successfully, navigate to the Settings tab and enter your Izenda License Key .
- Now navigate to Settings > Data Setup > Connection String and replace the current connection string with the one you created for the Retail Database.

- Click Reconnect and then save
