import { CopilotPlusWelcomeModal } from "@/components/modals/CopilotPlusWelcomeModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { PLUS_UTM_MEDIUMS } from "@/constants";
import { useTranslation } from "@/i18n";
import { checkIsPlusUser, navigateToPlusPage, useIsPlusUser } from "@/plusUtils";
import { updateSetting, useSettingsValue } from "@/settings/model";
import { ExternalLink, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export function PlusSettings() {
  const { t } = useTranslation();
  const settings = useSettingsValue();
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const isPlusUser = useIsPlusUser();
  const [localLicenseKey, setLocalLicenseKey] = useState(settings.plusLicenseKey);
  useEffect(() => {
    setLocalLicenseKey(settings.plusLicenseKey);
  }, [settings.plusLicenseKey]);

  return (
    <section className="tw-flex tw-flex-col tw-gap-4 tw-rounded-lg tw-bg-secondary tw-p-4">
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-text-xl tw-font-bold">
        <span>{t("settings.plus.title")}</span>
        {isPlusUser && (
          <Badge variant="outline" className="tw-text-success">
            {t("settings.plus.active")}
          </Badge>
        )}
      </div>
      <div className="tw-flex tw-flex-col tw-gap-2 tw-text-sm tw-text-muted">
        <div>
          {t("settings.plus.description.intro")}{" "}
          <strong> {t("settings.plus.description.features")}</strong>
        </div>
        <div>{t("settings.plus.description.evolution")}</div>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <PasswordInput
          className="tw-w-full"
          placeholder={t("settings.plus.licenseKey.placeholder")}
          value={localLicenseKey}
          onChange={(value) => {
            setLocalLicenseKey(value);
          }}
        />
        <Button
          disabled={isChecking}
          onClick={async () => {
            updateSetting("plusLicenseKey", localLicenseKey);
            setIsChecking(true);
            const result = await checkIsPlusUser();
            setIsChecking(false);
            if (!result) {
              setError(t("settings.plus.invalidLicenseKey.error"));
            } else {
              setError(null);
              new CopilotPlusWelcomeModal(app).open();
            }
          }}
          className="tw-min-w-10 tw-text-xs md:tw-text-sm"
        >
          {isChecking ? (
            <Loader2 className="tw-size-2 tw-animate-spin md:tw-size-4" />
          ) : (
            t("settings.plus.apply.button")
          )}
        </Button>
        <Button
          className="tw-text-xs md:tw-text-sm"
          variant="secondary"
          onClick={() => navigateToPlusPage(PLUS_UTM_MEDIUMS.SETTINGS)}
        >
          {t("settings.plus.joinNow")} <ExternalLink className="tw-size-2 md:tw-size-4" />
        </Button>
      </div>
      <div className="tw-text-error">{error}</div>
    </section>
  );
}
