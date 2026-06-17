import type { ComponentType } from "react";

// Chapters are registered here as they are authored. Missing slugs render a
// friendly placeholder (see ChapterRoute), so the build is always green.
import SpaceWeather from "./chapters/SpaceWeather";
import MagneticSun from "./chapters/MagneticSun";
import FlareAnatomy from "./chapters/FlareAnatomy";
import XrayPhysics from "./chapters/XrayPhysics";
import Neupert from "./chapters/Neupert";
import Classification from "./chapters/Classification";
import AdityaL1 from "./chapters/AdityaL1";
import Payloads from "./chapters/Payloads";
import TheData from "./chapters/TheData";
import Labels from "./chapters/Labels";
import Architecture from "./chapters/Architecture";
import Pipeline from "./chapters/Pipeline";
import Nowcasting from "./chapters/Nowcasting";
import Forecasting from "./chapters/Forecasting";
import Evaluation from "./chapters/Evaluation";
import Dashboard from "./chapters/Dashboard";
import Roadmap from "./chapters/Roadmap";
import Opportunity from "./chapters/Opportunity";
import Features from "./chapters/Features";
import Diagrams from "./chapters/Diagrams";
import CostTeam from "./chapters/CostTeam";

export const REGISTRY: Record<string, ComponentType> = {
  "space-weather": SpaceWeather,
  "magnetic-sun": MagneticSun,
  "flare-anatomy": FlareAnatomy,
  "xray-physics": XrayPhysics,
  neupert: Neupert,
  classification: Classification,
  "aditya-l1": AdityaL1,
  payloads: Payloads,
  "the-data": TheData,
  labels: Labels,
  architecture: Architecture,
  pipeline: Pipeline,
  nowcasting: Nowcasting,
  forecasting: Forecasting,
  evaluation: Evaluation,
  dashboard: Dashboard,
  roadmap: Roadmap,
  opportunity: Opportunity,
  features: Features,
  diagrams: Diagrams,
  "cost-team": CostTeam,
};
