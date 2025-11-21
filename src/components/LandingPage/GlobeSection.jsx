import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Workflow, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ShinyButton } from "../ui/shiny-button";

export function GlobeSection() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg/95 to-dark-card/10 overflow-hidden py-20 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 via-transparent to-dark-bg/30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(45, 212, 191, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(45, 212, 191, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-teal-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-10 w-16 h-16 bg-green-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large animated globe icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <Globe className="w-[600px] h-[600px] text-teal-400" strokeWidth={0.5} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 via-teal-500/10 to-teal-500/20 border border-teal-500/30 backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/10 via-transparent to-teal-500/10 animate-pulse" />
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
            <span className="relative z-10 text-sm font-bold text-teal-400 tracking-wider uppercase">AI-Powered Workflow</span>
            <Workflow className="w-4 h-4 text-teal-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>
          
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] select-none"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              <span className="block font-light text-dark-textSecondary mb-3 text-3xl md:text-5xl lg:text-6xl">
                Automate Your
              </span>
              <span className="block relative">
                <span className="bg-gradient-to-br from-teal-400 via-green-400 to-purple-500 bg-clip-text text-transparent font-black relative z-10">
                  Entire Workflow
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-green-400 to-purple-500 bg-clip-text text-transparent font-black blur-2xl opacity-50 scale-105" 
                     style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Entire Workflow
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="absolute -bottom-6 left-0 h-3 bg-gradient-to-r from-teal-400 via-green-400/80 to-transparent rounded-full shadow-lg shadow-teal-500/50"
                />
              </span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-xl md:text-2xl text-dark-textSecondary leading-relaxed font-medium" 
               style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Let AI handle your{" "}
              <span className="text-dark-text font-semibold bg-gradient-to-r from-teal-500/20 to-green-500/10 px-2 py-1 rounded-md">
                emails, meetings, and tasks
              </span>
              {" "}automatically
            </p>
            <p className="text-lg text-dark-textSecondary/80 leading-relaxed">
              Kairo extracts action items from conversations, schedules follow-ups, and keeps your team organized—all without manual effort.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
        >
          <Link to="/login">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ShinyButton className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border border-teal-500/20 text-lg">
                <span className="relative z-10 tracking-wide">Start Automating</span>
                
              </ShinyButton>
            </motion.div>
          </Link>
          
        </motion.div>
      </div>

      {/* Add keyframes for grid animation */}
      <style>{`
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }
      `}</style>
    </section>
  );
}
