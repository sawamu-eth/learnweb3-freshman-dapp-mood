import {useState} from "react";
import MoodContractABI from './MoodContractABI.json';

function Mood() {
    /**
     * Web3 - smart contract - initialization
     * */
    const MoodContractAddress = "0x7d10330c76e2f4474176670d9abcd01283be5559";
    let MoodContract;
    let signer;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            MoodContract = new ethers.Contract(
                MoodContractAddress,
                MoodContractABI,
                signer
            );
        });
    });

    /**
     * React component initialization
     * **/
    let initialMood = "unknown";
    const [currentMood, setCurrentMood] = useState(initialMood);

    /**
     * How to get a value from a smart contract
     * **/
    async function getMood() {
        const mood = (await MoodContract.getMood()) || initialMood;
        console.log({ mood });
        setCurrentMood(mood);
    }

    /**
     * How to set a value in a smart contract
     * **/
    async function setMood() {
        const mood = document.getElementById("mood").value;
        await MoodContract.setMood(mood);
    }

    /**
     * Simple screen
     * **/
    return (
        <div className="row">
            <div className="col s6">
                <p>Here we can SET the mood:</p>
                <label htmlFor="mood">Mood:</label> <br />
                <input type="text" id="mood" />
                <a className="waves-effect waves-light btn" onClick={setMood}>
                    Set Mood
                </a>
                <div>{status}</div>
            </div>
            <div className="col s6">
                <p>Here we can GET the mood:</p>
                <label htmlFor="moodValue">Current Mood:</label> <br />
                <input type="text" id="moodValue" readOnly value={currentMood} />
                <a className="waves-effect waves-light btn" onClick={getMood}>
                    Get Mood
                </a>
            </div>
        </div>
    );
}

export default Mood;
