This is a starter kit meant to illustrate concepts for integrating Izenda into Angular2 applications. 

Instructions for set up:

Izenda Compatible version:
Version: 1.24.0
***Please note this kit was built from the Izenda Version above. If you donwload a higher version you must update the Izenda Database with the update scripts provided
on the Izenda download page here: https://downloads.izenda.com/ if you download 1.24.0 no updates should be required.

Pre-requisite:
Izenda database has been deployed (Script contained in DBScripts Folder - File: Izenda.sql)
StarterKit_Api database has been deployed (Script contained in DBScripts Folder - Starterkit_Api.sql)
Izenda Web Api has been deployed to iis (This can be dowloaded here: https://downloads.izenda.com/ v1.24.0)
MVC WebApi2 has been deployed or run by Visual Studio <recommended> (included in this kit)
Create Retail Database  (Script contained in DBScripts Folder - File:RetailDbScript.sql)


Deployment: 

- Izenda Api:
  - Database:
		Create empty database
		Run script "Izenda" under folder "DBScripts" to deploy Izenda database.
		Move the file labeled izendadb.config to the root of the Izenda web API folder deployed in iis.
		Insert your connection string to the database you created above. 

- Web Api2
  - Database:
		Create empty database:
		Run script "Starterkit_Api" under "DBScripts" folder to init data.

	In WebApi2
	Edit Web.config  
	Update the connection string to Starterkit_Api database which was created above.
	Update IzendaApiUrl to Izenda Api(1) above.


- Angular2StarterkitWeb 
 
	Open file Angular2StarterKitWeb/app/_helpers/izendaintegrate.ts then Update "WebApiUrl": "< to Izenda Web Api on iis".
	Open file Angular2StarterKitWeb/app/config.ts ensure "apiEndPoint" is set. This will default to http://localhost:3358/ and can be left as is. 
	Download and Copy Izenda Embedded UI and store in Angular2StarterKitWeb/app/izenda folder (can be downloaded here: https://downloads.izenda.com/ v1.24.0)
	Open command line window at root folder Angular2StarterKitWeb
	Run command: npm install to install npm packages
	Then Run command: npm start to start Angular2 application 
	
	
Run WebApi2StarterKit in Visual Studio

Initial User for logging in.
System User:
Tenant:
Username: IzendaAdmin@system.com
Password: Izenda@123

Once you have logged in successfully go to the Settings tab and enter your Izenda License Key 
Now navigate to the Datab Set up area in Settings - Go to Connection String replace the current connection string with the one you created for the Retail Database
Click Reconnect and then save
