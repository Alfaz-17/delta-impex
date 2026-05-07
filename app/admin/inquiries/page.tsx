import { Metadata } from "next";
import { InquiriesClient } from "./inquiries-client";

export const metadata: Metadata = {
  title: "Inquiries Management | Admin",
};

export default function AdminInquiriesPage() {
  return <InquiriesClient />;
}
