# To get the the wallet adress we need the private key first. 
# Then we need to convert it to bytes and then use SECP256k1 curve to calculate the public key
# with the public key we can use the keccak256 algorithm to get the wallet address 


# use an .env file and store your private key as PRIVATE_KEY

import os
from dotenv import load_dotenv
from ecdsa import SigningKey, SECP256k1
from Crypto.Hash import keccak

load_dotenv()

k = str(os.getenv('PRIVATE_KEY'))

# using our own keccak256 function to calculate the hash
def keccak256(data: bytes) -> bytes: 
    k = keccak.new(digest_bits=256)
    k.update(data)
    return k.digest()


# function to convert the hex private key to bytes of length 32

def hex_to_bytes(hex: str) -> bytes:  

    return bytes.fromhex(hex)

private_key_bytes = hex_to_bytes(k)



# private key to public using the secp256k1 elliptic curve
def private_key_to_public_key(private_key: bytes) -> bytes: 


    signing_key = SigningKey.from_string(private_key, curve=SECP256k1) #validate the private key
    verifying_key = signing_key.get_verifying_key() # calculates the public key after validation
    pubkey_bytes = verifying_key.to_string()
    return pubkey_bytes
 

pubkey = private_key_to_public_key(private_key_bytes)


# public key to an eth address
def public_key_to_eth_address(pubkey_bytes: bytes) -> str: 
    
        hash = keccak256(pubkey_bytes)

        last_20_bytes = hash[-20:]
        
        address = last_20_bytes.hex()

        return "0x" + address 

eth = public_key_to_eth_address(pubkey)

print("Your wallet address is: " + eth)



