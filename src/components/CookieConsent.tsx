import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "cookie-consent";

interface ConsentState {
  essential: boolean;
  analytics: boolean;
}

export const CookieConsent = () => {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);
  const [showCustomise, setShowCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const save = useCallback((consent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
    setShowCustomise(false);
  }, []);

  const acceptAll = () => save({ essential: true, analytics: true });
  const rejectAll = () => save({ essential: true, analytics: false });
  const saveCustom = () => save({ essential: true, analytics });

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg sm:p-6"
          >
            <div className="mx-auto max-w-5xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1 sm:max-w-lg">
                <p className="text-sm font-semibold text-foreground">{t("cookie.title")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("cookie.description")}{" "}
                  <Link to="/privacy" className="underline hover:text-foreground">
                    {t("footer.privacy")}
                  </Link>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={rejectAll}>
                  {t("cookie.rejectAll")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowCustomise(true)}>
                  {t("cookie.customise")}
                </Button>
                <Button size="sm" onClick={acceptAll}>
                  {t("cookie.acceptAll")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showCustomise} onOpenChange={setShowCustomise}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("cookie.customise")}</DialogTitle>
            <DialogDescription>{t("cookie.description")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">{t("cookie.essential")}</Label>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics-toggle" className="text-sm">{t("cookie.analytics")}</Label>
              <Switch id="analytics-toggle" checked={analytics} onCheckedChange={setAnalytics} />
            </div>
          </div>
          <Button onClick={saveCustom} className="w-full">{t("cookie.save")}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
