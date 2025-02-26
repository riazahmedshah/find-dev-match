import { connectionData } from "../../features/types";

const ConnectionComponent = ({firstName,lastName,gender,age,imgUrl,skills} : connectionData) => {
  
  return (
    <div className="">
      <div className="user-list w-full max-w-md mx-auto bg-zinc-950 rounded-xl shadow-xl flex flex-col space-x-4 py-4">
        <div className="user-row flex flex-col items-center space-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-zinc-800">
          <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
            <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
              <img
                alt="progile-img"
                className="avatar w-20 h-20 rounded-full object-cover"
                src={imgUrl}
              />
            </div>
            <div className="user-body flex flex-col max-w-40 mb-4 sm:mb-0 sm:mr-4">
              <p className="title font-medium no-underline">
                {firstName + " " + lastName}
              </p>
              <div className="skills flex flex-col">
                <span className="subtitle text-slate-500">
                  {gender +","+ age}
                </span>
                <span className="skills text-slate-500">
                  {skills?.join(",").slice(0,20)}
                </span>
              </div>
            </div>
          </div>
          <div className="user-option mx-auto sm:ml-auto sm:mr-0">
            <button
              className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
              type="button"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionComponent;
