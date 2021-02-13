
#!/bin/bash

echo 'DB_HOST="mongodb://localhost:27017/xmeme"' > .env

nodemon app.js

