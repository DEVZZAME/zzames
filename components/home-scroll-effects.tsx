"use client";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HomeScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to("[data-hero-copy]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-section]",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to("[data-hero-media]", {
        yPercent: -16,
        scale: 1.035,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-section]",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-section]").forEach((section) => {
        const cards = section.querySelectorAll<HTMLElement>("[data-scroll-card]");
        const title = section.querySelector<HTMLElement>("[data-scroll-title]");

        if (title) {
          gsap.fromTo(
            title,
            { y: 28, opacity: 0.45, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "top 35%",
                scrub: 0.6,
              },
            },
          );
        }

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 52, opacity: 0.2, scale: 0.965 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 55%",
                scrub: 0.7,
              },
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
