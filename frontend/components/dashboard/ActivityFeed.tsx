"use client";

import ActivityItem from "./ActivityItem";
import type { RecentActivity } from "@/app/dashboard/types";

interface ActivityFeedProps {
  activities: RecentActivity[];
}

const groupActivitiesByDate = (activities: RecentActivity[]) => {
  const groups: { [key: string]: RecentActivity[] } = {};
  
  activities.forEach(activity => {
    const date = activity.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
  });
  
  return groups;
};

const getRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const groupedActivities = groupActivitiesByDate(activities);
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedDates.map(dateString => (
        <div key={dateString}>
          {/* Date Header */}
          <div className="sticky top-0 z-10 bg-cosmic-dark/80 backdrop-blur-sm py-2 mb-3">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
              {getRelativeDate(dateString)}
            </h3>
          </div>
          
          {/* Activities for this date */}
          <div className="space-y-3">
            {groupedActivities[dateString].map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}