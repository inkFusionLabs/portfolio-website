#!/bin/bash

# Create cert directory if it doesn't exist
mkdir -p cert
cd cert

# Generate self-signed certificate for localhost
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"

echo "Self-signed certificate generated in ./cert (key.pem and cert.pem)" 