/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  BarChart3, 
  MessageSquare, 
  Play, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  User,
  Settings,
  Info,
  ShieldAlert,
  Zap,
  Target
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { EXERCISES, type Exercise } from './constants';

// --- Types ---
type Tab = 'exercises' | 'progress' | 'coach';

const PROGRESS_DATA = [
  { day: 'Mon', stability: 65, pain: 4 },
  { day: 'Tue', stability: 70, pain: 3 },
  { day: 'Wed', stability: 60, pain: 5 },
  { day: 'Thu', stability: 85, pain: 2 },
  { day: 'Fri', stability: 90, pain: 2 },
  { day: 'Sat', stability: 75, pain: 4 },
  { day: 'Sun', stability: 95, pain: 1 },
];

// --- Components ---

const SpatialBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#0a1a1f]">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#8fb9a8]/20 blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#1a3a3a]/40 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,26,31,0.9)_100%)]" />
  </div>
);

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => {
  const items = [
    { id: 'exercises', icon: Activity, label: 'Stability Lab' },
    { id: 'progress', icon: BarChart3, label: 'Joint Insights' },
    { id: 'coach', icon: MessageSquare, label: 'EDS Specialist' },
  ];

  return (
    <div className="w-24 md:w-72 h-full glass-dark flex flex-col items-center md:items-stretch p-6 gap-10">
      <div className="flex items-center gap-4 px-2 py-4">
        <div className="w-12 h-12 rounded-2xl bg-[#8fb9a8] flex items-center justify-center shadow-xl shadow-[#8fb9a8]/10">
          <Zap className="text-[#0a1a1f] w-7 h-7" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold tracking-tight leading-none">VisionPT</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8fb9a8] font-bold mt-1">EDS Edition</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={cn(
              "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative",
              activeTab === item.id 
                ? "bg-white/5 text-white shadow-lg" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-6 h-6 transition-colors", activeTab === item.id ? "text-[#8fb9a8]" : "group-hover:text-[#8fb9a8]")} />
            <span className="font-medium text-lg hidden md:block">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute left-0 w-1.5 h-8 bg-[#8fb9a8] rounded-r-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <div className="glass rounded-2xl p-4 hidden md:block mb-4">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Daily Tip</p>
          <p className="text-xs text-white/70 italic">"Focus on proprioception today. Feel your joints in space."</p>
        </div>
        <button className="flex items-center gap-4 px-5 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-6 h-6" />
          <span className="font-medium text-lg hidden md:block">Settings</span>
        </button>
        <div className="flex items-center gap-4 px-5 py-5 border-t border-white/5 mt-2">
          <div className="w-10 h-10 rounded-full bg-[#8fb9a8]/10 flex items-center justify-center overflow-hidden border border-white/10">
            <User className="w-6 h-6 text-[#8fb9a8]" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold">Chanelle H.</p>
            <p className="text-[10px] text-[#8fb9a8] font-bold">STABILITY LEVEL 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExerciseCard: React.FC<{ exercise: Exercise; onClick: () => void }> = ({ exercise, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -5 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="glass-card rounded-[2.5rem] overflow-hidden cursor-pointer group"
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={exercise.image} 
        alt={exercise.name} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1f] via-transparent to-transparent" />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full glass-dark text-[10px] uppercase tracking-widest font-bold text-[#8fb9a8]">
          {exercise.category}
        </span>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="max-w-[70%]">
          <h3 className="text-2xl font-bold leading-tight mb-1">{exercise.name}</h3>
          <p className="text-xs text-white/60 line-clamp-1">{exercise.description}</p>
        </div>
        <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-[#8fb9a8] group-hover:text-[#0a1a1f] transition-all duration-500">
          <Play className="w-5 h-5 fill-current" />
        </div>
      </div>
    </div>
    <div className="p-6 flex items-center justify-between text-white/40 text-[11px] font-bold uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#8fb9a8]" />
        <span>{exercise.duration}</span>
      </div>
      {exercise.reps && (
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#8fb9a8]" />
          <span>{exercise.reps}</span>
        </div>
      )}
    </div>
  </motion.div>
);

const ExerciseDetail: React.FC<{ exercise: Exercise; onBack: () => void }> = ({ exercise, onBack }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className="h-full flex flex-col gap-8"
    >
      <div className="flex items-center gap-6">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-4xl font-bold tracking-tight">{exercise.name}</h2>
          <p className="text-[#8fb9a8] font-bold text-xs uppercase tracking-[0.3em] mt-1">{exercise.category} Protocol</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1 overflow-y-auto pr-6 custom-scrollbar pb-10">
        <div className="space-y-8">
          <div className="aspect-video rounded-[3rem] overflow-hidden glass relative group shadow-2xl">
            <img 
              src={exercise.image} 
              alt={exercise.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-24 h-24 rounded-full bg-[#8fb9a8]/90 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-[#0a1a1f]">
                <Play className="w-10 h-10 fill-current" />
              </button>
            </div>
          </div>

          <div className="glass rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Info className="w-6 h-6 text-[#8fb9a8]" />
              Therapeutic Context
            </h3>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              {exercise.description}
            </p>
            {exercise.edsNote && (
              <div className="p-5 rounded-2xl bg-[#8fb9a8]/10 border border-[#8fb9a8]/20 flex gap-4">
                <ShieldAlert className="w-6 h-6 text-[#8fb9a8] flex-shrink-0" />
                <p className="text-sm text-[#8fb9a8] font-medium leading-relaxed">
                  <span className="font-bold uppercase tracking-widest block mb-1">EDS Safety Note:</span>
                  {exercise.edsNote}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass rounded-[2.5rem] p-8 space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Spatial Guidance
            </h3>
            <div className="space-y-6">
              {exercise.instructions.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-10 h-10 rounded-2xl glass-dark flex-shrink-0 flex items-center justify-center text-lg font-bold text-[#8fb9a8] group-hover:bg-[#8fb9a8] group-hover:text-[#0a1a1f] transition-all duration-500">
                    {i + 1}
                  </div>
                  <p className="text-white/80 text-lg pt-1 font-light leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCompleted(!completed)}
            className={cn(
              "w-full py-6 rounded-[2rem] font-bold text-xl transition-all duration-700 flex items-center justify-center gap-3 shadow-2xl",
              completed 
                ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                : "bg-[#8fb9a8] text-[#0a1a1f] hover:bg-white shadow-[#8fb9a8]/20"
            )}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-7 h-7" />
                Session Logged
              </>
            ) : (
              "Complete Session"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressView = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="h-full flex flex-col gap-8 overflow-y-auto pr-6 custom-scrollbar pb-10"
  >
    <div className="mb-2">
      <h2 className="text-4xl font-bold tracking-tight">Joint Insights</h2>
      <p className="text-white/40 text-lg">Tracking your stability and comfort levels.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Stability Index', value: '82%', icon: Zap, color: 'text-[#8fb9a8]' },
        { label: 'Avg Pain Level', value: '2.4', icon: ShieldAlert, color: 'text-rose-400' },
        { label: 'Total Sessions', value: '156', icon: Activity, color: 'text-blue-400' },
      ].map((stat, i) => (
        <div key={i} className="glass rounded-[2rem] p-8 flex items-center gap-6">
          <div className={cn("w-16 h-16 rounded-[1.25rem] glass-dark flex items-center justify-center", stat.color)}>
            <stat.icon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="glass rounded-[2.5rem] p-8 h-[450px] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">Stability Progression</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8fb9a8]" />
              <span className="text-xs text-white/40">Stability</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PROGRESS_DATA}>
              <defs>
                <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8fb9a8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8fb9a8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(10,26,31,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#8fb9a8' }}
              />
              <Area type="monotone" dataKey="stability" stroke="#8fb9a8" fillOpacity={1} fill="url(#colorStability)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] p-8 h-[450px] flex flex-col">
        <h3 className="text-2xl font-bold mb-8">Pain Level Tracking</h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PROGRESS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(10,26,31,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#f43f5e' }}
              />
              <Bar dataKey="pain" fill="#f43f5e" radius={[10, 10, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </motion.div>
);

const AICoach = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Welcome back. I am your EDS Specialist Assistant. How are your joints feeling today? We can discuss stability protocols, manage flare-ups, or refine your isometric routine." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "You are a professional Physical Therapist and EDS (Ehlers-Danlos Syndrome) Specialist for a spatial computing app called VisionPT. Your tone is calming, clinical yet empathetic, and highly professional. Focus on joint stability, proprioception, and avoiding hyperextension. Never suggest high-impact movements. Remind users to stop if they feel 'clicking' or subluxation. Format responses for a premium, minimal spatial interface.",
        },
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "I'm sorry, I couldn't process that. Could you try again?" }]);
    } catch (error) {
      console.error("AI Coach Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Connection interrupted. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col glass rounded-[3rem] overflow-hidden shadow-2xl"
    >
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8fb9a8] to-[#1a3a3a] flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">EDS Specialist</h3>
            <p className="text-[10px] text-[#8fb9a8] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8fb9a8] animate-pulse" />
              Spatial Assistant Active
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[75%] p-6 rounded-[2rem] text-lg leading-relaxed font-light",
              msg.role === 'user' 
                ? "bg-[#8fb9a8] text-[#0a1a1f] rounded-tr-none font-medium" 
                : "glass-dark text-white/90 rounded-tl-none border border-white/5"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-dark p-6 rounded-[2rem] rounded-tl-none flex gap-2">
              <div className="w-2 h-2 bg-[#8fb9a8] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[#8fb9a8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-[#8fb9a8] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-white/5 bg-white/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your symptoms or ask for a protocol..."
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-8 pr-16 focus:outline-none focus:ring-2 focus:ring-[#8fb9a8]/30 transition-all text-lg font-light"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 w-12 h-12 rounded-2xl bg-[#8fb9a8] text-[#0a1a1f] flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('exercises');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="relative w-full h-screen flex overflow-hidden text-white selection:bg-[#8fb9a8]/30">
      <SpatialBackground />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 md:p-12 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="h-full flex flex-col"
            >
              {selectedExercise ? (
                <ExerciseDetail 
                  exercise={selectedExercise} 
                  onBack={() => setSelectedExercise(null)} 
                />
              ) : (
                <>
                  <div className="mb-10">
                    <h2 className="text-5xl font-bold tracking-tight mb-3">Stability Lab</h2>
                    <p className="text-white/40 text-xl font-light">Custom protocols for hypermobility and joint awareness.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 overflow-y-auto pr-6 custom-scrollbar pb-10">
                    {EXERCISES.map((ex) => (
                      <ExerciseCard 
                        key={ex.id} 
                        exercise={ex} 
                        onClick={() => setSelectedExercise(ex)} 
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <ProgressView key="progress" />
          )}

          {activeTab === 'coach' && (
            <AICoach key="coach" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

