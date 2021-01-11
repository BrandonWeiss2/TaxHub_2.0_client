Tax Hub

Live link: https://tax-hub-2-0-client.vercel.app/ 

Demo-Username: BrandonW 

Demo-Password: Vermont!2077

INTRODUCTION: Why TaxHub

Welcome to TaxHub, your centralized home for all tax project managment purposes for Certified Public Accountatnts (CPAs)!

For those unfamiliar with the world of public accounting let me give you a quick introduction...

In tax, as a CPA you will be responsible for working on anywhere from 10 to 20 different clients throughout the year depending on the size and comlexity of the client. A client might be a single entity like a coporation, non-profit, llc, or consists of a massive web of connected entities including foreign operations. Depending on regulations and the type of entity there might be anywhere from 0 to or over 100+ forms that needed to be prepared. To make matters more complicated, each form has different due dates, which get only more complicated depending on the client's fiscal year end and whether or not an extension is requested.

As you can see there is a LOT to keep track of, and these deadlines have serious consequences if missed.

Unfortunatlely, the most common method deployed is an indiviual excel workbook, so if a CPA wants to check on upcoming due dates they will have to browse multiple excel workbooks, which is a tedious task before you account for the 80+ hour workweeks everyone is doing during busy season.

TaxHub is here to resolve this issue by allowing a CPA to list all their clients, their clients' entities, and their respective returns due dates in a single location so a CPA do a quick check in seconds rather than an hour. Letting the CPA focus more on preforming work and stress less about the possibility of missing a due date!

APP: Registration and Login Anyone is allowed to register for an account. The first widow you will be brought to is the login page. At the bottom there is a link the user can click to take them to the registration page.

All fields are required and the password must meet specific requirements. Once the client recieves a valid response, the user will automatically be redirected to the login page where they will then enter their login information.

APP: Main After loggin in, the user will be taken to the main page, which will be empty if the user has not created any clients. main page with no clients

To get create your first client, click the plus icon in the top right corner. This will redirect you to the create client page. After the user enters info in the rquired fields, they will be brought back to the main screen where the client they just created will be dispalyed in the main table. The user is able to create as many clients as needed. Clicking the trash icon on the far right of the client table will delete that client. main page with clients Clicking anywhere else on a row with client data will take you to the entity page for that client.

APP: Entity This page will look and operate identically to the main page. However, this time the user will be able to add as many entities as needed for the selected client by once again clicking on the plus icon in the top right corner. This will bring to the user to a create entity page that will look familiar, but with slightly different information fields. create entity page

For those unfamilar with coporate tax, the Parent entity in a corporate structure is any entity that controls another. For this purposes, the parent is the very top entity in the corporate structure. However, this can be different from the Top Con entity, which is the highest entity in a corporate structure that ultimately files the federal return. (ex. Your parent might be a holding company that does not file, and your Top Con might be a C-Corp that is a subsidiary of that holding company)

Just like on the main page, the trash icon will delet the entity from the table, and clicking anywhere else will bring you to the return page.

APP: Return Like the main and entity pages before, you can click on the plus icon on the top right corner to create tax returns for the selected entity. Again, clicking the trash icon will remove the return, but clicking anywhere else on a return table row will do nothing.

APP: Burger Menu The last part of the app is the burger menu which can be accessed from either the main, entity, or return pages by clicking the burger icon in the top left corner. From here the user can either click on the clients button, which will take them back to the main page or the logout button, which will do just that. create entity page

TECHNOLOGY: Front End - React - Create React App - React Router - HTML5 - CSS3 (scratch - no frameworks)

Testing - Jest (smoke tests)

Production - Deployed via Vercel

GETTING STARTED: Run npm install to load dependencies

Run npm test to ensure a stable build

This is only the front end client, so develop locally you'll need the backend server as well.

To get the backend up and running see https://github.com/BrandonWeiss2/taxhub-server

Deployments are handled through Vercel and can be run via npm run deploy
