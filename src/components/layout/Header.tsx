import { useCustomerProfile } from "../../api/queries";
import CapitecLogo from "/Capitec.svg";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatAccountType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1) + " Account";
}

export default function Header() {
  const { data: profile, isLoading, error } = useCustomerProfile();

  if (isLoading)
    return <div className="animate-pulse h-64 bg-gray-200 rounded" />;
  if (error)
    return <div className="text-red-500">Failed to load categories</div>;
  if (!profile) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={CapitecLogo} alt="Capitec" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-gray-900">
              Capitec Insights
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  {profile ? formatAccountType(profile.accountType) : ""}
                </span>
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2f70ef] text-white text-sm font-medium">
                  {profile ? getInitials(profile.name) : ""}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
