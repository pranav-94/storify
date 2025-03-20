'use client'

  import Link from "next/link";
  import {useState} from 'react'
  import axios from "axios";
  import { useRouter } from 'next/navigation';
  export default function SignIn() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useRouter()

    const handleSignin = async()=>{
        const response = await axios.post('http://127.0.0.1:5000/api/login',{
          username: username,
          password: password
         })
         if(response.status === 200){
              navigate.push('/home')
         }
    }

    return (
      <section className="bg-gradient-to-r from-gray-600 to-gray-900 h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                Welcome back
              </h1>
            </div>
            {/* Contact form */}
            <div className="mx-auto max-w-[400px]">
              <div className="space-y-5">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="email"
                  >
                    username
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your username"
                    onChange={(e)=>{
                      setUsername(e.target.value)
                    }}
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <label
                      className="block text-sm font-medium text-indigo-200/65"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Link
                      className="text-sm text-gray-600 hover:underline"
                      href="/reset-password"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full"
                    placeholder="Your password"
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <button
                onClick={handleSignin}
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                  Sign in
                </button>
                
              </div>
            </div>
            {/* Bottom link */}
            <div className="mt-6 text-center text-sm text-indigo-200/65">
              Don't you have an account?{" "}
              <Link className="font-medium text-indigo-500" href="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

    