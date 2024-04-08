import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { LockKeyhole } from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  return (
    <main className="flex h-full flex-col justify-center items-center bg-sky-500">
      <div className="space-y-6 text-center">
        <div className="flex space-x-4 items-center ">
          <LockKeyhole className="h-20 w-20 text-white" />
          <h1 className={cn("text-6xl font-bold text-white", font.className,)}>
            Auth
          </h1>
        </div>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant='secondary' size='lg'>Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default page;
