import { SettingsPageClient } from "@/features/settings/settings-page";
import { getSettings } from "@/server/repositories/settings-repository";

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsPageClient initialSettings={settings} />;
}
