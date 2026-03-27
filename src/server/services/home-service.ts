import type { HomePayload } from "@/types/domain";
import { DEMO_USER_ID } from "@/lib/constants/app";
import { hasDatabase, sql } from "@/lib/db/client";
import { seedHomePayload } from "@/lib/db/seed-data";
import { listDecks } from "../repositories/words-repository";
import { getSettings } from "../repositories/settings-repository";

type RecentSessionRow = {
  id: string;
  createdAt: string;
  completedCount: number;
  accuracy: number;
};

type UserStatsRow = {
  streakDays: number;
  strongestTag: string | null;
};

async function getUserStats() {
  if (!hasDatabase || !sql) {
    return {
      completedToday: seedHomePayload.stats.completedToday,
      streakDays: seedHomePayload.stats.streakDays,
      strongestTag: seedHomePayload.stats.strongestTag,
    };
  }

  const [completedTodayRow] = await sql<{ completedToday: number }[]>`
    select count(*)::int as "completedToday"
    from review_session
    where user_id = ${DEMO_USER_ID}
      and status = 'completed'
      and completed_at is not null
      and completed_at >= date_trunc('day', now())
  `;

  const [userRow] = await sql<UserStatsRow[]>`
    select streak_days as "streakDays", strongest_tag as "strongestTag"
    from app_user
    where id = ${DEMO_USER_ID}
    limit 1
  `;

  return {
    completedToday: completedTodayRow?.completedToday ?? 0,
    streakDays: userRow?.streakDays ?? 0,
    strongestTag: userRow?.strongestTag ?? "-",
  };
}

async function getRecentSessions() {
  if (!hasDatabase || !sql) return seedHomePayload.recentSessions;

  const rows = await sql<RecentSessionRow[]>`
    select
      rs.id,
      coalesce(rs.completed_at, rs.started_at) as "createdAt",
      count(rsi.id)::int as "completedCount",
      coalesce(
        (
          sum(
            case rsi.verdict
              when 'known' then 1
              when 'vague' then 0.5
              else 0
            end
          ) / nullif(count(rsi.id), 0)
        )::float,
        0
      ) as "accuracy"
    from review_session rs
    left join review_session_item rsi on rsi.session_id = rs.id and rsi.verdict is not null
    where rs.user_id = ${DEMO_USER_ID}
      and rs.status = 'completed'
    group by rs.id, rs.completed_at, rs.started_at
    order by coalesce(rs.completed_at, rs.started_at) desc
    limit 5
  `;

  return rows;
}

export async function getHomePayload(): Promise<HomePayload> {
  const decks = await listDecks();
  const settings = await getSettings();
  const userStats = await getUserStats();
  const recentSessions = await getRecentSessions();
  const dueToday = decks.reduce((sum, deck) => sum + deck.dueCount, 0);
  const remainingToday = Math.max(settings.dailyTarget - userStats.completedToday, 0);

  return {
    stats: {
      completedToday: userStats.completedToday,
      remainingToday,
      streakDays: userStats.streakDays,
      dueToday,
      strongestTag: userStats.strongestTag ?? "-",
    },
    settings,
    decks,
    recentSessions,
  };
}
