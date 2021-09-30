# chatapp
Chat application with integration to discord for webpages. mainly for my own business use but can be adapted to work with anyones setup. I may make it more complex in terms of functionality or less complex for people using it if they need.

WARNING YOU NEED TO KNOW BASIC CODING TO DEPLOY THIS
its as simple as replacing some urls with your own but if you need to debug youll need knowledge.

all variables are controlled with .env

required variables:
`TOKEN={discordbot token}`
`THREADCHANNEL={Channel id that you want the bot to create threads in}`
`MODEROLE={Moderator role to pick person from to add to the chat}`

This configuration is tested and works, thankyou jesus tap dancing christ it took a whole day to deploy, i hate cors.

To deploy this fun lil pancake of a app, run it with pm2 and place the index.html code somewhere on your website along with the css file and link it, you can tinker with the css all you want im lazy. make sure you replace example.com with their respective urls and reverse proxy the pm2 instance to a domain with https.
