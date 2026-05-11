"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";

export function DivisionSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [divisions, setDivisions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const activeId = searchParams.get("divisionId");

  useEffect(() => {
    async function fetchDivisions() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/divisions");
        const data = await res.json();
        setDivisions(data);
        
        // Default to first division if none selected
        if (!activeId && data.length > 0) {
          updateQuery(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch divisions", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDivisions();
  }, [activeId]);

  const updateQuery = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("divisionId", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex p-1.5 bg-muted/50 rounded-xl w-fit border border-border mb-8 gap-2">
      {isLoading ? (
        <>
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </>
      ) : (
        divisions.map((div) => {
          const isActive = activeId === div._id;
          return (
            <button
              key={div._id}
              onClick={() => updateQuery(div._id)}
              className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-foreground shadow-sm rounded-lg"
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{div.name}</span>
            </button>
          );
        })
      )}
    </div>
  );
}
