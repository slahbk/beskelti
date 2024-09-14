import "./App.css";
import Auth from "./components/Auth";
import { GoogleLogin } from '@react-oauth/google';
import GoogleAuth from "./components/GoogleAuth";

export default function App() {

  return (
    <>
      <GoogleAuth />
    </>

  );
}
