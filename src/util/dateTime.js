//
//

export default function ISODateTimeToLocalView(dt) {
  // Receives a Non-local date/time object (or not) and returns the date/time
  // in the users local time zone for viewing (not submitting).
  var now = null;
  if (!dt) {
    now = new Date();
  } else {
    now = dt;
  }
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  const str = dateLocal.toISOString().split("T");
  const date = str[0];
  const time = str[1].slice(0, -1);
  return { date, time };
}

export function localSplitDTStringToISO(date, time) {
  // Receives a date str as "YYYY-MM-DD" and a time str as "HH:MM:SS:SSS(Z)" and 
  // returns a string with both inputs combined and altered to UTC ISO format.
  
  if (!time.includes("Z")) {
    time = time + "Z";
  }
  const dt = date + "T" + time;
  const newDateTime = new Date(dt);
  const offsetMs = newDateTime.getTimezoneOffset() * 60 * 1000;
  const nonLocal = new Date(newDateTime.getTime() + offsetMs)
  const str = nonLocal.toISOString()
  return str
}
