  "use client"
  import axios from "axios";
  import Link from "next/link";
import { useState } from "react";
  
  export default function SignUp() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleSignup = async()=>{
         const response =  await axios.post("http://127.0.0.1:5000/api/register",{
             username: username,
             password: password
          })

          console.log(response.data)
    }

    return (
      <section className="bg-gradient-to-r from-gray-600 to-gray-900 h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                Create an account
              </h1>
            </div>
            {/* Contact form */}
            <div className="mx-auto max-w-[400px]">
              <div className="space-y-5">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="name"
                  >
                    username <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your full name"
                    onChange={(e)=>{
                         setUsername(e.target.value)
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full"
                    onChange={(e)=>{
                      setPassword(e.target.value)
                 }}
                    placeholder="Password (at least 10 characters)"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <button onClick={handleSignup} className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                  Register
                </button>
              
              </div>
            </div>
            {/* Bottom link */}
            <div className="mt-6 text-center text-sm text-indigo-200/65">
              Already have an account?{" "}
              <Link className="font-medium text-indigo-500" href="/signin">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }