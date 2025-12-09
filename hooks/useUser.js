// hooks/useUserSession.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

// Cache session data to persist across component mounts
let cachedSession = null;
let authListenerInitialized = false;

const useUserSession = () => {
  const [session, setSession] = useState(cachedSession);
  const [loading, setLoading] = useState(!cachedSession);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      if (!cachedSession) {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
        } else {
          cachedSession = data.session;
          setSession(cachedSession);
        }
        setLoading(false);
      }
    };

    getSession();

    // Initialize auth listener once to avoid multiple instances
    if (!authListenerInitialized) {
      authListenerInitialized = true;
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          cachedSession = session;
          setSession(session);
          if (event === "SIGNED_OUT") router.push("/");
        }
      );

      return () => {
        authListener?.subscription?.unsubscribe();
        authListenerInitialized = false;
      };
    }
  }, []);

  return { session, loading };
};

export default useUserSession;
