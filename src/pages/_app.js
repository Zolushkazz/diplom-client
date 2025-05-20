// import { UserProvider } from "@/components/UserProvider";
import { LoadingProvider } from "../components/LoadingProvider";
import "/src/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        // <UserProvider>
        <LoadingProvider>
            <Component {...pageProps} />
        </LoadingProvider>
        // </UserProvider>
    );
}
