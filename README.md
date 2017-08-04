# Izenda Angular2Starterkit

## Overview
The Angular2Starterkit illustrates the concepts of integrating Izenda into Angular2 applications.

 :warning: **The Angular2Starterkit is designed for demonstration purposes and should not be used as an “as-is” fully-integrated solution. You can use the kit for reference or a baseline but ensure that security and customization meet the standards of your company.**

 :note: **The Izenda configuration database script provided is currently configured for Version 2.2.2 of Izenda.**

## Installation 
 
### Deploying the Izenda API & Database


- Create a database named 'IzendaAngular2' (This is the database for the Izenda configuration. It contains report definitions, dashboards,etc.). You may use any name of your choosing, just be sure to modify the script below to use the new database name. 
- Download and execute the <a href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/DbScripts/Izenda.sql">Izenda.sql</a> script. Please note, the database version can be found in the IzendaDBVersion table of this database. This will be necessary when obtaining the proper resources in the following steps.  

- Download and deploy the Izenda API to IIS. The API can be found on our <a href="https://downloads.izenda.com/">Downloads Page</a> in our version directories. Select the version directory that corresponds Izenda configuration database version and click the "API" resource in the directory. 

- Deploy the Izenda API to IIS. The instructions for installing the Izenda API will follow the same instructions for <a href= "https://www.izenda.com/docs/install/doc_installation_guide.html#izenda-installation-as-two-separate-sites"> installing a standalone version of the Izenda's API.</a>

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
- Change the 'WebApiUrl' value in the  <a  href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/Angular2StarterKitWeb/app/_helpers/izendaintegrate.ts">izendaintegrate.js (Line 16)</a> file with the URL for the Izenda API.

```javascript
"WebApiUrl": "http://localhost:9999/api/",
``` 
- Open the <a href="https://github.com/Izenda7Series/Angular2Starterkit/blob/master/Angular2StarterKitWeb/app/config.ts">config.ts (Line 4)</a> file and ensure 'apiEndPoint' is set. This will default to http://localhost:3358/ and can be left as is. 

```javascript
let apiEndPoint = "http://localhost:3358/";
``` 
- Download a copy of the EmbeddedUI. The EmbeddedUI can be found on our <a href="https://downloads.izenda.com/">Downloads Page</a> in our version directories. Select the version directory that corresponds Izenda configuration database version and click the "EmbeddedUI" resource in the directory. 
- Extract the files of the EmbeddedUI and place them in the <a href="https://github.com/Izenda7Series/Angular2Starterkit/tree/master/Angular2StarterKitWeb/app/izenda">Angular2StarterKitWeb/app/izenda</a> folder of your Angular 2 Kit.

- Open a command-line window at root folder Angular2StarterKitWeb and run the following commands:
```bash
npm install
``` 
```bash
npm run lite
``` 

### Run WebApi2StarterKit in Visual Studio
- Build and run the WebApi2StarterKit project and login with the System Admin account below:<br />
   Tenant: <br />
   Username: IzendaAdmin@system.com<br />
   Password: Izenda@123<br />

- Once you have logged in successfully, navigate to the Settings tab and enter your Izenda License Key .
- Now navigate to Settings > Data Setup > Connection String and replace the current connection string with the one you created for the Retail Database.

- Click Reconnect and then save


## Post Installation

 :warning: In order to ensure smooth operation of this kit, the items below should be reviewed.
 
 
### Exporting

Update the WebUrl value in the IzendaSystemSetting table with the URL for your front-end. You can use the script below to accomplish this. As general best practice, we recommend backing up your database before making any manual updates.

```sql

UPDATE [IzendaSystemSetting]
SET [Value] = '<your url here including the trailing slash>'
WHERE [Name] = 'WebUrl'

``` 

If you do not update this setting, charts and other visualizations may not render correctly when emailed or exported. This will also be evident in the log files as shown below:

`[ERROR][ExportingLogic ] Convert to image:
System.Exception: HTML load error. The remote content was not found at the server - HTTP error 404`

</br>

### Authentication Routes

Ensure that the AuthValidateAccessTokenUrl and AuthGetAccessTokenUrl values in the IzendaSystemSetting table use the fully qualified path to those API endpoints. 

Examples:

| Name                       | Value                                         | 
| -------------------------- |:----------------------------------------------|
| AuthValidateAccessTokenUrl |http://localhost:14809/api/validateAccessToken |
| AuthGetAccessTokenUrl      |http://localhost:14809/api/getAccessToken      |

</br>

You can use the script below to accomplish this. As general best practice, we recommend backing up your database before making any manual updates.

```sql

UPDATE [IzendaSystemSetting]
SET [Value] = '<your url here>'
WHERE [Name] = 'AuthValidateAccessTokenUrl'

UPDATE [IzendaSystemSetting]
SET [Value] = '<your url here>'
WHERE [Name] = 'AuthGetAccessTokenUrl'

``` 

:no_entry: If these values are not set, the authentication will not work properly.

