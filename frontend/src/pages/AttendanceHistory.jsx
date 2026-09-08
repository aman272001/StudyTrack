import { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function AttendanceHistory() {
  const { data, loading, error } = useFetch("/attendance");
  const [search, setSearch] = useState("");
  const filteredAttendance = data.filter((attendance) => (attendance.subjectId?.name || attendance.subjectName || "Subject").toLowerCase().includes(search.trim().toLowerCase()));

  return <section className="card">
    <div className="section-title history-header">
      <h2>Attendance history</h2>
      <input className="search" placeholder="Search by subject name..." value={search} onChange={(event) => setSearch(event.target.value)} />
    </div>
    {loading ? <div className="empty">Loading...</div> : error ? <div className="error">{error}</div> : filteredAttendance.length ? <div className="table-wrap"><table className="table"><thead><tr><th>Date</th><th>Subject</th><th>Status</th></tr></thead><tbody>{filteredAttendance.map((attendance) => <tr key={attendance._id}><td>{new Date(attendance.date).toLocaleDateString()}</td><td>{attendance.subjectId?.name || attendance.subjectName || "Subject"}</td><td><span className={`badge ${attendance.status === "Present" ? "done" : "high"}`}>{attendance.status}</span></td></tr>)}</tbody></table></div> : <div className="empty">No attendance records found.</div>}
  </section>;
}
