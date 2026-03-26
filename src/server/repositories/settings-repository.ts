import { hasDatabase, sql } from "@/lib/db/client";
import { DEMO_USER_ID } from "@/lib/constants/app";
import { seedSettings } from "@/lib/db/seed-data";
import type { UserSettings } from "@/types/domain";

export async function getSettings(userId = DEMO_USER_ID): Promise<UserSettings> {
  if (!hasDatabase || !sql) return seedSettings;

  const rows = await sql<UserSettings[]>`
    select daily_target as "dailyTarget", auto_play_audio as "autoPlayAudio", show_hints_first as "showHintsFirst", review_pace as "reviewPace", offline_mode as "offlineMode"
    from user_settings where user_id = ${userId} limit 1
  `;
  return rows[0] ?? seedSettings;
}

export async function updateDailyTarget(dailyTarget: number, userId = DEMO_USER_ID): Promise<UserSettings> {
  if (!hasDatabase || !sql) {
    return { ...seedSettings, dailyTarget };
  }

  await sql`
    insert into user_settings (user_id, daily_target)
    values (${userId}, ${dailyTarget})
    on conflict (user_id) do update set daily_target = excluded.daily_target, updated_at = now()
  `;

  return getSettings(userId);
}
