import { PostInput } from "@/components/input";

export default function Home() {
    return (
        <div className="flex justify-center w-screen h-screen bg-neutral-background">
            <div className="w-[90%] h-full dev" >
                <header className=" grid grid-cols-[30%,40%,30%] h-[80px] dev">
                    <div className="dev">30%</div>
                    <div className="dev">40%</div>
                    <div className="dev">30%</div>
                </header>

                <div class="grid grid-cols-[30%,40%,30%] ">
                    <div className="dev">30%</div>
                    <div className="dev">40%</div>
                    <div className="dev">30%</div>
                </div>

            </div>

        </div>

    );
}
