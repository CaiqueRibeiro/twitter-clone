import Feed from "@/components/Feed";
import Trendsbar from "@/components/Trendsbar";

export default function Home() {
  return (
    <div className="flex-1 flex gap-7">
      <Feed />
      <Trendsbar />
    </div>
  )
}
