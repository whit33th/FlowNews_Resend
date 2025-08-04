import { LucidePhoneCall, Mailbox } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="flex flex-col text-sm lg:text-base items-center lg:items-end">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Mailbox className="w-4 lg:w-5 h-4 lg:h-5" />
          <p className="font-semibold">convex@resend.dev</p>
        </div>
        <div className="flex items-center gap-2">
          <LucidePhoneCall className="w-4 lg:w-5 h-4 lg:h-5" />
          <p className="font-semibold">+48 123 456 789</p>
        </div>
      </div>
    </div>
  );
};
