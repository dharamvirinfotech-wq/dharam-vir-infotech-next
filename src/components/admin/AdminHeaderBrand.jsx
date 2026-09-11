import React from "react";

const AdminHeaderBrand = ({ title, subtitle, icon: Icon }) => {
  return (
    <>
      {/* Mobile View: Show Company Logo */}
      <div className="flex items-center gap-2.5 sm:hidden">
        <div className="h-9 w-9 rounded-xl bg-white p-1 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center shrink-0">
          <img src="/logo.png" alt="Dharamvir Info Tech" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
            Dharamvir
          </span>
          <span className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase">
            Admin Pro
          </span>
        </div>
      </div>

      {/* Desktop / Tablet View: Show Full Page Title & Subtitle */}
      <div className="hidden sm:block">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-amber-500 shrink-0" />}
          <span>{title}</span>
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
};

export default AdminHeaderBrand;
