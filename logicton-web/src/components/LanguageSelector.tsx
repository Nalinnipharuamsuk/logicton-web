"use client";

import { useMemo } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type Variant = "inline" | "compact";

interface LanguageSelectorProps {
  variant?: Variant;
}

export default function LanguageSelector({ variant = "inline" }: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Show only the button to switch to the opposite language
  const switchOption = useMemo(() => {
    if (locale === "th") {
      return { label: "EN", value: "en" };
    } else {
      return { label: "TH", value: "th" };
    }
  }, [locale]);

  const handleLocaleChange = () => {
    router.push(pathname, { locale: switchOption.value });
  };

  return (
    <div
      className={
        variant === "compact"
          ? "flex gap-4 text-sm"
          : "flex items-center gap-2 ml-4 border-l pl-4 border-border/30"
      }
    >
      <button
        onClick={handleLocaleChange}
        className={
          variant === "compact"
            ? "text-sm font-medium text-foreground/70 hover:text-foreground"
            : "text-xs font-medium px-2 py-1 rounded text-foreground/70 hover:text-foreground hover:bg-white/5"
        }
      >
        {switchOption.label}
      </button>
    </div>
  );
}
