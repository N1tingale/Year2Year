export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    let day;
    if (date.toDateString() === today.toDateString()) {
      day = "";
    } else if (date.toDateString() === yesterday.toDateString()) {
      day = "Yesterday, ";
    } else if (date.getTime() >= oneWeekAgo.getTime()) {
      day = date.toLocaleDateString("en-US", { weekday: "long" }) + ", ";
    } else {
      day = date.toLocaleDateString() + ", ";
    }

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}${time}`;
  }