import CustomInput from "@/components/input/input";
import Text from "@/components/text/text";
import Title from "@/components/title/title";
import logo from "../../public/images/AppLogo.png";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-login-background bg-cover ">
      <div className="p-6 rounded-lg space-y-4 w-full max-w-sm">
      <img src={"/images/AppLogo.png"} className="w-[80px]" alt="Logo" />
        <Title className="items-center justify-center h-screen">Login</Title>

        <div className="flex space-x-4">
          <CustomInput type="text" placeholder="Username" size="md" />
          <CustomInput type="date" placeholder="Birth date" size="md" />
        </div>

        <div className="space-y-4">
          <CustomInput type="email" placeholder="Email" size="md" />
          <CustomInput type="password" placeholder="Senha" size="md" />
        </div>

        <button className="w-full bg-[#74BDE8] text-white py-3 px-4 rounded-full hover:bg-[#5ca9d4] transition duration-300">
          Sign up
        </button>

        <div className="text-white mt-4">
          <p>
            Already a member? <a href="#" className="text-[#74BDE8] hover:underline">Sign in</a>
          </p>
        </div>

        <Text>
          Forgot Password? <a className="text-primary-blue">Click here</a>
        </Text>
        <Text>
          Don&apos;t forget to login! <a className="text-primary-blue">Sign up</a>
        </Text>
      </div>
    </div>
  );
}
