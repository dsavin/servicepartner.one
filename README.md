<h1>Service Partner One Code challenge</h1>

<h2>Tech Stack</h2>
<b>Backend:</b> Node.js 10
<br>
<b>Frontend:</b> React 16
<br>
No persistence layer


<h2>Installation</h2>
Install Node Version Manager
https://github.com/creationix/nvm/#install-script

Install Node.js 10
<br>
<code>
$ nvm install 10

$ nvm use 10
</code>

Install Yarn globally
https://yarnpkg.com/lang/en/docs/install

<h3>Server</h3>

Got to server folder. Run:

<code>
$ yarn
</code>

To install dependencies.

After that you can start server by running:

<code>
DEBUG=server:* yarn start
</code>

This console will output all debug information regarding server running process.

API (server) application has to roots and will start on port 3000 locally.

Roots:

http://localhost:3000/api/ - health check of API and uptime
http://localhost:3000/api/optimize - endpoint to get optimization

Request examples:

<code>
$ curl --request GET --url http://localhost:3000/api/

$ curl --header "Content-Type: application/json" --request POST --data '{"rooms":[35, 21, 17],"senior":10, "junior": 6 }' http://localhost:3000/api/optimize
</code>

To run tests:

<code>
$ yarn test
</code>


<h3>Frontend</h3>

Got to root folder. Run:

<code>
$ yarn
</code>

To install dependencies.

After that you can start server by running:

<code>
yarn start
</code>


