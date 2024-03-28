<img src="https://github.com/rhinoella/Stream/assets/101950441/0c7a86bd-9db7-497e-99e3-bfd0f7c5bcdf" width="100" height="100">

# STREAM
### Homomorphically Encrypted ERP

Stream was initially developed as part of the ETHOxford 2024 hackathon, however the team is currently working to expand the project.
Currently we offer a proof-of-concept of an encrypted payroll management scheme.

<img width="461" alt="Screenshot 2024-03-28 at 23 30 55" src="https://github.com/rhinoella/Stream/assets/101950441/f1523e42-7b57-416d-b0ec-d23314223932">

Stream utilises Pedersen commitment schemes and Elliptic Curve Cryptography to encrypt the company's payroll allocations, stored on a public blockchain to prevent tampering.
The encrypted values can be verified and proved to be correct due to the homomorphic nature of the commitment scheme.

The repository also provides some experimentation into Polynomial Vector Commitments, which would allow for only the root hash of the vector to be stored on the blockchain, enabling proof-of-membership without needing to provide knowledge of any other vector elements.

## Roadmap

- Take computation off-chain and use zk-SNARK circuits to verify submitted values
- Further develop the vector commitment scheme, store data in a Verkle tree for efficiency and privacy
- Move towards Fully Homomorphic Encryption
