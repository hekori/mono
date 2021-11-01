

# Development machine

There must be the following files in the project's parent directory (top of where the package.json is).

There should be the following files
1. traqrcode--dev.txt
2. traqrcode--prod.txt
3. .env (symbolic link to traqrcode--dev.txt). I.e.,
```shell
ln -s traqrcode--dev.txt .env
```


# Production server

The flightplan deployment script uploads the traqrcode--prod.txt to the server.

# What are the env vars for?

The files contain environment variables that are necessary for

1. building front-end bundle (build time)
2. running the back-end code (run time)
