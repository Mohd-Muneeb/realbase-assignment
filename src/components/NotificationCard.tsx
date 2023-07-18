import { type NotificationTypePayload } from "@prisma/client";
import React, { useRef, useContext } from "react";
import { NotificationContext } from "~/pages";

export const NotificationCard = () => {
  const MarkedAsReadRef = useRef<HTMLButtonElement>(null);

  const { Notifications, setNotifications } = useContext(NotificationContext);

  // const handleRead = async () => {
  //   const updateUser = await prisma.notificationType.update({
  //     where: {
  //       id: Notification.scalars.id,
  //     },
  //     data: {
  //       acknowledged: true,
  //     },
  //   });
  //   return null;
  // };

  // console.log(Notification.scalars.acknowledged);

  return (
    <div className="">
      {Notifications.map((Notification: NotificationTypePayload) => {
        return (
          <>
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
                    {/* {convertTime(Notification.dates.created.date_time)} */}9
                    minutes ago
                  </p>
                  {!Notification.scalars.acknowledged ? (
                    <>
                      <span className="text-gray-400">&nbsp;| &nbsp;</span>
                      <button
                        ref={MarkedAsReadRef}
                        // onClick={() => handleRead()}
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
          </>
        )
      })}
    </div>
  );
};
