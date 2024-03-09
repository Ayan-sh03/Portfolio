"use client"
import React, { FormEvent } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedInIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = React.useState(false)

  const handleSubmit = async (e:FormEvent)=>{
    e.preventDefault()

    const data = {
      email :e.target.email.value,
      subject : e.target.subject.value,
      message : e.target.message.value
    }

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body :JSONdata
    }

     const res =  await fetch(endpoint, options);

     const resData = await res.json()
     if(resData.status === 200){
      console.log("Message sent successfully")
      setEmailSubmitted(true)
     }
   


  }


  return (
    <section id="contact"  className="grid md:grid-cols-2 my-12 md:my-12 py-12 gap-4 ">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>

      <div>
        <h5 className="text-xl font-bol text-white my-2">
          Let&apos;s get in touch!
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities , my inbox is always
          open . Whether you hav a question or just want to say hi , I &apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href={"https://github.com/ayansh-03"}>
            <Image src={GithubIcon} width={30} height={20} alt="Github" />
          </Link>
          <Link href={"https://www.linkedin.com/in/ayan-sh003/"}>
            <Image src={LinkedInIcon} width={30} height={20} alt="LinkedIn" />
          </Link>
        </div>
      </div>
      <form action="" className="flex flex-col " onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="text-white block mb-2  text-sm font-medium "
            >
            Email
          </label>
          <input
            type="email"
            
            name="email"
            id="email"
            required
            placeholder="johndoe@example.com"
            className="bg-[#18191E] border border-[#3333FF] placeholder-[#9CA1A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 "
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="Subject"
            className="text-white block mb-2 text-sm font-medium "
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            placeholder="Just Say Hi!"
            className="bg-[#18191E] border border-[#3333FF] placeholder-[#9CA1A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 "
          />
        </div>
        <div className="mb-6 ">
          <label
            htmlFor="message"
            className=" placeholder-[#9CA1A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 "
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="bg-[#18191E] my-3 border border-[#3333FF] placeholder-[#9CA1A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            placeholder="Leave Your Message Here"
          />

          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send Message</button>
        </div>
        {
          emailSubmitted && (
            <p className="text-gree text-sm mt-2">Email Send Successfuly </p>
          ) 
        }
      </form>
    </section>
  );
};

export default EmailSection;
