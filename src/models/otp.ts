import mongoose from "mongoose";

function formatTimestamp(date: Date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  return `${dayOfWeek} ${month} ${day} ${hours}:${minutes}${period}`;
}

const otpSchema = new mongoose.Schema({
  email: { type: String },
  otp: { type: String, required: true },
  phone: { type: String },
  formatted_timestamp: {
    type: String,
    required: false,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, expires: "20m", default: Date.now },
});

otpSchema.pre("save", function (next) {
  if (!this.formatted_timestamp) {
    this.formatted_timestamp = formatTimestamp(this.createdAt || new Date());
  }
  next();
});

const Otp = mongoose.model("OTP", otpSchema);
export { Otp };
