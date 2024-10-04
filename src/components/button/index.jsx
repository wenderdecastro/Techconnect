import { ButtonText } from "../texts";

export function LargeButton({ onClick, Text, Inverse = false, Style }) {
    return (
        <button onClick={onClick} className={`flex items-center justify-center px-8 py-4 rounded-full ${Inverse ? "border border-primary-blue bg-neutral-background" : "bg-primary-blue"} ${Style} `}>
            <ButtonText style={Inverse ? "text-primary-blue" : "text-neutral-background"}>
                {Text}
            </ButtonText>
        </button>
    )
}

export function SmallButton({ onClick, Text, Inverse = false, Style }) {
    return (
        <button onClick={onClick} className={`flex items-center justify-center px-6 py-[0.36rem] rounded-full ${Inverse ? "border border-primary-blue bg-neutral-background" : "bg-primary-blue hover:bg-[#2b95d2]"} ${Style} `}>
            <ButtonText style={Inverse ? "text-primary-blue hover:border-[#2b95d2]" : "text-neutral-background"}>
                {Text}
            </ButtonText>
        </button>
    )
} 

export function Link({onClick, Text, style}){
    return(
        <p onClick={onClick} className={`cursor-pointer text-primary-red`}>
            {Text}
        </p>
    )
}