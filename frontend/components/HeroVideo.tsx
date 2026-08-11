"use client";
import React, { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = "/videos/induction-iitkgp-herosection.mp4";

    const timeoutId = setTimeout(function () {
      fetch(src)
        .then((response) => response.blob())
        .then((response) => {
          if (!videoRef.current) return;
          const blobURL = URL.createObjectURL(response);

          const t = video.currentTime;
          
          const handleTouchStart = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                video.pause();
              }).catch(() => {});
            }
          };
          
          document.documentElement.addEventListener("touchstart", handleTouchStart, { once: true });

          video.setAttribute("src", blobURL);
          video.currentTime = t + 0.01;
          
          // Also try to play immediately just in case
          video.play().catch(() => {});
        })
        .catch(err => console.error("Error fetching video for safari autoplay:", err));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <video 
      ref={videoRef}
      autoPlay 
      loop 
      muted 
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/induction-iitkgp-herosection.mp4" type="video/mp4" />
    </video>
  );
}
