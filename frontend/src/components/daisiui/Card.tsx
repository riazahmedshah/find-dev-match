/* eslint-disable @typescript-eslint/no-explicit-any */


const Card = ({data}:any) => {
  //console.log("Card", data);
  return (
    <div className="card shadow-sm">
      <figure>
        <img
          className="w-[15rem] h-[19rem] rounded-b-2xl"
          src={data.imgUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body absolute pt-60 ">
        <h2 className="card-title font-bold text-white text-xl">{data.firstName}</h2>
      </div>
    </div>
  );
};

export default Card;
