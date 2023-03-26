import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis() //useMoralis is a react Hook, it is used to track the state in our application

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
        // enableWeb3()
    }, [isWeb3Enabled])
    //UseEffect function: 2 parameters: function, dependency array
    //Anything in the dependency array changes, function executes

    // no array, run on every render
    // empty array, run once
    // dependency array, run when the stuff in it changesan

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()

                        if (window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
