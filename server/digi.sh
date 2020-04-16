#! /bin/bash

# WARNING: As docker requires sudo this assumes that you have a separate digitalocean ssh key under /root/.ssh/ otherwise it will not work.

# Local machine (Assumes local and host machine is logged in to the same docker account)
yarn build
docker build -t seltiiix/dawpark:latest .
docker push seltiiix/dawpark:latest

# We connect to host and pull our docker image and deploy it
ssh dawpark "docker pull seltiiix/dawpark:latest && docker tag seltiiix/dawpark:latest dokku/dawpark:latest && dokku tags:deploy dawpark latest"