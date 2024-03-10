import React, { useState } from 'react';
import { g, secret, commitPoly, generateWitnesses, verify } from "./zk";

const ProofPage = () => {
    const [elCommit, setElCommit] = useState('');
    const [elWitness, setElWitness] = useState('');
    const [verified, setVerified] = useState(false);

    //const commitVector = [ BigInt(3352), BigInt(2637), BigInt(1372), BigInt(2533)];
    const commitVector = [ BigInt(1), BigInt(2), BigInt(3), BigInt(4)];

    const [ aggCommit, witnesses, _ ] = commitPoly(commitVector, secret, g);

    const handleElCommitChange = (e) => {
        setElCommit(e.target.value);
    }

    const handleElWitnessChange = (e) => {
        setElWitness(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setVerified(verify(BigInt(Number(elCommit)), BigInt(Number(elWitness)), aggCommit)); 
        console.log(verified);
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div><b>Secret:</b> {secret.toString()}</div>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <div><b>Vector:</b> {commitVector.map((commit, i) => (
                    <div key={commit}>C<sub>{i}</sub> = {Number(commit)},</div>
                ))}</div>
                <div><b>Aggregated Witnesses:</b> {witnesses.map((witness, i) => (
                    <div key={witness}>C<sub>W<sub>{i}</sub>(s)</sub>: = {Number(witness)},</div>
                ))}</div>
            </div>
            <div><b>Aggregated Polynomial Commit C<sub>P(s)</sub>:</b> {Number(aggCommit)}</div>
            <br></br>
            <div>With only the values C<sub>P(s)</sub> and g public, we can prove we know element C<sub>i</sub> in the vector, without revealing the other elements.</div>
            <form onSubmit={handleSubmit}>
            Vector element:
            <input
                type="text"
                value={elCommit}
                onChange={handleElCommitChange}
            />
            <br/>
            Associated Aggregated Witness:
            <input
                type="text"
                value={elWitness}
                onChange={handleElWitnessChange}
            />
            <br/>
            <br/>
            <button type="submit">Go!</button>
            </form>
            {() => { return verified ? "This element is part of the vector!" : ""; }}
        </div>
    );
};

export default ProofPage;