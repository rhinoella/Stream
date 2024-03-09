import os
from ecdsa import SECP256k1, ellipticcurve, numbertheory
import hashlib

# Initialize SECP256k1 as the elliptic curve
curve = SECP256k1.curve
G = curve.generator
order = curve.order

# Generate a commitment key H in a transparent setup
def generate_commitment_key_transparent():
    # Hash the generator point G
    hash_value = hashlib.sha256(G.to_string()).digest()
    # Map the hash to an integer and then to a point on the curve
    h_int = int.from_bytes(hash_value, byteorder="big") % order
    H = h_int * G
    return H

# Function to create a Pedersen commitment for a value v with randomness r
def commit(value, randomness, H):
    # Implementation remains the same

# Example usage
H = generate_commitment_key_transparent()
# ...rest of the code remains the same...
