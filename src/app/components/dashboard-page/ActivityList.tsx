interface Activity {
  name: string;
  time: string;
  doctor: string;
  status: string;
}

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-sm">Today's Activity</h2>
        <button className="text-sm text-[#2B4DCA] hover:underline">View all</button>
      </div>
      <div className="p-3 space-y-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between pb-3 border-b first:border-[#93531F] last:border-none border-[#DCDCDC] last:pb-0"
          >
            <div>
              <p className="font-medium">{activity.name}</p>
              <p className="text-sm text-gray-500">
                {activity.time} - {activity.doctor}
              </p>
            </div>
            {activity.status === "check-in" ? (
              <button className="px-3 py-1 text-sm shadow-md  bg-[#FBF7EB] text-yellow-800 rounded-md hover:bg-yellow-200">
                Check In
              </button>
            ) : (
              <button className="px-3 py-1 text-sm bg-[#1A588A] text-white border border-gray-200 rounded-md hover:bg-[#2E8BC9]">
                Details
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}