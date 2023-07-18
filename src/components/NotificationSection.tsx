import React from "react";
import { NotificationCard } from "./NotificationCard";
import {type NotificationTypePayload } from "@prisma/client";

function NotificationSection({
  notifications,
}: {
  notifications: NotificationTypePayload[] | void;
}) {

  if(!notifications){
    return null;
  }

  return (
    <div className="scrollbar absolute right-4 top-2 max-h-[50rem] overflow-y-scroll rounded-xl border-2 border-solid border-gray-200 px-4 py-2">
      {notifications.map((notification: NotificationTypePayload, index: number) => {
        return <NotificationCard key={index} Notification={notification} />;
      })}
      <button className="w-full rounded-lg border-2 border-solid bg-emerald-500 p-2 text-white transition ease-in hover:border-emerald-400 hover:bg-white hover:text-emerald-500">
        Mark as Approved
      </button>
    </div>
  );
}

export default NotificationSection;
