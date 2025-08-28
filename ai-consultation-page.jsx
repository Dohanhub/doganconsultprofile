import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, Bot, Calendar, Check, Globe2, Phone, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip } from "recharts";

// Minimal sample data for the metrics chart
const kpi = [
  { m: "Jan", v: 12 },
  { m: "Feb", v: 16 },
  { m: "Mar", v: 22 },
  { m: "Apr", v: 28 },
  { m: "May", v: 36 },
  { m: "Jun", v: 44 },
];

function ChatDemo() {
  const [messages, setMessages] = useState([
    { role: "user", text: "Draft a PDPL-compliant data policy." },
    { role: "assistant", text: "Here is a lean, compliant outline. Add your data map and DPO contact." },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    if (!draft.trim()) return;
    const next = { role: "user", text: draft.trim() } as const;
    setDraft("");
    setMessages((m) => [...m, next]);
    setBusy(true);
    // Simulate an assistant response
    await new Promise((r) => setTimeout(r, 600));
    setMessages((m) => [
      ...m,
      { role: "assistant", text: "Acknowledged. Generating a concise plan with risks and owners." },
    ]);
    setBusy(false);
  }

  return (
    <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Bot className="h-4 w-4" />
          <span>Live Assistant Demo</span>
          <Badge variant="secondary" className="ml-auto">Preview</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-56 overflow-y-auto rounded-xl border border-white/10 p-4 bg-black/20">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user" ? "bg-white/20 text-white" : "bg-white text-black"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {busy && (
            <div className="text-xs text-white/60">Assistant is thinking…</div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ask something specific…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            className="bg-white/10 text-white placeholder:text-white/50"
          />
          <Button onClick={send} className="gap-1">
            <SendIcon className="h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NextDecadeAIPage() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.35),transparent),radial-gradient(1000px_500px_at_120%_10%,rgba(16,185,129,0.25),transparent)]">
      {/* Top nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-300" />
            <span className="font-semibold tracking-tight">Next‑Decade AI</span>
          </div>
          <nav className="ml-auto hidden md:flex gap-6 text-sm text-white/80">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#solutions" className="hover:text-white">Solutions</a>
            <a href="#consult" className="hover:text-white">Consult</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="ml-4 flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="hidden sm:inline-flex">Get a demo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book a 30‑minute VC</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">We will auto-schedule the next open slot and email you the link.</p>
                <Separator className="my-3" />
                <div className="grid grid-cols-1 gap-3">
                  <Input placeholder="Name" />
                  <Input placeholder="Work email" type="email" />
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Request time
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <a href="#consult"><Button className="gap-1"><ArrowRight className="h-4 w-4" /> Consult</Button></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.1),transparent_60%),conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.25),rgba(16,185,129,0.25),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Ship compliant AI that actually moves the KPI
          </motion.h1>
          <div className="space-y-6">
            <p className="text-white/80 max-w-prose">
              Deploy domain agents, retrieval, and guardrails aligned with PDPL and NCA controls. Integrate in weeks, not quarters.
            </p>
            <div className="flex gap-3">
              <a href="#consult"><Button className="gap-1"><Rocket className="h-4 w-4" /> Start consultation</Button></a>
              <a href="#features"><Button variant="secondary" className="gap-1"><ShieldCheck className="h-4 w-4" /> See controls</Button></a>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Avatar className="h-6 w-6"><AvatarFallback>AO</AvatarFallback></Avatar>
              <span>Trusted deployments across public and private sectors</span>
            </div>
          </div>
          <div className="lg:col-span-2 grid lg:grid-cols-3 gap-6 mt-6">
            <Card className="col-span-2 backdrop-blur bg-black/30 border-white/10">
              <CardContent className="p-6">
                <ChatDemo />
              </CardContent>
            </Card>
            <Card className="backdrop-blur bg-black/30 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Globe2 className="h-4 w-4" />
                  Deployment KPI
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={kpi} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="currentColor" stopOpacity={0.7} />
                          <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="m" hide />
                      <YAxis hide />
                      <RTooltip contentStyle={{ background: "rgba(0,0,0,0.7)", border: "none", color: "white" }} />
                      <Area type="monotone" dataKey="v" stroke="currentColor" fill="url(#g)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-xs text-white/70">Avg handle time ↓ 42% • Deflection ↑ 31%</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Guardrails">
            Policy engines, citations, red-teaming, audit trails.
          </Feature>
          <Feature icon={<Bot className="h-5 w-5" />} title="Domain Agents">
            Tools, memory, and workflows tuned for your org.
          </Feature>
          <Feature icon={<Rocket className="h-5 w-5" />} title="Hybrid Ops">
            Cloud + on-prem, failover, and cost-aware routing.
          </Feature>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="mx-auto max-w-7xl px-4 pb-16">
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="bg-white/10">
            <TabsTrigger value="public">Public sector</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="retail">Retail</TabsTrigger>
          </TabsList>
          <TabsContent value="public" className="mt-6">
            <SolutionsCard
              title="Citizen services copilot"
              bullets={["Arabic-first RAG", "PDPL controls", "Omnichannel"]}
            />
          </TabsContent>
          <TabsContent value="finance" className="mt-6">
            <SolutionsCard title="KYC + support automation" bullets={["PII safe", "Fraud heuristics", "Human-in-loop"]} />
          </TabsContent>
          <TabsContent value="retail" className="mt-6">
            <SolutionsCard title="Commerce assistant" bullets={["Catalog brains", "A/B testing", "Personalization"]} />
          </TabsContent>
        </Tabs>
      </section>

      {/* Consult */}
      <section id="consult" className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="h-4 w-4" />
                Request consultation
                <Badge variant="secondary" className="ml-2">Auto‑approve</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ConsultForm />
            </CardContent>
          </Card>
          <Card className="backdrop-blur bg-black/30 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <ShieldCheck className="h-4 w-4" />
                Compliance snapshot
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm mb-2">PDPL readiness</div>
                <Progress value={82} />
              </div>
              <div>
                <div className="text-sm mb-2">NCA controls</div>
                <Progress value={74} />
              </div>
              <div className="text-xs text-white/70">We map your data flows, retention, and access models to local regs.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid gap-6">
          <Faq q="How fast can we deploy?" a="Pilot in 2–4 weeks. Production in 6–10, subject to data and systems access." />
          <Faq q="Where does data live?" a="Your cloud or on‑prem. We support data residency in KSA regions." />
          <Faq q="Do you support Arabic?" a="Yes. Retrieval, generation, and evaluation are Arabic‑first." />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-white/60 flex items-center justify-between">
          <span>© {year} Next‑Decade AI</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> PDPL • NCA • ISO 27001 aligned</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card className="backdrop-blur bg-black/30 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2 text-white/90">
          <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
          <div className="font-semibold">{title}</div>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-white/70">{children}</CardContent>
    </Card>
  );
}

function SolutionsCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <Card className="backdrop-blur bg-black/30 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          <div className="font-semibold">{title}</div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 text-sm text-white/80 space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <Card className="backdrop-blur bg-black/30 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <QuestionIcon className="h-4 w-4" />
          <div className="font-medium">{q}</div>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-white/80">{a}</CardContent>
    </Card>
  );
}

function ConsultForm() {
  const [state, setState] = useState<{ ok?: boolean; refId?: string; bookingUrl?: string; error?: string }>({});
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setLoading(true);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "next-decade-ai" }),
      });
      const json = await res.json();
      setState(json);
    } catch (err: any) {
      setState({ error: "Network error. Try email ops@yourdomain" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input name="name" placeholder="Name" required className="bg-white/10 text-white placeholder:text-white/60" />
        <Input name="email" type="email" placeholder="Work email" required className="bg-white/10 text-white placeholder:text-white/60" />
      </div>
      <Input name="company" placeholder="Company" className="bg-white/10 text-white placeholder:text-white/60" />
      <Input name="interest" placeholder="Interest (e.g., RAG, agents, guardrails)" required className="bg-white/10 text-white placeholder:text-white/60" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input name="budget" placeholder="Budget band (e.g., 50–100k)" className="bg-white/10 text-white placeholder:text-white/60" />
        <Input name="timeline" placeholder="Timeline (e.g., 8–10 weeks)" className="bg-white/10 text-white placeholder:text-white/60" />
      </div>
      <Textarea name="notes" placeholder="Notes / context" className="bg-white/10 text-white placeholder:text-white/60 min-h-[100px]" />
      <div className="flex items-center gap-2 text-xs text-white/70">
        <input type="checkbox" name="consent" required className="accent-white" />
        <span>I agree to be contacted and to the privacy policy.</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={loading} type="submit" className="gap-1">
          <SendIcon className="h-4 w-4" />
          {loading ? "Sending…" : "Send request"}
        </Button>
        {state.ok && state.refId && (
          <a href={state.bookingUrl ?? "#"} className="text-sm underline">Join VC / Add to calendar • {state.refId}</a>
        )}
        {state.error && <span className="text-sm text-red-300">{state.error}</span>}
      </div>
    </form>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function QuestionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 9a3 3 0 116 0c0 2-3 3-3 5" />
      <path d="M12 17h.01" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
