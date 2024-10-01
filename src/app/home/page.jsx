import { PostInput } from "@/components/input";

export default function Home() {
    return (
        <div className="flex justify-center w-screen bg-neutral-background">
            <div className="w-[90%] h-screen dev" >
                <header className=" grid grid-cols-[28%,44%,28%] h-[10%] dev">
                    <div className="dev">27,5%</div>
                    <div className="dev">45%</div>
                    <div className="dev">30%</div>
                </header>

                <div class="grid grid-cols-[28%,44%,28%] h-[90%] ">
                    <div className="h-full dev" >30%</div>
                    <div className="overflow-y-scroll dev">40%</div>
                    <div className="h-full dev">30%</div>
                </div>

            </div>

        </div>

    );
}
