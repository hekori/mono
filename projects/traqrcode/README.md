# Traqrcode

Track & act on QR code scans

```
Licence: see LICENSE.md

Author and copyright
Sebastian F. Walter
sebastian.walter@hekori.com

hekori GmbH
Kastellweg 29
D-69120 Heidelberg
Germany
```


## Prerequisites

- your local machine is MacOS or Linux
- a domain {yourdomain}
- access to the DNS records of {yourdomain}
- Debian 10 system
- a SSL Certificate for {yourdomain}

{yourdomain} is a placeholder for your domain, e.g. `www.traqrcode.com`.


## Installation on {yourdomain}

Goto the root folder of Traqrcode where also this README.md file is.

Run 
```
cp .env .env.prod
```
and adapt `.env.prod`.

Run
```
yarn install
yarn push-ssh-key
yarn provision
yarn deploy
```

This installs all required Debian packages and creates directories.
After completing you should have the following file structure on the remote {yourdomain}.

```
/webapps/{yourdomain}# tree -L 2
```
and
```
/etc/nginx# tree -L 2 
/etc/nginx
├── sites-available
│   ├── default
│   └── {yourdomain}
└── sites-enabled
    └── {yourdomain} -> /etc/nginx/sites-available/{yourdomain}
```

Then use `pm2` to automatically launch the application on port 8000.

### Updating the .env file

Put your changes in .env.prod on your local system on the same file level where the README.md is.
Then run `yarn deploy`. This will upload .env.prod to the remote .env file.


### Sending E-Mails

There are two options:

1) Send email from an SMTP Server
2) Send email directly from the APP Server

For 1. you need to add the SMTP credentials to the .env.prod file.

For 2. you need to setup SPF and DKIM DNS records. Otherwise, your emails will get flagged as spam.


#### Add SPF TXT record to your DNS records

Allow sending from specific IP listed in the A or MX records for your domain, soft-fail all others
```
v=spf1 a mx ~all
```

Allow sending from specific IPs, soft-fail all others
```
v=spf1 ip4:83.169.7.235 ip6:2a01:488:66:1000:b01c:c72:0:1 ~all
```

Ref: https://dmarcian.com/spf-syntax-table/

#### Add DKIM TXT record to your DNS records

```
ssh root@{yourdomain}
cd /webapps/{yourdomain}
mkdir dkim && cd dkim
apt-get update
apt-get upgrade
apt-get install opendkim opendkim-tools
opendkim-genkey -s mail -d {yourdomain}
```
Put the private key into `.env.prod` and the public key
to a TXT DNS records
```
TXT DNS record
Name: mail._domainkey.{yourdomain}.
Text: v=DKIM1; k=rsa; p=MIxxxxxxxxxxxxxxxxxxAB
```

Ref: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy

### PM2

```
pm2 list
pm2 delete all
pm2 start "<cmd>" --name "<name>"
pm2 log api_traqrcode_com
```

