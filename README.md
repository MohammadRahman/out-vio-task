why reate limit?
When you’re thinking about limiting your own API-based service, you need to balance tradeoffs between user experience, security, and performance. The most common reason to control the flow of data is to maintain availability for your API-based services. But there are security benefits too. A single unintentional, or intentional, surge in inbound traffic can tie up valuable resources and impact the availability for other users. By controlling the rate of incoming requests, you can:

1.protect services and resources from being overwhelmed
2.slow down brute-force attacks
3.prevent distributed denial-of-service (DDOS) attacks

implementation:-->

dependencies 
express zod redis pino jsonwebtoken zod-express-middleware env-schema @sinclair/typebox

uses of dependencies: 
express to create a node server.
zod error validation (would not make any request to database if the requirement dose not meet)
pino to make custom logger
jsonwebtoken to create sign token
env-schema with typebox to set type to env
redis to stores data in-memory and track the number of requests and expire at some point


HOW TO RUN>
#clone the code
#create an .env file at root directory and paste these following values
DATABASE_URL = some database
PORT = 3001
JWT_SECRET = secret
REDIS_URL= redis://localhost:6379
TIME_FOR_IP= 2 
MAX_HITS_FROM_IP= 5
TIME_FOR_TOKEN= 2 
MAX_HITS_FROM_TOKEN= 5
#run npm i
#npm run dev

