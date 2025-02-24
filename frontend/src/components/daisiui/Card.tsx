import { useAppSelector } from "../../hook";

const Card = () => {
  const user = useAppSelector((store) =>store.user.data?.userData)
  return (
    <div className="card shadow-sm">
      <figure>
        <img
          className="w-[15rem] h-[19rem] rounded-b-2xl"
          src={user?.imgUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body absolute pt-60 ">
        <h2 className="card-title font-bold text-white text-xl">{user?.firstName}</h2>
      </div>
    </div>
  );
};

export default Card;
