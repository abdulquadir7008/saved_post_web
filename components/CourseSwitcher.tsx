"use client";

import Link from "next/link";
import type { Course } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/context";

export function CourseSwitcher({ courses, activeCourseId }: { courses: Course[]; activeCourseId: string }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-white shadow-md px-4 py-3 ">
      <span className="text-xs uppercase tracking-[0.3em] text-white font-semibold bg-purple">{t("course.switchLabel")}</span>
      {courses.map((course) => {
        const isActive = course.id === activeCourseId;
        return (
          <Link
            key={course.id}
            href={course.isEnrolled ? `/feed/${course.id}` : "#"}
            aria-disabled={!course.isEnrolled}
            title={course.isEnrolled ? undefined : t("course.notEnrolled")}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              isActive
                ? "bg-purple-100 text-purple-800 shadow-[0_8px_30px_-18px_rgba(125,70,255,0.18)] border border-purple-200"
                  : course.isEnrolled
                  ? "bg-rose-500\/10 text-amber-900 hover:bg-amber-50 border border-amber-50"
                  : "cursor-not-allowed bg-white/60 text-slate-300 border border-purple-100",
            ].join(" ")}
            onClick={(e) => {
              if (!course.isEnrolled) e.preventDefault();
            }}
          >
            {course.name}
          </Link>
        );
      })}
    </div>
  );
}
