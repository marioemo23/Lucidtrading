import { redirect } from "next/navigation";

import { AFFILIATE_URL } from "@/lib/affiliate";

export async function GET() {
  redirect(AFFILIATE_URL);
}
