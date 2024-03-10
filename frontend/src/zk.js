// Generator of cyclic group G
const g = 3;
// Secret
const secret = 1;
// polynomial coefficients
const polyCoeff = [1, 2, 3, 4, 5, 6];

//const mod = BigInt(1000000000000000000000000000000000) //BigInt(193939);

// Ys is polynomial evaluated at secret point
function commitPoly(polyCoeff) {
    let poly = 0;
    const userCommits = [];
    const elementPoly = [];

    for (let idx = 0; idx < polyCoeff.length; idx++) {
        const currentPoly = polyCoeff[idx] * (secret ** (polyCoeff.length - idx - 1));
        elementPoly.push(currentPoly);
        poly += currentPoly;
        console.log(poly);
        userCommits.push((g ** currentPoly));
    }

    //elementPoly.forEach(element => {
    //    console.log(g ** (poly - element))
    //    witnessArray.push((g ** ((poly - element) % mod)) % mod);
    //});

    return [(g ** poly), userCommits];
};


function generateWitnesses(polyCoeff) {
    const witnessArray = [];

    for (let idx = 0; idx < polyCoeff.length; idx++) {
        let poly = 0;
        for (let idx_0 = 0; idx_0 < polyCoeff.length; idx_0++) {
            if (idx !== idx_0) {
                const currentPoly = polyCoeff[idx_0] * (secret ** (polyCoeff.length - idx_0 - 1));
                poly += currentPoly;
            };
        };
        witnessArray.push((g ** poly));
    }

    return witnessArray;
};


function verify(userCommit, witness, aggCommit) {
    if (aggCommit / witness == userCommit) {
        return 1;
    } else {
        return 0;
    };
};


const [aggCommit, userCommits] = commitPoly(polyCoeff);
const witnesses = generateWitnesses(polyCoeff);
const verifications = [];
for (let idx = 0; idx < witnesses.length; idx++) {
    verifications.push(verify(userCommits[idx], witnesses[idx], aggCommit))
}

export {g, secret, aggCommit, userCommits, witnesses, verify};