import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({
  duration: 0.7,
  ease: "power3.out",
});

export { gsap, useGSAP, ScrollTrigger };
