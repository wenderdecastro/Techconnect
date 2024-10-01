import BlueBtn from "../button/button";

const ProfileInfo = () => {
  return (
    <div className=" bg-red-600 flex justify-center">
      
      <div className="w-3/5 h-96 rounded-2xl">

        <img
          alt=""
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className=" my-24 ml-[345px] h-12 w-12 rounded-full ring-2 ring-white"
        />

            <div className=" h-7 ml-5 ">
                <h1 className="w-auto size-14">Nome do Perfil</h1>
            </div>

            <div className="h-7 ml-5 ">
                <h1 className="w-auto size-10">@Perfil</h1>
            </div>

            <BlueBtn/> 


          


      </div>
    </div>
  );
};

export default ProfileInfo;
