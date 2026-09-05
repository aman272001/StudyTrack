import { Navigate } from "react-router-dom";
import Layout from "./Layout";

export default function ProtectedRoute({ children }) { return localStorage.getItem("student_token") ? <Layout>{children}</Layout> : <Navigate to="/login" replace />; }