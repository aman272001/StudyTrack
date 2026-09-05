import CrudPage from "../components/CrudPage";

export default function Subjects() { return <CrudPage type="subjects" title="Subjects" fields={[{ name: "name", label: "Subject name", required: true }, { name: "code", label: "Subject code" }, { name: "teacher", label: "Teacher" }]} columns={[{ key: "name", label: "Name" }, { key: "code", label: "Code" }, { key: "teacher", label: "Teacher" }]} />; }