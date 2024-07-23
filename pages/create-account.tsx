import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      <h2>Login</h2>

      <div className="card">
        <form action="">
            <label htmlFor="account">
                <input id="account" name="account" />
            </label>

            <label htmlFor="password">
                <input id="password" name="password" />
            </label> 
            <label htmlFor="repassword">
                <input id="repassword" name="repassword" />
            </label> 

            <button>Create Account</button>           
        </form>            
      </div>





    </main>
  );
}
