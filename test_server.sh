
#!/bin/bash


# git clone the repo
git clone https://gitlab.crio.do/COHORT_ME_BUILDOUT_XMEME_ENROLL_1612436694845/kaustav123-kb-me_buildout_xmeme.git

# cd to the cloned repo directory
cd xmeme

# Run the user’s installation steps which will install any necessary dependencies required for the server to run, with sudo permission

chmod +x install.sh

sudo ./install.sh


# 1. Run the user’s server execution steps which will bring up the server

# 2. We’ll be running your server_run.sh as a background process (using &) so that we can run the next set of commands

chmod +x server_run.sh

./server_run.sh &


# 3. Add a sleep timer to sleep.sh depending upon how long you want to sleep so that the server is ready.

chmod +x sleep.sh

./sleep.sh


# Execute the GET /memes endpoint using curl to ensure your DB is in a clean slate

# Should return an empty array.

curl --location --request GET 'http://localhost:8081/memes'


# Execute the POST /memes endpoint using curl

curl --location --request POST 'http://localhost:8081/memes' \

--header 'Content-Type: application/json' \

--data-raw '{

"name": "xyz",

"url": "abc.com",

"caption": "This is a meme"

}'


# Execute the GET /memes endpoint using curl

curl --location --request GET 'http://localhost:8081/memes'


# If you have swagger enabled, make sure it is exposed at localhost:8080

curl --location --request GET 'http://localhost:8080/swagger-ui/'