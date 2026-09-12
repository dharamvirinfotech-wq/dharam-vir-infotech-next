import React from "react";
import {
  Monitor,
  Shield,
  Cloud,
  Users,
  Settings,
  Target,
  Search,
  TrendingUp,
  Headset,
  HeartPulse,
  ShoppingBag,
  Building,
  GraduationCap,
  Truck,
  Briefcase,
  AlertTriangle,
  Server,
  Maximize,
  Code,
  Zap,
  CheckCircle,
  Database,
  Layers,
  Cpu,
  Smartphone,
  Lock,
  Boxes,
  FileCode,
  Sparkles,
  Workflow,
  Compass,
} from "lucide-react";

export const getServiceIcon = (name, className = "w-5 h-5") => {
  const map = {
    monitor: <Monitor className={className} />,
    shield: <Shield className={className} />,
    "shield-check": <Shield className={className} />,
    cloud: <Cloud className={className} />,
    users: <Users className={className} />,
    settings: <Settings className={className} />,
    target: <Target className={className} />,
    search: <Search className={className} />,
    "trending-up": <TrendingUp className={className} />,
    headset: <Headset className={className} />,
    "heart-pulse": <HeartPulse className={className} />,
    "shopping-bag": <ShoppingBag className={className} />,
    building: <Building className={className} />,
    "graduation-cap": <GraduationCap className={className} />,
    truck: <Truck className={className} />,
    briefcase: <Briefcase className={className} />,
    "alert-triangle": <AlertTriangle className={className} />,
    server: <Server className={className} />,
    maximize: <Maximize className={className} />,
    code: <Code className={className} />,
    cpu: <Cpu className={className} />,
    zap: <Zap className={className} />,
    database: <Database className={className} />,
    layers: <Layers className={className} />,
    smartphone: <Smartphone className={className} />,
    lock: <Lock className={className} />,
    boxes: <Boxes className={className} />,
    "file-code": <FileCode className={className} />,
    sparkles: <Sparkles className={className} />,
    workflow: <Workflow className={className} />,
    compass: <Compass className={className} />,
  };
  return map[name] || <CheckCircle className={className} />;
};

// Distinct icon selector for capability items based on title keywords
export const getCapabilityIcon = (title, index = 0, className = "w-5 h-5") => {
  const lower = (title || "").toLowerCase();
  if (lower.includes("cloud") || lower.includes("hybrid")) return <Cloud className={className} />;
  if (lower.includes("database") || lower.includes("sharding") || lower.includes("caching")) return <Database className={className} />;
  if (lower.includes("api") || lower.includes("graphql") || lower.includes("rest")) return <Code className={className} />;
  if (lower.includes("security") || lower.includes("cyber") || lower.includes("compliance")) return <Shield className={className} />;
  if (lower.includes("ui") || lower.includes("ux") || lower.includes("frontend") || lower.includes("cms")) return <Layers className={className} />;
  if (lower.includes("devops") || lower.includes("ci/cd") || lower.includes("pipeline") || lower.includes("deployment")) return <Settings className={className} />;
  if (lower.includes("saas") || lower.includes("microservices")) return <Boxes className={className} />;
  if (lower.includes("server") || lower.includes("infrastructure")) return <Server className={className} />;
  if (lower.includes("network") || lower.includes("router")) return <Workflow className={className} />;
  if (lower.includes("backup") || lower.includes("recovery")) return <Lock className={className} />;
  if (lower.includes("consulting") || lower.includes("team") || lower.includes("resources")) return <Users className={className} />;
  if (lower.includes("monitoring") || lower.includes("performance") || lower.includes("analytics")) return <TrendingUp className={className} />;
  if (lower.includes("mobile") || lower.includes("pwa")) return <Smartphone className={className} />;
  if (lower.includes("ai") || lower.includes("intelligence") || lower.includes("model")) return <Cpu className={className} />;

  // Cycle through rich distinct icons if no keyword matches
  const fallbackIcons = [
    <Layers className={className} key={0} />,
    <Database className={className} key={1} />,
    <Cloud className={className} key={2} />,
    <Shield className={className} key={3} />,
    <Code className={className} key={4} />,
    <Settings className={className} key={5} />,
    <Cpu className={className} key={6} />,
    <TrendingUp className={className} key={7} />,
  ];
  return fallbackIcons[index % fallbackIcons.length];
};
