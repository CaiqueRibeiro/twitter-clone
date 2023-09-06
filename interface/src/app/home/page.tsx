'use client'

import Feed from "@/components/Feed";
import Trendsbar from "@/components/Trendsbar";

function FirstPage() {
  return (
    <div className="flex-1 flex gap-7">
      <Feed />
      <Trendsbar />
    </div>
  )
}

export default FirstPage;
