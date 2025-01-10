import { Loader } from "lucide-react";

export default function AdminLoading() {
  return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24">
    <Loader className="size-16 animate-spin"></Loader>
  </div>
}