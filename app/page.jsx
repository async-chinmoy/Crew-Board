"use client";

import Link from "next/link";
import Image from "next/image";
import preview from "@/assets/preview.png";
import stack from "@/assets/stack.png";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ShieldCheck,
  Users,
  Bot,
  Video,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Team Management",
    desc: "Assign tasks, set pay rates, track check-ins, and manage field teams with ease.",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    desc: "Monitor efficiency, task progress, and salary distribution using real-time charts.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    desc: "RBAC-powered system with roles like admin, manager, and worker — tightly controlled.",
  },
  {
    icon: Bot,
    title: "AI HR Agent",
    desc: "Let workers ask about salary, leaves, or assigned tasks — AI answers them instantly.",
  },
  {
    icon: Video,
    title: "Built-in Calls (RTC)",
    desc: "Voice/video calls between managers and workers with WebRTC and Socket.IO.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen text-white bg-gradient-radial from-gray-900 via-gray-950 to-black px-6 md:px-12 py-12">

      <section className="text-center space-y-6 max-w-4xl mx-auto mt-12">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          CrewBoard
        </h1>
        <p className="text-lg text-gray-400">
          Real-time workforce and payment management for field teams &
          contractors.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/login">
            <Button className="px-6 py-4 text-md">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button className="px-6 py-4 text-md bg-green-600 border-gray-600 hover:border-white">
              Login
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-24 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Why CrewBoard?</h2>
        <p className="text-gray-400">
          Traditional workforce systems fail to manage remote teams, contract
          workers, and real-time payments. CrewBoard solves this with GPS-based
          check-ins, live task tracking, and salary automation.
        </p>
      </section>

      <section className="mt-24 max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-lg hover:shadow-white/25 transition cursor-pointer "
          >
            <Icon className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-md">
          <Image
            src={preview}
            alt="Dashboard Preview"
            width={600}
            height={100}
            className="w-full object-cover h-100 opacity-90 hover:opacity-100 transition"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Powerful Dashboards</h2>
          <p className="text-gray-400">
            Whether you're a site manager or a worker, CrewBoard offers a
            personalized dashboard to keep your day organized and payments on
            track.
          </p>
          <ul className="text-gray-300 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              ✅ Task overview and daily check-ins
            </li>
            <li className="flex items-center gap-2">
              ✅ Live location and geo-attendance
            </li>
            <li className="flex items-center gap-2">
              ✅ Payment status, bonuses, and approvals
            </li>
            <li className="flex items-center gap-2">
              ✅ Manager actions: approve, assign, communicate
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Future‑Ready Architecture</h2>
          <p className="text-gray-400">
            CrewBoard combines proven technologies into a modular, scalable
          architecture ready for real-time AI, RTC, and analytics.
          </p>
          <ul className="text-gray-300 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              ➡️ NextJS
            </li>
            <li className="flex items-center gap-2">
              ➡️ PostGres
            </li>
            <li className="flex items-center gap-2">
              ➡️ drizzle
            </li>
            <li className="flex items-center gap-2">
              ➡️ Zod
            </li>
          </ul>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-md">
          <Image
            src={stack}
            alt="archetecture"
            width={600}
            height={100}
            className="w-full object-cover h-100 opacity-90 hover:opacity-100 transition"
          />
        </div>
      </section>


      <section className="mt-10 mb-22 text-center">
        <h3 className="text-2xl font-bold mb-10">
          Start syncing your crew today
        </h3>
        <Link href="/login">
          <Button className="text-md px-8 py-4 bg-blue-400">
            Create Your Account
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
