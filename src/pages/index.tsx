import Head from "next/head";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useEffect, createContext } from "react";
import NotificationSection from "~/components/NotificationSection";
import { type InferGetServerSidePropsType } from "next";
import { prisma } from "~/server/db";
import {
  type NotificationType,
  type NotificationTypePayload,
} from "@prisma/client";

export interface NotificationContextType {
  Notifications: NotificationTypePayload[];
  setNotifications: (e: NotificationTypePayload[]) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  Notifications: [],
  setNotifications: function (e: NotificationTypePayload[]): void {
    throw new Error("Function not implemented.");
  },
});

export default function Home({
                                          notifications,
                                        }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [IsNotificationOn, setIsNotificationOn] = useState<boolean>(false);
  const [Notifications, setNotifications] =
    useState<NotificationTypePayload[]>(notifications);
  const [CountOfActiveNotifications, setCountOfActiveNotifications] =
    useState(0);

  useEffect(() => {
    setCountOfActiveNotifications(0);

    Notifications.forEach((elem) =>
      (elem.scalars.acknowledged)
        ? setCountOfActiveNotifications(CountOfActiveNotifications + 1)
        : null
    );

  }, [Notifications]);

  return (
    <>
      <Head>
        <title>Realbase Assignment</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favic`on.ico" />
      </Head>
      <NotificationContext.Provider value={{ Notifications, setNotifications }}>
        <main className="relative  min-h-screen">
          <nav className=" flex w-full items-center justify-end border-b-2 px-4 py-2">
            <button
              onClick={() => setIsNotificationOn(!IsNotificationOn)}
              className={
                IsNotificationOn
                  ? "group relative rounded-xl border-[2px] border-solid border-[#02b7e2]  bg-[#02b7e2] px-3 py-2 transition ease-in"
                  : "group relative rounded-xl border-[2px] border-solid px-3  py-2 transition ease-in hover:border-[#02b7e2] hover:bg-[#02b7e2]"
              }
            >
              <div className="absolute right-0 top-0 z-10 flex max-h-4 w-4 items-center justify-center rounded-full bg-blue-300 p-2   text-sm">
                {CountOfActiveNotifications}
              </div>
              <NotificationsIcon
                fontSize="medium"
                className={
                  !IsNotificationOn
                    ? "z-10 text-[black] transition ease-in group-hover:text-white"
                    : "z-10 text-white transition ease-in"
                }
              />
            </button>
          </nav>
          <div className="relative w-full">
            {IsNotificationOn ? <NotificationSection /> : <></>}
          </div>
        </main>
      </NotificationContext.Provider>
    </>
  );
}

export async function getServerSideProps() {
  const data: NotificationType[] = await prisma.notificationType.findMany();

  const returnItem = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < data.length; i++) {
    const temp = await prisma.user.findFirst({
      where: {
        id: {
          equals: data[i]?.userId,
        },
      },
    });

    let userInfoWithImage;
    if (temp == null) {
      continue;
    } else {
      userInfoWithImage = await prisma.image.findFirst({
        where: {
          user_id: {
            equals: temp.id,
          },
        },
      });
    }

    returnItem.push({
      scalars: {
        ...data[i],
      },
      objects: {
        user: {
          scalars: {
            ...temp,
          },
          objects: {
            image: {
              scalars: {
                ...userInfoWithImage,
              },
            },
          },
        },
      },
    });
  }

  return {
    props: {
      notifications: JSON.parse(
        JSON.stringify(returnItem)
      ) as NotificationTypePayload[],
    },
  };
}
