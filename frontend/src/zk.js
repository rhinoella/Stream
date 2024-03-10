// Generator of cyclic group G
const g = BigInt(3);
// Secret
const secret = BigInt(7);

const mod = BigInt(1000000000000000000000000000000000) //BigInt(193939);

// Ys is polynomial evaluated at secret point
const commitPoly = (polyCoeff) => {
    let poly = 0n;
    const userCommits = [];
    const elementPoly = [];
    const witnessArray = [];
    const polyLength = polyCoeff.length;

    for (let idx = 0; idx < polyLength; idx++) {
        const currentPoly = (polyCoeff[idx] * ((secret ** BigInt(idx)) % mod)) % mod;
        elementPoly.push(currentPoly);
        poly = (poly + currentPoly) % mod;
        console.log(poly)
        userCommits.push((g ** currentPoly) % mod);
    }

    elementPoly.forEach(element => {
        console.log(g ** (poly - element))

        witnessArray.push((g ** ((poly - element) % mod)) % mod);
    });

    return [(g ** poly) % mod, witnessArray, userCommits];
}

const generateWitnesses = (polyCoeff, s, g) => {
    let witnessArray = [];
    const polyLength = polyCoeff.length;

    for (let idx = 0; idx < polyLength; idx++) {
        let poly = 0n;
        for (let idx_0 = 0; idx_0 < polyLength; idx_0++) {
            if (idx !== idx_0) {
                const currentPoly = (polyCoeff[idx_0] * (s ** BigInt(idx_0)) % mod) % mod;
                poly += currentPoly % mod;
            }
        }
        witnessArray.push((g ** poly) % mod);
    }

    return witnessArray;
}

const verify = (userCommit, witness, aggCommit) => {
    console.log(aggCommit)
    console.log(witness)
    console.log((witness * userCommit) % mod)
    return ((witness * userCommit) % mod) == (aggCommit)
};

export {g, secret, commitPoly, generateWitnesses, verify};