"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface TrackingData {
  page: string;
  timeSpent: number;
  scrollDepth: number;
  clicks: string[];
  timestamp: number;
}

const STORAGE_KEY = "userTrackingData";
const MAX_BUFFER_SIZE = 50;

export function useTracker() {
  const { setUserLoggedIn, setUserName, setIsAdmin } = useAuth();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackingData = useRef({
    startTime: Date.now(),
    maxScroll: 0,
    clickEvents: [] as string[],
    currentPage: `${pathname || ""}${searchParams ? `?${searchParams.toString()}` : ""}`,
  });

  const previousPathRef = useRef(trackingData.current.currentPage);
  async function getSessionId() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/session`, {
      credentials: "include",
    });
    if (data.ok) {
      const sessionData = await data.json();

      setUserLoggedIn(sessionData.isLoggedIn);
      setIsAdmin(sessionData.isAdmin);
      setUserName(sessionData.userName);
    }
  }

  // Initialize tracking and event listeners
  useEffect(() => {
    getSessionId();
    const unsentData = getUnsentData();
    if (unsentData.length > 0) {
      sendBatchData(unsentData).catch(console.error);
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const tag = target.tagName;
      const text = target.textContent?.slice(0, 50) || "";
      trackingData.current.clickEvents.push(`Click: <${tag}> ${text}`);
    };

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      trackingData.current.maxScroll = Math.max(
        trackingData.current.maxScroll,
        Math.floor((scrolled / total) * 100)
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendTrackingData(previousPathRef.current).catch(console.error);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sendTrackingData(previousPathRef.current).catch(console.error);
    };
  }, []);

  // Handle page navigation
  useEffect(() => {
    const newPage = `${pathname || ""}${searchParams ? `?${searchParams.toString()}` : ""}`;

    if (previousPathRef.current !== newPage) {
      sendTrackingData(previousPathRef.current).finally(() => {
        trackingData.current = {
          startTime: Date.now(),
          maxScroll: 0,
          clickEvents: [],
          currentPage: newPage,
        };
        previousPathRef.current = newPage;
      });
    }
  }, [pathname, searchParams]);

  // Data storage functions
  const getUnsentData = (): TrackingData[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading tracking data:", error);
      return [];
    }
  };

  const saveDataToBuffer = (data: TrackingData): boolean => {
    if (typeof window === "undefined") return false;
    try {
      const unsentData = getUnsentData();
      if (unsentData.length >= MAX_BUFFER_SIZE) {
        sendBatchData(unsentData).catch(console.error);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return true;
      }
      unsentData.push(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unsentData));
      return true;
    } catch (error) {
      console.error("Error saving tracking data:", error);
      return false;
    }
  };

  // Data sending functions
  const sendBatchData = async (data: TrackingData[]): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/usertrack`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        localStorage.removeItem(STORAGE_KEY);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error sending batch data:", error);
      return false;
    }
  };

  const sendTrackingData = async (pageUrl: string): Promise<void> => {
    const now = Date.now();
    const timeSpent = Math.floor((now - trackingData.current.startTime) / 1000);

    if (
      timeSpent < 1 &&
      trackingData.current.maxScroll === 0 &&
      trackingData.current.clickEvents.length === 0
    ) {
      return;
    }

    const payload: TrackingData = {
      page: pageUrl,
      timeSpent,
      scrollDepth: trackingData.current.maxScroll,
      clicks: [...trackingData.current.clickEvents],
      timestamp: now,
    };

    if (!saveDataToBuffer(payload)) {
      console.error("Failed to save tracking data");
      return;
    }

    const unsentData = getUnsentData();
    if (unsentData.length > 0) {
      await sendBatchData(unsentData);
    }
  };

  return null;
}
