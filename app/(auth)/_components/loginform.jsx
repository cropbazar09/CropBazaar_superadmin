// "use client";
// import { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Image from 'next/image'
// import Link from 'next/link'
// import { supabase } from '@/utils/supabase/client';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { Eye, EyeClosed } from 'lucide-react';
// import useUserSession from '@/hooks/useUser';

// export default function LoginFrom() {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [showOTP, setShowOTP] = useState(false);
//     const [email, setEmail] = useState("");
//     const [otp, setOTP] = useState("");
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()
//     const [showPassword, setShowPassword] = useState(false)
//     const images = [
//         {
//             src: "/farmer.webp",
//             heading: "Connect with top talent, build your dream team.",
//         },
//         {
//             src: "/farmer.webp",
//             heading: "Collaborate seamlessly with your team.",
//         },
//         {
//             src: "/farmer.webp",
//             heading: "Scale your business with the right people.",
//         },
//     ]
//     const { session } = useUserSession();

    

//     useEffect(() => {
//         if (session) {
//             router.push('/dashboard')
//             toast.success('You are already logged in');
//         }
//     }, [session])

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActiveIndex((prevIndex) =>
//                 prevIndex === images.length - 1 ? 0 : prevIndex + 1
//             );
//         }, 5000); // Change image every 5 seconds

//         return () => clearInterval(interval);
//     }, [images.length]);

//     const handleGoogleLogin = async () => {
//         const { error } = await supabase.auth.signInWithOAuth({
//             provider: "google",
//             options: {
//                 scopes: "email",
//                 redirectTo: `${window.location.origin}/dashboard`, // Ensure absolute URL
//             },
//         });
//         if (error) {
//             console.error("Google login error:", error.message);
//         }
//     };


//     const handleContinue = async (
//         e
//     ) => {
//         e.preventDefault();
//         const { data, error } = await supabase.auth.signInWithOtp({
//             email,
//         });

//         if (error) {
//             alert(`Error: ${error.message}`);
//             console.error("Continue error:", error.message);
//         } else {
//             console.log(data);
//             setShowOTP(true);
//         }
//     };

//     const handleVerifyOTP = async (
//         e
//     ) => {
//         e.preventDefault();
//         const { data, error } = await supabase.auth.verifyOtp({
//             email,
//             token: otp,
//             type: "email",
//         });

//         if (error) {
//             alert(`Error: ${error.message}`);
//             console.error("Verify OTP error:", error.message);
//         } else {
//             console.log(data);
//             toast.success('OTP verified successfully')
//             router.push('/dashboard')
//         }
//     };

//     return (
//         <div className="!flex lg:min-h-screen">
//             {/* Left side */}
//             <div
//                 className="hidden lg:flex lg:w-[45%] bg-[#B2EBF2] flex-col items-center justify-center p-12 relative"
//                 style={{
//                     backgroundImage: "url('/loginbg.png')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                 }}
//             >
//                 {/* Heading and Image Container */}
//                 <div className="flex flex-col items-center w-full justify-center mb-8">
//                     {/* Heading */}
//                     <div className="relative h-20 w-full mb-6 flex justify-center items-center">
//                         {images.map((image, index) => (
//                             <h2
//                                 key={index}
//                                 className={`absolute transition-opacity w-2/3 duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"
//                                     } text-3xl font-bold text-center`}
//                             >
//                                 {image.heading}
//                             </h2>
//                         ))}
//                     </div>

//                     {/* Image */}
//                     <div className="relative w-64 h-[400px]">
//                         <Image
//                             src={images[activeIndex].src}
//                             alt="App preview"
//                             layout="fill"
//                             objectFit="contain"
//                             className="transition-opacity duration-1000"
//                         />
//                     </div>
//                 </div>

//                 {/* Dots */}
//                 <div className="absolute bottom-10 flex space-x-4">
//                     {images.map((_, index) => (
//                         <div
//                             key={index}
//                             className={`relative w-4 h-4 rounded-full transition-all flex items-center justify-center ${index === activeIndex ? "border-black" : "border-gray-400"
//                                 }`}
//                         >
//                             <div
//                                 className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-black" : "border-2 border-black"
//                                     }`}
//                             ></div>
//                             {index === activeIndex && (
//                                 <div className="absolute top-0 left-0 w-full h-full rounded-full border-[2px] border-black border-t-transparent animate-progress"></div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Right side */}
//             <div className="w-full lg:w-[55%] p-4 lg:p-12 flex flex-col justify-center">
//                 <div className="max-w-xl w-full mx-auto">
//                     <h1 className="text-3xl font-bold mb-2">Welcome again</h1>
//                     <p className="text-gray-600 mb-8">For Admin</p>
//                     <div className="space-y-4">
//                         <Button
//                             variant="outline"
//                             className="w-full h-12 rounded-xl"
//                             onClick={handleGoogleLogin}
//                         >
//                             <svg className="mr-2 !h-4 !w-4" viewBox="0 0 24 24">
//                                 <path
//                                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                                     fill="#4285F4"
//                                 />
//                                 <path
//                                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                                     fill="#34A853"
//                                 />
//                                 <path
//                                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                                     fill="#FBBC05"
//                                 />
//                                 <path
//                                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                                     fill="#EA4335"
//                                 />
//                             </svg>
//                             Continue with Google
//                         </Button>
//                         <div className="relative">
//                             <div className="absolute inset-0 flex items-center">
//                                 <span className="w-full border-t" />
//                             </div>
//                             <div className="relative flex justify-center text-xs uppercase">
//                                 <span className="px-2 text-muted-foreground">or</span>
//                             </div>
//                         </div>
//                         {!showOTP ? (
//                             <>
//                                 {/* label */}
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     placeholder="Enter email address"
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 <Button
//                                     className="w-full h-12 rounded-xl bg-black hover:bg-black"
//                                     onClick={handleContinue}
//                                 >
//                                     Continue
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 {/* label */}
//                                 <Label htmlFor="otp">OTP</Label>
//                                 <Input
//                                     placeholder="Enter OTP"
//                                     type="text"
//                                     value={otp}
//                                     onChange={(e) => setOTP(e.target.value)}
//                                 />
//                                 <Button
//                                     className="w-full h-12 rounded-xl bg-black hover:bg-black"
//                                     onClick={handleVerifyOTP}
//                                 >
//                                     Verify OTP
//                                 </Button>
//                             </>
//                         )}
//                         <p className="text-center text-sm text-muted-foreground">
//                             By continuing, you agree to Hyreso's{" "}
//                             <Link
//                                 className="underline underline-offset-4 hover:text-primary"
//                                 href="https://hyreso.com/terms-and-conditions"
//                                 target="_blank"
//                             >
//                                 Terms of Service
//                             </Link>{" "}
//                             and{" "}
//                             <Link
//                                 className="underline underline-offset-4 hover:text-primary"
//                                 href="https://hyreso.com/privacy-policy"
//                                 target="_blank"
//                             >
//                                 Privacy Policy
//                             </Link>
//                         </p>
//                     </div>
//                     <p className="text-center mt-8">
//                         Already have an account?{' '}
//                         <Link href="/signup" className="text-blue-600 hover:underline">
//                             Sign up
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }



"use client";
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Eye, EyeClosed } from 'lucide-react';
import useUserSession from '@/hooks/useUser';

export default function LoginFrom() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const router = useRouter();
    const images = [
        {
            src: "/farmer.webp",
            heading: "Connect with top talent, build your dream team.",
        },
        {
            src: "/farmer.webp",
            heading: "Collaborate seamlessly with your team.",
        },
        {
            src: "/farmer.webp",
            heading: "Scale your business with the right people.",
        },
    ]
    const { session } = useUserSession();
useEffect(() => {
    const checkTeam = async () => {
        if (!session?.user) return;

        const user = session.user;

        // 1️⃣ Check if user already exists in teams
        const { data: existing } = await supabase
            .from("teams")
            .select("*")
            .eq("email", user.email)
            .single();

        // 2️⃣ If not exist → CREATE AUTOMATIC UUID USER
        if (!existing) {
            const { error: insertError } = await supabase
                .from("teams")
                .insert([{ email: user.email }]);  // uuid auto generated

            if (insertError) {
                toast.error("Something went wrong");
                console.log(insertError);
                return;
            }

            toast.success("New admin added automatically");
            router.push("/dashboard");
            return;
        }

        // 3️⃣ if exists → login normally
        toast.success("Login successful");
        router.push("/dashboard");
    };

    checkTeam();
}, [session]);


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/`,  // 👈 redirect to home
        },
    });

    if (error) console.error(error.message);
};


    // OTP SEND
    const handleContinue = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
        });

        if (error) {
            alert(`Error: ${error.message}`);
            console.error("Continue error:", error.message);
        } else {
            setShowOTP(true);
        }
    };
const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
    });

    if (error) {
        alert(`Error: ${error.message}`);
        return;
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // CHECK BY EMAIL (not team_id)
    const { data: existing } = await supabase
        .from("teams")
        .select("*")
        .eq("email", user.email)
        .single();

    if (!existing) {
        await supabase.auth.signOut();
        toast.error("You are not admin");
        router.push("/");   // <-- stay homepage
        return;
    }

    toast.success("OTP verified successfully");
    router.push("/dashboard");
};


    return (
        <div className="!flex lg:min-h-screen">
            {/* Left side */}
            <div
                className="hidden lg:flex lg:w-[45%] bg-[#B2EBF2] flex-col items-center justify-center p-12 relative"
                style={{
                    backgroundImage: "url('/loginbg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex flex-col items-center w-full justify-center mb-8">
                    <div className="relative h-20 w-full mb-6 flex justify-center items-center">
                        {images.map((image, index) => (
                            <h2
                                key={index}
                                className={`absolute transition-opacity w-2/3 duration-1000 ${
                                    index === activeIndex ? "opacity-100" : "opacity-0"
                                } text-3xl font-bold text-center`}
                            >
                                {image.heading}
                            </h2>
                        ))}
                    </div>

                    <div className="relative w-64 h-[400px]">
                        <Image
                            src={images[activeIndex].src}
                            alt="App preview"
                            layout="fill"
                            objectFit="contain"
                            className="transition-opacity duration-1000"
                        />
                    </div>
                </div>

                <div className="absolute bottom-10 flex space-x-4">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`relative w-4 h-4 rounded-full transition-all flex items-center justify-center ${
                                index === activeIndex ? "border-black" : "border-gray-400"
                            }`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    index === activeIndex ? "bg-black" : "border-2 border-black"
                                }`}
                            ></div>
                            {index === activeIndex && (
                                <div className="absolute top-0 left-0 w-full h-full rounded-full border-[2px] border-black border-t-transparent animate-progress"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side */}
            <div className="w-full lg:w-[55%] p-4 lg:p-12 flex flex-col justify-center">
                <div className="max-w-xl w-full mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Welcome again</h1>
                    <p className="text-gray-600 mb-8">For Admin</p>
                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-xl"
                            onClick={handleGoogleLogin}
                        >
                            <svg className="mr-2 !h-4 !w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 text-muted-foreground">or</span>
                            </div>
                        </div>
                        {!showOTP ? (
                            <>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    placeholder="Enter email address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    className="w-full h-12 rounded-xl bg-black hover:bg-black"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </Button>
                            </>
                        ) : (
                            <>
                                <Label htmlFor="otp">OTP</Label>
                                <Input
                                    placeholder="Enter OTP"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                                <Button
                                    className="w-full h-12 rounded-xl bg-black hover:bg-black"
                                    onClick={handleVerifyOTP}
                                >
                                    Verify OTP
                                </Button>
                            </>
                        )}
                        <p className="text-center text-sm text-muted-foreground">
                            By continuing, you agree to Hyreso's{" "}
                            <Link
                                className="underline underline-offset-4 hover:text-primary"
                                href="https://hyreso.com/terms-and-conditions"
                                target="_blank"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                className="underline underline-offset-4 hover:text-primary"
                                href="https://hyreso.com/privacy-policy"
                                target="_blank"
                            >
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
