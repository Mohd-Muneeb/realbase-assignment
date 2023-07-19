import { type NotificationTypePayload } from "@prisma/client";
import React, { useRef, useContext } from "react";
import convertTime from "~/functions";
import { NotificationContext, type NotificationContextType } from "~/pages";

export const NotificationCard = () => {
  const MarkedAsReadRef = useRef<HTMLButtonElement>(null);

  const { Notifications, setNotifications } =
    useContext<NotificationContextType>(NotificationContext);

  const handleRead = async (id: number) => {
    await fetch("/api/acknowledged", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const updateNotifications = Notifications.map(
      (elem: NotificationTypePayload) => {
        if (elem.scalars.id === id) {
          return {
            ...elem,
            scalars: {
              ...elem.scalars,
              acknowledged: true,
            },
          };
        }
        return elem;
      }
    );

    setNotifications(updateNotifications);

    return;
  };

  return (
    <div className="">
      {Notifications.map((Notification: NotificationTypePayload) => {
        const date = Notification.scalars.dates as unknown;
        const str = date as string;

        return (
          <div key={Notification.scalars.id}>
            <div className="flex w-[20rem] items-start justify-between gap-2">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Profile Image"
                  className="mt-1 h-10 w-10 rounded-full bg-green-400"
                  src={
                    Notification.objects.user.objects.image?.scalars
                      .original_url
                  }
                />
              }
              <div className="w-full">
                <h1 className="text-base text-[#02b7e2]">
                  {Notification.objects.user.scalars.full_name}
                </h1>
                <p className="max-w-full text-sm">
                  {Notification.scalars.body}
                </p>
                <div className="flex items-center">
                  <p className="flex text-sm text-gray-400">
                    {convertTime(str)}
                    {/* 9
                    minutes ago */}
                  </p>
                  {!Notification.scalars.acknowledged ? (
                    <>
                      <span className="text-gray-400">&nbsp;| &nbsp;</span>
                      <button
                        ref={MarkedAsReadRef}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={() => handleRead(Notification.scalars.id)}
                        className="text-sm text-amber-500 hover:underline"
                      >
                        Mark as Read
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <hr className="border-1 my-2 border-dashed" />
          </div>
        );
      })}
    </div>
  );
};
