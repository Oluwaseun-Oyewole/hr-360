"use client";
import Button from "@/components/button";
import { IPayrollCardTypes } from "@/utils/constants";
import { formatCurrency } from "@/utils/helper";
import classNames from "classnames";
import Image from "next/image";
import { ReactNode } from "react";

type ICardType = {
  cardArray: IPayrollCardTypes[];
  title?: string;
  content?: ReactNode;
  handleScheduleModal?: () => void;
  handlePayoutModal?: () => void;
  handleViewModal?: () => void;
};
const colors = ["#069855", "#069855", "#D62525", "#069855", "#069855"];
const PayrollCard = ({
  cardArray,
  handleScheduleModal,
  handlePayoutModal,
  handleViewModal,
}: ICardType) => {
  const updatedCards = cardArray?.map((card) => {
    switch (card.id) {
      case 1:
        return { ...card };

      default:
        return card;
    }
  });

  return (
    <>
      <div
        className={`py-6 grid grid-flow-col overflow-scroll ${
          cardArray?.length > 2
            ? "grid-cols-[100%_100%_100%]"
            : "grid-cols-[100%]"
        } ${
          cardArray?.length > 2
            ? "md:grid-cols-[70%_50%_50%]"
            : "md:grid-cols-[70%_60%]"
        } gap-3 lg:gap-0 lg:grid-cols-[47%_25%_25%] justify-between`}
      >
        {updatedCards.map((el, i) => (
          <div
            className={classNames(
              `flex flex-col px-4 py-4 bg-white w-full cursor-pointer`,
              `rounded-xl border border-gray-200 space-y-3  ease-in-out shadow-sm`
            )}
            key={`dashboardCard${i}`}
          >
            <div className="flex justify-between items-center">
              <div className="border-[1px] border-gray-300 p-3 rounded-lg w-[50px] md:w-auto">
                <Image src={el.image} alt={el.title} />
              </div>

              {el.isEmployee && (
                <div className="text-xs flex gap-1">
                  <p>No Of Employee</p>
                  <span>:</span>
                  <p
                    style={{
                      color: colors[i],
                    }}
                  >
                    {el.employee_total}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 grid grid-flow-col grid-cols-[max-content_auto] gap-8">
              <div className="self-end">
                <p className="text-sm font-[300] pb-1 text-gray-600">
                  {el.title}
                </p>
                <p className=" md:pb-2 text-xl font-medium">
                  {`${formatCurrency(el?.total, `\u20A6`)}`}
                </p>
              </div>

              {el.schedule && (
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <Button
                    className="!text-black !border-[1px] !border-gray-300 !text-sm !rounded-lg"
                    onClick={handleScheduleModal}
                  >
                    {el.schedule_text}
                  </Button>
                  <Button
                    className="!bg-primary-100 !text-sm !rounded-lg"
                    onClick={handlePayoutModal}
                  >
                    {el.payroll_text}
                  </Button>
                </div>
              )}

              {el.view && (
                <div>
                  <Button
                    className="!text-black !border-[1px] !border-gray-300 !text-sm !rounded-lg"
                    onClick={handleViewModal}
                  >
                    {el.view_text}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PayrollCard;
