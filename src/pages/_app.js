// import { UserProvider } from "@/components/UserProvider";
import "/src/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    // <UserProvider>
      <Component {...pageProps} />
    // </UserProvider>
  );
}
