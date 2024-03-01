import { ICardTypes } from "@/utils/constants";
import classNames from "classnames";
import Image from "next/image";

type ICards = {
  cardArray: ICardTypes[];
};
const Cards = ({ cardArray }: ICards) => {
  const colors = ["#069855", "#069855", "#D62525", "#069855", "#069855"];

  const updatedCards = cardArray?.map((card) => {
    switch (card.id) {
      case 1:
        return { ...card };

      default:
        return card;
    }
  });

  return (
    <div className="py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {updatedCards.map((el, i) => (
        <div
          className={classNames(
            `flex flex-col px-4 py-4 bg-white w-full cursor-pointer shadow-sm hover:scale-105 transition-all ease-in-out duration-500`,
            `rounded-xl border border-gray-200 space-y-3  ease-in-out shadow-sm`
          )}
          key={`dashboardCard${i}`}
        >
          <div className="md:flex justify-between items-center">
            <div className="border-[1px] border-gray-300 p-3 rounded-lg w-[50px] md:w-auto">
              <Image src={el.image} alt={el.title} />
            </div>

            <div className="pt-2 md:pt-0 flex gap-1 items-center text-xs">
              <p
                style={{
                  color: colors[i],
                }}
              >
                {el.percentage}
              </p>
              <p>vs</p>
              <p className={`${"text-[#606060]"}`}>{el.date}</p>
            </div>
          </div>
          <p className="text-sm font-[300]">{el.title}</p>
          <p className="md:pb-2 text-xl font-medium">{el.total}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
